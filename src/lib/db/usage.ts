import { db } from '@/lib/db';
import { usageLogs, apiKeys } from '@/lib/db/schema';
import { eq, and, gte, lt, sql, desc } from 'drizzle-orm';

/**
 * Log API usage
 */
export async function logUsage(
  apiKeyId: string,
  model: string,
  inputTokens: number,
  outputTokens: number,
  latencyMs?: number
) {
  const [log] = await db
    .insert(usageLogs)
    .values({
      id: crypto.randomUUID(),
      apiKeyId,
      model,
      inputTokens,
      outputTokens,
      latencyMs,
    })
    .returning();
  
  return log;
}

/**
 * Get usage logs for a user (by API key IDs they own)
 */
export async function getUsageByUserId(userId: string, limit = 100) {
  const logs = await db
    .select({
      id: usageLogs.id,
      model: usageLogs.model,
      inputTokens: usageLogs.inputTokens,
      outputTokens: usageLogs.outputTokens,
      latencyMs: usageLogs.latencyMs,
      timestamp: usageLogs.timestamp,
      keyId: apiKeys.keyId,
      keyName: apiKeys.name,
    })
    .from(usageLogs)
    .innerJoin(apiKeys, eq(usageLogs.apiKeyId, apiKeys.id))
    .where(eq(apiKeys.userId, userId))
    .orderBy(desc(usageLogs.timestamp))
    .limit(limit);
  
  return logs;
}

/**
 * Get daily usage aggregation for a user
 */
export async function getDailyUsage(userId: string, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const result = await db
    .select({
      date: sql<string>`date(${usageLogs.timestamp})`,
      totalInputTokens: sql<number>`sum(${usageLogs.inputTokens})`,
      totalOutputTokens: sql<number>`sum(${usageLogs.outputTokens})`,
      requestCount: sql<number>`count(*)`,
      avgLatency: sql<number>`avg(${usageLogs.latencyMs})`,
    })
    .from(usageLogs)
    .innerJoin(apiKeys, eq(usageLogs.apiKeyId, apiKeys.id))
    .where(and(
      eq(apiKeys.userId, userId),
      gte(usageLogs.timestamp, startDate)
    ))
    .groupBy(sql`date(${usageLogs.timestamp})`)
    .orderBy(desc(sql`date(${usageLogs.timestamp})`));
  
  return result;
}

/**
 * Get usage by model for a user
 */
export async function getUsageByModel(userId: string) {
  const result = await db
    .select({
      model: usageLogs.model,
      totalInputTokens: sql<number>`sum(${usageLogs.inputTokens})`,
      totalOutputTokens: sql<number>`sum(${usageLogs.outputTokens})`,
      requestCount: sql<number>`count(*)`,
      avgLatency: sql<number>`avg(${usageLogs.latencyMs})`,
    })
    .from(usageLogs)
    .innerJoin(apiKeys, eq(usageLogs.apiKeyId, apiKeys.id))
    .where(eq(apiKeys.userId, userId))
    .groupBy(usageLogs.model)
    .orderBy(desc(sql`count(*)`));
  
  return result;
}

/**
 * Get total usage summary for a user
 */
export async function getUsageSummary(userId: string) {
  const [result] = await db
    .select({
      totalInputTokens: sql<number>`sum(${usageLogs.inputTokens})`,
      totalOutputTokens: sql<number>`sum(${usageLogs.outputTokens})`,
      totalTokens: sql<number>`sum(${usageLogs.inputTokens}) + sum(${usageLogs.outputTokens})`,
      requestCount: sql<number>`count(*)`,
      avgLatency: sql<number>`avg(${usageLogs.latencyMs})`,
      uniqueModels: sql<number>`count(distinct ${usageLogs.model})`,
    })
    .from(usageLogs)
    .innerJoin(apiKeys, eq(usageLogs.apiKeyId, apiKeys.id))
    .where(eq(apiKeys.userId, userId));
  
  return result;
}
