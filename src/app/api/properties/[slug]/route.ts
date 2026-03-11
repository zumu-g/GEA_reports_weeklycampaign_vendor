import { NextRequest, NextResponse } from 'next/server';
import { getProperty, getPropertyAnalytics, getPropertyInspections } from '@/lib/markdown-loader';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const property = await getProperty(slug);

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const analyticsDetail = await getPropertyAnalytics(slug);
    const inspectionsDetail = await getPropertyInspections(slug);

    return NextResponse.json({
      ...property,
      analyticsDetail,
      inspectionsDetail,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load property', detail: String(error) },
      { status: 500 }
    );
  }
}
