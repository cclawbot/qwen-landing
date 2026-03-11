import { NextRequest, NextResponse } from 'next/server';
import { getUserId } from '@/lib/auth/middleware';
import { getUsageByUserId, getDailyUsage, getUsageByModel, getUsageSummary } from '@/lib/db/usage';

// GET /api/usage - Get usage statistics
export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'summary';
    const days = parseInt(searchParams.get('days') || '30', 10);
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    let data;

    switch (type) {
      case 'logs':
        data = await getUsageByUserId(userId, limit);
        break;
      case 'daily':
        data = await getDailyUsage(userId, days);
        break;
      case 'models':
        data = await getUsageByModel(userId);
        break;
      case 'summary':
      default:
        data = await getUsageSummary(userId);
        break;
    }

    return NextResponse.json({ data, type });
  } catch (error) {
    console.error('Error fetching usage:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usage data' },
      { status: 500 }
    );
  }
}
