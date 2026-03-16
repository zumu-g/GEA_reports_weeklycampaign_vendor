import { NextRequest, NextResponse } from 'next/server';
import { resolveProperty } from '@/lib/property-registry';
import { queueNotification } from '@/lib/notification-queue';
import fs from 'fs/promises';
import path from 'path';

const PROPERTIES_DIR = process.env.PROPERTIES_DIR || '/Users/stuartgrant_mbp13/Library/Mobile Documents/com~apple~CloudDocs/GEA_vendor_portal/properties';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { property, date, buyer, amount, conditions, status, notes } = body;

    if (!property || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: property (slug or keyword), amount' },
        { status: 400 }
      );
    }

    // Resolve property slug
    const resolved = resolveProperty(property);
    const slug = resolved ? resolved.slug : property;

    const offerDate = date || new Date().toISOString().split('T')[0];

    // Append to PROPERTY.md Offers Received table
    const propertyPath = path.join(PROPERTIES_DIR, slug, 'PROPERTY.md');
    let content = await fs.readFile(propertyPath, 'utf-8');

    const offersHeader = '| Date | Buyer | Amount | Conditions | Status | Notes |';
    const headerIdx = content.indexOf(offersHeader);

    if (headerIdx !== -1) {
      const afterHeader = content.indexOf('\n', headerIdx);
      const afterSeparator = content.indexOf('\n', afterHeader + 1);
      const newRow = `| ${offerDate} | ${buyer || ''} | ${amount} | ${conditions || ''} | ${status || 'Pending'} | ${notes || ''} |`;
      const insertAt = afterSeparator + 1;
      content = content.substring(0, insertAt) + newRow + '\n' + content.substring(insertAt);
      await fs.writeFile(propertyPath, content, 'utf-8');
    }

    // Queue high-priority notification
    await queueNotification(slug, {
      type: 'offer_received',
      title: `New offer received: ${amount}`,
      data: { date: offerDate, buyer, amount, conditions, status, notes },
    });

    return NextResponse.json({
      success: true,
      message: `Offer of ${amount} for ${slug} recorded`,
      slug,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to ingest offer', detail: String(error) },
      { status: 500 }
    );
  }
}
