import { NextRequest, NextResponse } from 'next/server';
import { parseWeeklyDraftId, approveWeeklyDraft } from '@/lib/weekly-drafts';

interface Params { params: Promise<{ id: string }> }

export async function POST(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const parsed = parseWeeklyDraftId(id);
  if (!parsed) return NextResponse.json({ error: 'Invalid draft ID' }, { status: 400 });

  const draft = await approveWeeklyDraft(parsed.slug, parsed.weekEnding);
  if (!draft) return NextResponse.json({ error: 'Draft not found' }, { status: 404 });

  return NextResponse.json(draft);
}
