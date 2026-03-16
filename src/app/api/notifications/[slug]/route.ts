import { NextRequest, NextResponse } from 'next/server';
import { getUnseenNotifications } from '@/lib/notification-queue';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const result = await getUnseenNotifications(slug);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notifications', detail: String(error) },
      { status: 500 }
    );
  }
}
