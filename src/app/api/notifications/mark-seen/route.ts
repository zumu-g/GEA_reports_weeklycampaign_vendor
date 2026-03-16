import { NextRequest, NextResponse } from 'next/server';
import { markNotificationsSeen } from '@/lib/notification-queue';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { property, notificationIds } = body;

    if (!property || !Array.isArray(notificationIds)) {
      return NextResponse.json(
        { error: 'Missing required fields: property (slug), notificationIds (string[])' },
        { status: 400 }
      );
    }

    await markNotificationsSeen(property, notificationIds);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to mark notifications as seen', detail: String(error) },
      { status: 500 }
    );
  }
}
