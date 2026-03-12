import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Users table
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  companyName: text('company_name'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  status: text('status').default('active'), // active, suspended
});

// Waitlist table
export const waitlist = sqliteTable('waitlist', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  companyName: text('company_name').notNull(),
  estimatedUsage: text('estimated_usage'), // e.g., "1B tokens/month"
  useCase: text('use_case'),
  status: text('status').default('pending'), // pending, approved, denied
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  reviewedAt: integer('reviewed_at', { mode: 'timestamp' }),
  reviewedBy: text('reviewed_by'),
});

// API Keys table
export const apiKeys = sqliteTable('api_keys', {
  id: text('id').primaryKey(),
  keyId: text('key_id').unique().notNull(), // Public identifier
  keySecretHash: text('key_secret_hash').notNull(), // Hashed secret
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name'), // e.g., "Production", "Development"
  lastUsedAt: integer('last_used_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  revokedAt: integer('revoked_at', { mode: 'timestamp' }),
});

// Usage logs table
export const usageLogs = sqliteTable('usage_logs', {
  id: text('id').primaryKey(),
  apiKeyId: text('api_key_id').notNull().references(() => apiKeys.id),
  model: text('model').notNull(), // qwen-max, qwen-plus, etc.
  inputTokens: integer('input_tokens').notNull(),
  outputTokens: integer('output_tokens').notNull(),
  latencyMs: integer('latency_ms'),
  timestamp: integer('timestamp', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Waitlist = typeof waitlist.$inferSelect;
export type NewWaitlist = typeof waitlist.$inferInsert;
export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;
export type UsageLog = typeof usageLogs.$inferSelect;
export type NewUsageLog = typeof usageLogs.$inferInsert;
