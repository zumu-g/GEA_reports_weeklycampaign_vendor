export interface VendorReport {
  id: string;
  propertyAddress: string;
  vendorName: string;
  agent: string;
  weekEnding: string;
  listingDate: string;
  askingPrice: string;
  // realestate.com.au stats
  reaViews: number;
  reaEnquiries: number;
  reaSaves: number;
  reaSearchAppearances: number;
  // domain.com.au stats
  domainViews: number;
  domainEnquiries: number;
  domainSaves: number;
  domainSearchAppearances: number;
  // Open home stats
  openHomeAttendees: number;
  privateInspections: number;
  // Campaign info
  campaignType: string;
  daysOnMarket: number;
  // Chat messages
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderRole: "agent" | "vendor";
  message: string;
  timestamp: string;
}

export interface WeeklySummary {
  weekEnding: string;
  totalListings: number;
  totalReaViews: number;
  totalDomainViews: number;
  totalEnquiries: number;
  totalOpenHomeAttendees: number;
  totalPrivateInspections: number;
}
