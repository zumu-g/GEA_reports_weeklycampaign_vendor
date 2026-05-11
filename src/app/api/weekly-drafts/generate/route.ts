import { NextRequest, NextResponse } from 'next/server';
import { generateAllWeeklyDrafts, getComingWeekEnding } from '@/lib/weekly-drafts';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const weekEnding: string = body.weekEnding || getComingWeekEnding();

  const result = await generateAllWeeklyDrafts(weekEnding);
  return NextResponse.json(result);
}
