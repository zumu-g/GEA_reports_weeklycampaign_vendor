interface WhatHappensNextProps {
  campaignType: string;
  daysOnMarket: number;
  hasOffers: boolean;
  checklistProgress: number; // 0-100
}

interface Step {
  label: string;
  detail: string;
  done: boolean;
  active: boolean;
}

export default function WhatHappensNext({ campaignType, daysOnMarket, hasOffers, checklistProgress }: WhatHappensNextProps) {
  const isAuction = campaignType.toLowerCase().includes("auction");

  const steps: Step[] = isAuction
    ? [
        { label: "Campaign Launch", detail: "Photography, listings, signboard", done: checklistProgress > 30, active: checklistProgress <= 30 },
        { label: "Marketing & Open Homes", detail: "Weekly inspections and buyer engagement", done: daysOnMarket > 14, active: daysOnMarket >= 7 && daysOnMarket <= 14 },
        { label: "Buyer Feedback", detail: "Gauging interest levels and price expectations", done: hasOffers || daysOnMarket > 21, active: daysOnMarket > 14 && daysOnMarket <= 21 },
        { label: "Pre-Auction Offers", detail: "Reviewing any early offers received", done: false, active: hasOffers },
        { label: "Auction Day", detail: "Competitive bidding to achieve the best price", done: false, active: false },
      ]
    : [
        { label: "Campaign Launch", detail: "Photography, listings, signboard", done: checklistProgress > 30, active: checklistProgress <= 30 },
        { label: "Marketing & Inspections", detail: "Open homes and private viewings", done: daysOnMarket > 14, active: daysOnMarket >= 7 && daysOnMarket <= 14 },
        { label: "Buyer Enquiries", detail: "Following up interested parties", done: daysOnMarket > 21, active: daysOnMarket > 14 && daysOnMarket <= 21 },
        { label: "Offers & Negotiation", detail: "Reviewing offers and negotiating terms", done: false, active: hasOffers },
        { label: "Contract & Settlement", detail: "Signing contracts and completing the sale", done: false, active: false },
      ];

  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
      <h3 className="text-base font-semibold text-foreground mb-5">What Happens Next</h3>
      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={i} className="flex items-start gap-3 relative">
            {/* Vertical line */}
            {i < steps.length - 1 && (
              <div
                className="absolute left-[13px] top-7 w-0.5 bg-border-light"
                style={{ height: "calc(100% - 4px)" }}
              />
            )}
            {/* Dot */}
            <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
              step.done
                ? "bg-success"
                : step.active
                ? "bg-primary"
                : "bg-border-light"
            }`}>
              {step.done ? (
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : step.active ? (
                <div className="w-2 h-2 rounded-full bg-white" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-border" />
              )}
            </div>
            {/* Content */}
            <div className="pb-5 flex-1 min-w-0">
              <p className={`text-sm font-medium ${
                step.done ? "text-muted" : step.active ? "text-foreground" : "text-muted"
              }`}>
                {step.label}
              </p>
              <p className="text-xs text-muted mt-0.5">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
