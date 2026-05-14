import crypto from 'crypto';

export interface VaultREListing {
  id: string | number;
  displayAddress: string;
  status: string;
  // Sale process
  type?: string;          // e.g. "Private Sale", "Auction"
  saleProcess?: string;
  // Price
  searchPrice?: number;
  priceFrom?: number;
  priceTo?: number;
  displayPrice?: string;
  // Dates
  listedDate?: string;
  createdAt?: string;
  publishedToWeb?: string;
  // Relations — shapes vary; we extract what we need in mapListing()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  staffAllocations?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vendors?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface MappedListing {
  id: string;
  address: string;
  slug: string;
  ownerName: string;
  ownerEmail: string;
  listedDate: string;
  priceGuide: string;
  campaignType: string;
  agentName: string;
}

function createJwt(apiKey: string, secret: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS512', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ apiKey, timestamp: Math.floor(Date.now() / 1000) })).toString('base64url');
  const sig = crypto.createHmac('sha512', secret).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${sig}`;
}

function toSlug(address: string): string {
  return address
    .toLowerCase()
    .replace(/\bvic\b|\bnsw\b|\bqld\b|\bsa\b|\bwa\b|\btas\b|\bact\b|\bnt\b/g, '')
    .replace(/\d{4}/g, '')          // remove postcodes
    .replace(/[^a-z0-9\s]/g, '')   // strip punctuation
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function formatPrice(listing: VaultREListing): string {
  if (listing.displayPrice) return listing.displayPrice;
  const from = listing.priceFrom ?? listing.searchPrice;
  const to = listing.priceTo;
  if (from && to && to !== from) return `$${from.toLocaleString()} - $${to.toLocaleString()}`;
  if (from) return `$${from.toLocaleString()}`;
  return '';
}

function extractAgent(listing: VaultREListing): string {
  const allocs = listing.staffAllocations ?? [];
  const primary = allocs.find((a) => a.isPrimary || a.role === 'primary') ?? allocs[0];
  if (!primary) return 'Stuart Grant';
  const staff = primary.staff ?? primary;
  return [staff.firstName, staff.lastName].filter(Boolean).join(' ') || 'Stuart Grant';
}

function extractVendor(listing: VaultREListing): { name: string; email: string } {
  const vendors = listing.vendors ?? [];
  const v = vendors[0];
  if (!v) return { name: '', email: '' };
  const name = [v.firstName, v.lastName].filter(Boolean).join(' ') || v.name || '';
  const email = Array.isArray(v.emails) ? (v.emails[0]?.value ?? v.emails[0] ?? '') : (v.email ?? '');
  return { name, email };
}

function extractDate(listing: VaultREListing): string {
  const raw = listing.listedDate ?? listing.publishedToWeb ?? listing.createdAt ?? '';
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function extractCampaignType(listing: VaultREListing): string {
  const val = (listing.type ?? listing.saleProcess ?? '').toLowerCase();
  if (val.includes('auction')) return 'Auction';
  if (val.includes('tender')) return 'Tender';
  return 'Private Sale';
}

export function mapListing(raw: VaultREListing): MappedListing {
  const vendor = extractVendor(raw);
  return {
    id: String(raw.id),
    address: raw.displayAddress,
    slug: toSlug(raw.displayAddress),
    ownerName: vendor.name,
    ownerEmail: vendor.email,
    listedDate: extractDate(raw),
    priceGuide: formatPrice(raw),
    campaignType: extractCampaignType(raw),
    agentName: extractAgent(raw),
  };
}

export async function fetchActiveListings(): Promise<VaultREListing[]> {
  const apiKey = process.env.VAULTRE_API_KEY;
  const secret = process.env.VAULTRE_API_SECRET;
  const baseUrl = process.env.VAULTRE_BASE_URL ?? 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';

  if (!apiKey || !secret) throw new Error('VAULTRE_API_KEY and VAULTRE_API_SECRET must be set in .env.local');

  const jwt = createJwt(apiKey, secret);
  const url = `${baseUrl}/properties/residential/sale?published=true&status=listingOrConditional`;

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'X-Api-Key': apiKey,
      Authorization: `Bearer ${jwt}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`VaultRE API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  // VaultRE may return { data: [...] } or a bare array
  return Array.isArray(data) ? data : (data.data ?? data.listings ?? []);
}
