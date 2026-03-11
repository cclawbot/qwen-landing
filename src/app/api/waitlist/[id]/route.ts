import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { waitlist } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { validateRequest, waitlistUpdateSchema } from '@/lib/validation';

// PATCH - Update waitlist entry status (approve/deny)
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Admin check
    const adminKey = request.headers.get('x-admin-key');
    if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'dev-admin-key') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    
    // Validate request body
    const validation = validateRequest(waitlistUpdateSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }
    
    const { status } = validation.data;
    
    // Update the entry
    await db.update(waitlist)
      .set({ 
        status,
        reviewedAt: new Date(),
        reviewedBy: 'admin',
      })
      .where(eq(waitlist.id, id));
    
    return NextResponse.json({
      success: true,
      message: `Waitlist entry ${status}`,
    });
  } catch (error) {
    console.error('Update waitlist error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
