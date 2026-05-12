import { NextRequest, NextResponse } from 'next/server';
import { assignToken, revokeToken, getAllTokens, getTokenForSlug } from '@/lib/vendor-tokens';

// GET /api/vendor/tokens — list all tokens (internal use)
export async function GET() {
  const tokens = getAllTokens();
  return NextResponse.json({ tokens });
}

// POST /api/vendor/tokens — assign or regenerate token for a property slug
// Body: { slug: string, regenerate?: boolean }
export async function POST(request: NextRequest) {
  try {
    const { slug, regenerate } = await request.json();

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }

    if (regenerate) {
      const existing = getTokenForSlug(slug);
      if (existing) revokeToken(existing);
    }

    const token = assignToken(slug);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return NextResponse.json({
      token,
      slug,
      url: `${baseUrl}/vendor/${token}`,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to assign token' }, { status: 500 });
  }
}
