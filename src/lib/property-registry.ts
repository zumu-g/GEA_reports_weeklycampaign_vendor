// Maps property keywords/shorthand to folder slugs
const PROPERTY_REGISTRY: Record<string, { slug: string; address: string; owner: string }> = {
  '85 centenary': {
    slug: '85-centenary-blvd-officer-south',
    address: '85 Centenary Boulevard, Officer South VIC 3809',
    owner: 'Vikram Aulakh',
  },
  'officer south': {
    slug: '85-centenary-blvd-officer-south',
    address: '85 Centenary Boulevard, Officer South VIC 3809',
    owner: 'Vikram Aulakh',
  },
  '14 hartsmere': {
    slug: '14-hartsmere-dr-berwick',
    address: '14 Hartsmere Drive, Berwick VIC 3806',
    owner: 'TBC',
  },
  'berwick': {
    slug: '14-hartsmere-dr-berwick',
    address: '14 Hartsmere Drive, Berwick VIC 3806',
    owner: 'TBC',
  },
  '9 calibar': {
    slug: '9-calibar-ct-clyde-north',
    address: '9 Calibar Court, Clyde North VIC 3978',
    owner: 'TBC',
  },
  'clyde north': {
    slug: '9-calibar-ct-clyde-north',
    address: '9 Calibar Court, Clyde North VIC 3978',
    owner: 'TBC',
  },
  'calibar': {
    slug: '9-calibar-ct-clyde-north',
    address: '9 Calibar Court, Clyde North VIC 3978',
    owner: 'TBC',
  },
};

export function resolveProperty(text: string): { slug: string; address: string; owner: string } | null {
  const lower = text.toLowerCase().trim();
  for (const [keyword, property] of Object.entries(PROPERTY_REGISTRY)) {
    if (lower.includes(keyword)) {
      return property;
    }
  }
  return null;
}

export function getAllRegisteredProperties() {
  // Deduplicate by slug
  const seen = new Set<string>();
  const properties: { slug: string; address: string; owner: string }[] = [];
  for (const property of Object.values(PROPERTY_REGISTRY)) {
    if (!seen.has(property.slug)) {
      seen.add(property.slug);
      properties.push(property);
    }
  }
  return properties;
}
