import { db } from '@/lib/db';
import { apiKeys, users } from '@/lib/db/schema';
import { eq, and, isNull, desc } from 'drizzle-orm';
import { hashApiKeySecret } from '@/lib/api-keys';

/**
 * Get all API keys for a user (without secrets)
 */
export async function getApiKeysByUserId(userId: string) {
  const keys = await db
    .select({
      id: apiKeys.id,
      keyId: apiKeys.keyId,
      name: apiKeys.name,
      lastUsedAt: apiKeys.lastUsedAt,
      createdAt: apiKeys.createdAt,
      expiresAt: apiKeys.expiresAt,
      revokedAt: apiKeys.revokedAt,
    })
    .from(apiKeys)
    .where(and(
      eq(apiKeys.userId, userId),
      isNull(apiKeys.revokedAt)
    ))
    .orderBy(desc(apiKeys.createdAt));
  
  return keys;
}

/**
 * Get a single API key by keyId (includes hash for verification)
 */
export async function getApiKeyByKeyId(keyId: string) {
  const [key] = await db
    .select()
    .from(apiKeys)
    .where(eq(apiKeys.keyId, keyId))
    .limit(1);
  
  return key || null;
}

/**
 * Create a new API key
 */
export async function createApiKey(userId: string, name: string | null, keyId: string, keySecretHash: string) {
  const [newKey] = await db
    .insert(apiKeys)
    .values({
      id: crypto.randomUUID(),
      keyId,
      keySecretHash,
      userId,
      name,
    })
    .returning();
  
  return newKey;
}

/**
 * Revoke an API key (soft delete)
 */
export async function revokeApiKey(keyId: string, userId: string) {
  const [updated] = await db
    .update(apiKeys)
    .set({ revokedAt: new Date() })
    .where(and(
      eq(apiKeys.keyId, keyId),
      eq(apiKeys.userId, userId),
      isNull(apiKeys.revokedAt)
    ))
    .returning();
  
  return updated || null;
}

/**
 * Update last used timestamp for an API key
 */
export async function updateApiKeyLastUsed(keyId: string) {
  await db
    .update(apiKeys)
    .set({ lastUsedAt: new Date() })
    .where(eq(apiKeys.keyId, keyId));
}

/**
 * Validate an API key (check exists, not expired, not revoked)
 */
export async function validateApiKey(keyId: string) {
  const key = await getApiKeyByKeyId(keyId);
  
  if (!key) return null;
  if (key.revokedAt) return null;
  if (key.expiresAt && key.expiresAt < new Date()) return null;
  
  // Update last used
  await updateApiKeyLastUsed(keyId);
  
  // Return user info for the key
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      companyName: users.companyName,
      status: users.status,
    })
    .from(users)
    .where(eq(users.id, key.userId))
    .limit(1);
  
  return { key, user };
}
