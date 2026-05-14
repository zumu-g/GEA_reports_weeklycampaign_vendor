import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { fetchActiveListings, mapListing } from '@/lib/vaultre';

const PROPERTIES_DIR =
  process.env.PROPERTIES_DIR ??
  '/Users/stuartgrant_mbp13/Library/Mobile Documents/com~apple~CloudDocs/GEA_vendor_portal/properties';

const TEMPLATE_PATH = path.join(PROPERTIES_DIR, '_templates', 'PROPERTY_TEMPLATE.md');

async function readTemplate(): Promise<string> {
  return fs.readFile(TEMPLATE_PATH, 'utf-8');
}

function buildPropertyMd(template: string, fields: {
  address: string;
  ownerName: string;
  ownerEmail: string;
  listedDate: string;
  priceGuide: string;
  campaignType: string;
  agentName: string;
}): string {
  const today = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
  return template
    .replace('{{ADDRESS}}', fields.address)
    .replace('{{OWNER_NAME}}', fields.ownerName || 'TBC')
    .replace('{{OWNER_EMAIL}}', fields.ownerEmail || '')
    .replace('{{LIST_DATE}}', fields.listedDate || today)
    .replace('{{PRICE_GUIDE}}', fields.priceGuide || 'TBC')
    .replace('{{CAMPAIGN_TYPE}}', fields.campaignType)
    .replace('**Agent:** Stuart Grant', `**Agent:** ${fields.agentName || 'Stuart Grant'}`)
    .replace('{{HERO_IMAGE_URL}}', '')
    .replace('{{DATE}}', today);
}

function updatePropertyMd(existing: string, fields: {
  address: string;
  priceGuide: string;
  campaignType: string;
  agentName: string;
}): string {
  let content = existing;
  // Update the h1 address
  content = content.replace(/^# .+/m, `# ${fields.address}`);
  // Update specific detail fields (VaultRE owns these)
  if (fields.priceGuide) {
    content = content.replace(/(\*\*Price Guide:\*\*\s*)(.*)/, `$1${fields.priceGuide}`);
  }
  if (fields.campaignType) {
    content = content.replace(/(\*\*Campaign Type:\*\*\s*)(.*)/, `$1${fields.campaignType}`);
  }
  if (fields.agentName) {
    content = content.replace(/(\*\*Agent:\*\*\s*)(.*)/, `$1${fields.agentName}`);
  }
  return content;
}

export async function POST() {
  try {
    const rawListings = await fetchActiveListings();
    const listings = rawListings.map(mapListing);

    const template = await readTemplate();
    let created = 0;
    let updated = 0;
    const slugs: string[] = [];

    for (const listing of listings) {
      const dir = path.join(PROPERTIES_DIR, listing.slug);
      const mdPath = path.join(dir, 'PROPERTY.md');
      slugs.push(listing.slug);

      let existingContent: string | null = null;
      try {
        existingContent = await fs.readFile(mdPath, 'utf-8');
      } catch {
        // File doesn't exist yet
      }

      if (existingContent) {
        const updated_content = updatePropertyMd(existingContent, listing);
        await fs.writeFile(mdPath, updated_content, 'utf-8');
        updated++;
      } else {
        await fs.mkdir(dir, { recursive: true });
        const content = buildPropertyMd(template, listing);
        await fs.writeFile(mdPath, content, 'utf-8');
        created++;
      }
    }

    return NextResponse.json({ created, updated, listings: slugs });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
