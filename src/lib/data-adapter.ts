import { VendorReport } from '@/lib/types';
import { PropertyData } from '@/lib/markdown-loader';

/**
 * Converts markdown PropertyData into the VendorReport format
 * that existing components (PropertyCard, PortalBreakdown, etc.) expect.
 */
export function propertyToVendorReport(property: PropertyData): VendorReport {
  // Get the latest analytics row (first row in the table, most recent)
  const latest = property.analytics[0];

  // Sum up open home and private inspection groups
  const openInspections = property.inspections.filter(
    (i) => i.type.toLowerCase().includes('open')
  );
  const privateInspections = property.inspections.filter(
    (i) => i.type.toLowerCase().includes('private')
  );
  const totalOpenGroups = openInspections.reduce((sum, i) => sum + i.groups, 0);
  const totalPrivateGroups = privateInspections.reduce((sum, i) => sum + i.groups, 0);

  // Calculate days on market
  const listedDate = property.listed ? new Date(property.listed) : new Date();
  const daysOnMarket = Math.floor(
    (Date.now() - listedDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    id: property.slug,
    propertyAddress: property.address,
    vendorName: property.owner,
    agent: property.agent,
    weekEnding: latest?.weekEnding || '',
    listingDate: property.listed,
    askingPrice: property.priceGuide,
    reaViews: latest?.reaViews || 0,
    reaEnquiries: latest?.reaEnquiries || 0,
    reaSaves: latest?.reaSaves || 0,
    reaSearchAppearances: 0,
    domainViews: latest?.domainViews || 0,
    domainEnquiries: latest?.domainEnquiries || 0,
    domainSaves: latest?.domainSaves || 0,
    domainSearchAppearances: 0,
    openHomeAttendees: totalOpenGroups,
    privateInspections: totalPrivateGroups,
    campaignType: property.campaignType,
    daysOnMarket: isNaN(daysOnMarket) ? 0 : daysOnMarket,
    messages: [],
  };
}
