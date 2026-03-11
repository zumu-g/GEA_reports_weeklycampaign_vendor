import { NextResponse } from 'next/server';
import { getAllProperties } from '@/lib/markdown-loader';

export async function GET() {
  try {
    const properties = await getAllProperties();
    return NextResponse.json({ properties, count: properties.length });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load properties', detail: String(error) },
      { status: 500 }
    );
  }
}
