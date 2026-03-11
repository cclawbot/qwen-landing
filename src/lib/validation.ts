import { z } from 'zod';

// Auth Schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be under 100 characters').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// API Key Schemas
export const createApiKeySchema = z.object({
  name: z.string().max(100, 'Name must be under 100 characters').optional(),
});

export const apiKeyIdSchema = z.object({
  id: z.string().uuid('Invalid API key ID'),
});

// Usage Schemas
export const logUsageSchema = z.object({
  keyId: z.string().min(1, 'API key ID is required'),
  model: z.string().min(1, 'Model is required'),
  tokens: z.number().int().min(0, 'Tokens must be a positive integer').optional(),
  latency: z.number().min(0, 'Latency must be a positive number').optional(),
  status: z.enum(['success', 'error']).optional(),
});

export const usageQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

// Waitlist Schemas
export const waitlistSubmitSchema = z.object({
  email: z.string().email('Invalid email format'),
  company: z.string().min(1, 'Company is required').max(100, 'Company must be under 100 characters'),
  usage: z.string().max(500, 'Usage description must be under 500 characters').optional(),
});

export const waitlistUpdateSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
});

// Proxy Schemas
export const proxyRequestSchema = z.object({
  model: z.string().min(1, 'Model is required'),
  messages: z.array(z.object({
    role: z.enum(['system', 'user', 'assistant']),
    content: z.string().min(1, 'Content is required'),
  })).min(1, 'At least one message is required'),
  temperature: z.number().min(0).max(2).optional(),
  max_tokens: z.number().int().min(1).max(32000).optional(),
  stream: z.boolean().optional(),
});

// Analytics Schemas
export const analyticsQuerySchema = z.object({
  period: z.enum(['day', 'week', 'month', 'year']).default('week'),
});

// Helper function to validate request body
export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues;
    const errors = issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return { success: false, error: errors };
  }
  return { success: true, data: result.data };
}
