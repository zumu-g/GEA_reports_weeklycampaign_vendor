import { NextRequest, NextResponse } from 'next/server';
import { writeInspectionFile } from '@/lib/markdown-loader';
import { queueNotification } from '@/lib/notification-queue';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { property, date, type, groups, interested, interestLevel, notes } = body;

    if (!property || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: property (slug), type' },
        { status: 400 }
      );
    }

    const inspectionDate = date || new Date().toISOString().split('T')[0];
    const g = Number(groups) || 0;

    const filePath = await writeInspectionFile(property, {
      date: inspectionDate,
      type,
      groups: g,
      interested: Number(interested) || 0,
      interestLevel: interestLevel || '',
      notes: notes || '',
    });

    // Queue notification for vendor
    await queueNotification(property, {
      type: 'inspection_result',
      title: `${type}: ${g} groups through (${interestLevel || 'TBC'})`,
      data: { date: inspectionDate, type, groups: g, interested, interestLevel, notes },
    });

    return NextResponse.json({
      success: true,
      message: `Inspection for ${property} on ${inspectionDate} saved`,
      file: filePath,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to ingest inspection', detail: String(error) },
      { status: 500 }
    );
  }
}
