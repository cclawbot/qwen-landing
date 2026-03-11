import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { waitlist } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Validation schema
const waitlistSchema = z.object({
  email: z.string().email('Invalid email address'),
  companyName: z.string().min(1, 'Company name is required'),
  estimatedUsage: z.string().optional(),
  useCase: z.string().optional(),
});

// GET - List all waitlist entries (admin)
export async function GET(request: NextRequest) {
  try {
    // Simple admin check via header (in production, use proper auth)
    const adminKey = request.headers.get('x-admin-key');
    if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'dev-admin-key') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const entries = await db.query.waitlist.findMany({
      orderBy: (waitlist, { desc }) => [desc(waitlist.createdAt)],
    });
    
    return NextResponse.json({ entries });
  } catch (error) {
    console.error('Get waitlist error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Submit to waitlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = waitlistSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      );
    }
    
    const { email, companyName, estimatedUsage, useCase } = validation.data;
    
    // Check if already on waitlist
    const existing = await db.query.waitlist.findFirst({
      where: eq(waitlist.email, email.toLowerCase()),
    });
    
    if (existing) {
      return NextResponse.json(
        { 
          error: 'Email already on waitlist',
          status: existing.status 
        },
        { status: 409 }
      );
    }
    
    // Insert waitlist entry
    const id = crypto.randomUUID();
    await db.insert(waitlist).values({
      id,
      email: email.toLowerCase(),
      companyName,
      estimatedUsage: estimatedUsage || null,
      useCase: useCase || null,
    });
    
    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist',
      position: 'We will review your application soon.',
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
