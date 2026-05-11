import { NextRequest, NextResponse } from 'next/server';
import { parseWeeklyDraftId, getWeeklyDraft, saveWeeklyDraft } from '@/lib/weekly-drafts';
import { WeeklyDraft } from '@/lib/types';

interface Params { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const parsed = parseWeeklyDraftId(id);
  if (!parsed) return NextResponse.json({ error: 'Invalid draft ID' }, { status: 400 });

  const draft = await getWeeklyDraft(parsed.slug, parsed.weekEnding);
  if (!draft) return NextResponse.json({ error: 'Draft not found' }, { status: 404 });

  return NextResponse.json(draft);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const parsed = parseWeeklyDraftId(id);
  if (!parsed) return NextResponse.json({ error: 'Invalid draft ID' }, { status: 400 });

  const existing = await getWeeklyDraft(parsed.slug, parsed.weekEnding);
  if (!existing) return NextResponse.json({ error: 'Draft not found' }, { status: 404 });

  const updates = await req.json();

  // Protect immutable fields — status/approvedAt are only changed via /approve
  const { id: _id, propertySlug: _slug, weekEnding: _week, status: _status, approvedAt: _approved, ...safeUpdates } = updates;
  void _id; void _slug; void _week; void _status; void _approved;

  const updated: WeeklyDraft = { ...existing, ...safeUpdates };
  await saveWeeklyDraft(updated);

  return NextResponse.json(updated);
}
