import fs from 'fs/promises';
import path from 'path';
import { RentalAnalyticsRow } from '@/lib/types';
import type { InspectionRow, CommunicationRow, NewsItem } from '@/lib/markdown-loader';

const RENTALS_DIR =
  process.env.RENTALS_DIR ||
  '/Users/stuartgrant_mbp13/Library/Mobile Documents/com~apple~CloudDocs/GEA_vendor_portal/rentals';

export interface RentalPropertyData {
  slug: string;
  address: string;
  landlord: string;
  contact: string;
  listed: string;
  rentPw: string;
  leaseType: string;
  agent: string;
  calendarId?: string;
  checklist: { task: string; done: boolean }[];
  latestUpdate: string;
  analytics: RentalAnalyticsRow[];
  inspections: InspectionRow[];
  communications: CommunicationRow[];
  news: NewsItem[];
}

// --- Parsers ---

function get(content: string, label: string): string {
  const match = content.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*(.+)`));
  return match ? match[1].trim() : '';
}

function parseAddress(content: string): string {
  const match = content.match(/^# (.+)/m);
  return match ? match[1].trim() : '';
}

function parseChecklist(content: string): { task: string; done: boolean }[] {
  const items: { task: string; done: boolean }[] = [];
  const regex = /- \[(x| )\] (.+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    items.push({ task: match[2].trim(), done: match[1] === 'x' });
  }
  return items;
}

function parseLatestUpdate(content: string): string {
  const match = content.match(/## Latest Update\n([\s\S]+?)(?:\n\n|\n##)/);
  return match ? match[1].trim() : '';
}

function parseMarkdownTable(content: string, headerPattern: string): Record<string, string>[] {
  const lines = content.split('\n');
  let headerIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(headerPattern)) { headerIndex = i; break; }
  }
  if (headerIndex === -1) return [];

  const headers = lines[headerIndex].split('|').map(h => h.trim()).filter(Boolean);
  const rows: Record<string, string>[] = [];
  for (let i = headerIndex + 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('|')) break;
    const cells = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cells.length === 0 || cells.every(c => c === '')) break;
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = cells[idx] || ''; });
    rows.push(row);
  }
  return rows;
}

function parseRentalAnalyticsTable(content: string): RentalAnalyticsRow[] {
  const rows = parseMarkdownTable(content, 'Week Ending');
  return rows
    .filter(r => r['Week Ending']?.trim())
    .map(r => ({
      weekEnding: r['Week Ending'] || '',
      reaViews: parseInt(r['REA Views'] || '0', 10) || 0,
      reaEnquiries: parseInt(r['REA Enquiries'] || '0', 10) || 0,
      reaSaves: parseInt(r['REA Saves'] || '0', 10) || 0,
      domainViews: parseInt(r['Domain Views'] || '0', 10) || 0,
      domainEnquiries: parseInt(r['Domain Enquiries'] || '0', 10) || 0,
      domainSaves: parseInt(r['Domain Saves'] || '0', 10) || 0,
      applications: parseInt(r['Applications'] || '0', 10) || 0,
    }));
}

function parseInspectionsTable(content: string): InspectionRow[] {
  const rows = parseMarkdownTable(content, 'Date');
  return rows
    .filter(r => r['Date']?.trim())
    .map(r => ({
      date: r['Date'] || '',
      type: r['Type'] || '',
      groups: parseInt(r['Groups'] || '0', 10) || 0,
      interestLevel: r['Interest Level'] || r['Interest'] || '',
      notes: r['Notes'] || '',
    }));
}

function parseCommunicationsTable(content: string): CommunicationRow[] {
  const commSection = content.split('## Communications Log')[1];
  if (!commSection) return [];
  const rows = parseMarkdownTable('## Communications Log' + commSection, 'Date');
  return rows
    .filter(r => r['Date']?.trim())
    .map(r => ({ date: r['Date'] || '', type: r['Type'] || '', summary: r['Summary'] || '' }));
}

function parseMarketNews(content: string): NewsItem[] {
  const parts = content.split(/^## Market News/m);
  if (parts.length < 2) return [];
  const section = parts[1].split(/^## /m)[0];
  const items: NewsItem[] = [];
  const regex = /^-\s+\[([^\]]+)\]\(([^)]+)\)\s+[—–]\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(section)) !== null) {
    items.push({ title: match[1].trim(), url: match[2].trim(), summary: match[3].trim() });
  }
  return items;
}

// --- Public API ---

export async function getAllRentals(): Promise<RentalPropertyData[]> {
  try {
    const entries = await fs.readdir(RENTALS_DIR, { withFileTypes: true });
    const slugs = entries
      .filter(e => e.isDirectory() && !e.name.startsWith('_'))
      .map(e => e.name);
    const results = await Promise.all(slugs.map(s => getRental(s)));
    return results.filter((r): r is RentalPropertyData => r !== null);
  } catch {
    return [];
  }
}

export async function getRental(slug: string): Promise<RentalPropertyData | null> {
  try {
    const filePath = path.join(RENTALS_DIR, slug, 'RENTAL.md');
    const content = await fs.readFile(filePath, 'utf-8');
    return {
      slug,
      address: parseAddress(content),
      landlord: get(content, 'Landlord'),
      contact: get(content, 'Contact'),
      listed: get(content, 'Listed'),
      rentPw: get(content, 'Weekly Rent'),
      leaseType: get(content, 'Lease Type'),
      agent: get(content, 'Agent'),
      calendarId: get(content, 'Calendar ID') || undefined,
      checklist: parseChecklist(content),
      latestUpdate: parseLatestUpdate(content),
      analytics: parseRentalAnalyticsTable(content),
      inspections: parseInspectionsTable(content),
      communications: parseCommunicationsTable(content),
      news: parseMarketNews(content),
    };
  } catch {
    return null;
  }
}
