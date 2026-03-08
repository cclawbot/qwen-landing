import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for analytics events
// Note: This resets on server restart (perfect for serverless/edge)
const events: Array<{
  type: string;
  path?: string;
  questionId?: string;
  to?: string;
  timestamp: string;
}> = [];

export async function GET() {
  // Calculate stats from events
  const pageviews = events.filter(e => e.type === 'pageview');
  const uniquePaths = [...new Set(pageviews.map(e => e.path).filter(Boolean))] as string[];
  
  const eventCounts: Record<string, number> = {};
  events.forEach(event => {
    eventCounts[event.type] = (eventCounts[event.type] || 0) + 1;
  });

  // Get recent events (last 50)
  const recentEvents = events.slice(-50).reverse();

  return NextResponse.json({
    totalPageviews: pageviews.length,
    uniquePaths,
    events: eventCounts,
    recentEvents,
    lastUpdated: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate event structure
    if (!body.type || !body.timestamp) {
      return NextResponse.json(
        { error: 'Invalid event: type and timestamp required' },
        { status: 400 }
      );
    }

    // Store the event
    events.push({
      type: body.type,
      path: body.path,
      questionId: body.questionId,
      to: body.to,
      timestamp: body.timestamp,
    });

    // Keep only last 1000 events to prevent memory issues
    if (events.length > 1000) {
      events.splice(0, events.length - 1000);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to parse event' },
      { status: 400 }
    );
  }
}
