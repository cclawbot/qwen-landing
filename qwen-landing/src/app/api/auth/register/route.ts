import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { hashPassword, generateTokens } from '@/lib/auth';
import { eq } from 'drizzle-orm';

// Validation schema
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  companyName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }
    
    const { email, password, companyName } = validation.data;
    
    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }
    
    // Hash password
    const passwordHash = await hashPassword(password);
    
    // Generate user ID
    const userId = crypto.randomUUID();
    
    // Insert user
    await db.insert(users).values({
      id: userId,
      email: email.toLowerCase(),
      passwordHash,
      companyName: companyName || null,
    });
    
    // Generate tokens
    const tokens = generateTokens({ userId, email });
    
    // Return tokens in body
    return NextResponse.json({
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: userId,
        email: email.toLowerCase(),
        companyName,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
