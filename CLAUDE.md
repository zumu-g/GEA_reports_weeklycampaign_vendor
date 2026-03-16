# GEA Weekly Campaign & Vendor Report Dashboard

## Project Overview
Dashboard for **Grants Estate Agents (GEA)** to create weekly campaign reports for property vendors (sellers). Built with Next.js + Tailwind CSS. Reads from markdown property files (GEA_vendor_portal repo).

## Business Context
- GEA agents compile weekly stats from realestate.com.au, domain.com.au, and open home attendance
- Reports are created internally but shared with vendor clients (online dashboard + PDF)
- Vendors can view their property's campaign performance and chat with their agent

## Tech Stack
- **Framework**: Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts (AreaChart for trend data)
- **Data**: Markdown-first (PROPERTY.md per property, no database)
- **Repo**: https://github.com/zumu-g/GEA_reports_weeklycampaign_vendor.git
- **Dev server**: Port 3200 (port 3000 in use by other project)

## Project Structure
```
src/
  app/
    page.tsx                    # Dashboard overview (all listings)
    layout.tsx                  # Root layout with GEA branding
    globals.css                 # CSS custom properties (Apple HIG theme)
    report/[id]/page.tsx        # Individual vendor report page
    api/
      properties/route.ts       # GET all properties
      properties/[slug]/route.ts # GET single property
      ingest/analytics/route.ts  # POST weekly portal stats
      ingest/inspection/route.ts # POST inspection results
      ingest/telegram/route.ts   # POST telegram shorthand
      ingest/offer/route.ts      # POST new offer
      export/pdf/route.ts        # GET print-ready HTML report
      notifications/[slug]/route.ts    # GET unseen notifications
      notifications/mark-seen/route.ts # POST mark as read
  components/
    Header.tsx              # Frosted glass header with notification slot
    StatCard.tsx            # Metric card with trend arrows
    PropertyCard.tsx        # Listing card on dashboard
    PortalBreakdown.tsx     # REA vs Domain stats
    Chat.tsx                # iMessage-style chat (vendor perspective)
    TrendChart.tsx          # Recharts area chart (views + enquiries over time)
    PropertyHero.tsx        # Hero image with gradient overlay
    NotificationBadge.tsx   # Bell icon with unseen count, dropdown panel
    NextInspection.tsx      # Green banner with countdown to next inspection
    WeeklyTargets.tsx       # Progress rings + cumulative bars
    OffersReceived.tsx      # Card-based offers with color-coded status
    BuyerFeedback.tsx       # Sentiment-tagged buyer quotes
    DocumentVault.tsx       # Grouped docs with status badges
    WhatHappensNext.tsx     # Campaign phase stepper
    CommunicationsLog.tsx   # Activity timeline
    AgentContact.tsx        # Agent card with call/email buttons
    NearbyActivity.tsx      # Just Listed + Just Sold nearby properties
    ChecklistSection.tsx    # Progress bar + checklist items
    Illustrations.tsx       # Hand-drawn SVG illustrations
  lib/
    types.ts              # TypeScript interfaces (VendorReport, ChatMessage)
    mock-data.ts          # Fallback sample data
    markdown-loader.ts    # Reads PROPERTY.md files → PropertyData
    data-adapter.ts       # PropertyData → VendorReport adapter
    notification-queue.ts # File-based notification queue
```

## Running Locally
```bash
npm run dev -- -p 3200   # starts on localhost:3200
npm run build            # production build
```

## Status (as of 17 March 2026)

### Done
- Full vendor report page with 17 components
- Apple HIG design system (white bg, #0071e3 primary, system fonts)
- Markdown-first data architecture (reads from GEA_vendor_portal/properties/)
- 4 ingest API routes (analytics, inspection, telegram, offer)
- Notification system (file-based queue + portal badges)
- PDF export (print-ready HTML)
- Trend charts (Recharts, week-over-week)
- Property hero images
- Buyer feedback with sentiment badges
- Document vault with status tracking
- Just Listed / Just Sold nearby properties
- Campaign phase stepper (What Happens Next)
- Next inspection countdown banner
- Weekly targets with progress visualization

### TODO
- [ ] Vendor auth (token-based portal URLs)
- [ ] Email parser for REA/Domain weekly PDFs
- [ ] Comparable sales / suburb market data
- [ ] Chat backend (persist messages)
- [ ] Deploy to Vercel
- [ ] Set up cron for notification dispatcher

## Design System
- Apple HIG inspired: white bg, #0071e3 primary, -apple-system fonts
- CSS custom properties in globals.css
- Hand-drawn SVG illustrations
- See ~/.claude/CLAUDE.md for animation directives

## Dev Notes
- Port 3000 may be in use; use port 3200
- The iCloud path has spaces — always quote paths in terminal commands
- Data lives in separate repo: GEA_vendor_portal (~/Library/Mobile Documents/com~apple~CloudDocs/GEA_vendor_portal/)
- Env var: PROPERTIES_DIR in .env.local points to the properties folder
