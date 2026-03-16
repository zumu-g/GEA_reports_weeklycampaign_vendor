import { NextRequest, NextResponse } from 'next/server';
import { writeAnalyticsFile } from '@/lib/markdown-loader';
import { queueNotification } from '@/lib/notification-queue';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { property, source, weekEnding, views, enquiries, saves, searchAppearances } = body;

    if (!property || !source || !weekEnding) {
      return NextResponse.json(
        { error: 'Missing required fields: property (slug), source, weekEnding' },
        { status: 400 }
      );
    }

    const v = Number(views) || 0;
    const e = Number(enquiries) || 0;
    const s = Number(saves) || 0;

    const filePath = await writeAnalyticsFile(property, {
      source,
      weekEnding,
      views: v,
      enquiries: e,
      saves: s,
      searchAppearances: Number(searchAppearances) || 0,
    });

    // Queue notification for vendor
    await queueNotification(property, {
      type: 'analytics_update',
      title: `New stats: ${v} views, ${e} enquiries (${source}, week ${weekEnding})`,
      data: { source, weekEnding, views: v, enquiries: e, saves: s },
    });

    return NextResponse.json({
      success: true,
      message: `Analytics for ${property} (${source}) week ending ${weekEnding} saved`,
      file: filePath,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to ingest analytics', detail: String(error) },
      { status: 500 }
    );
  }
}
