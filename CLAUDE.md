# GEA Weekly Campaign & Vendor Report Dashboard

## Project Overview
Dashboard for **Grants Estate Agents (GEA)** to create weekly campaign reports for property vendors (sellers). Built with Next.js + Tailwind CSS.

## Business Context
- GEA agents compile weekly stats from realestate.com.au, domain.com.au, and open home attendance
- Reports are created internally but shared with vendor clients (online dashboard + PDF)
- Vendors can view their property's campaign performance and chat with their agent

## Tech Stack
- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4
- **Data**: Currently mock data in `src/lib/mock-data.ts` — to be replaced with Google Sheets integration
- **Repo**: https://github.com/zumu-g/GEA_reports_weeklycampaign_vendor.git

## Project Structure
```
src/
  app/
    page.tsx              # Dashboard overview (all listings summary)
    layout.tsx            # Root layout with GEA branding
    globals.css           # Theme variables (navy/gold colour scheme)
    report/[id]/page.tsx  # Individual vendor report page
  components/
    Header.tsx            # GEA branded header/nav
    StatCard.tsx          # Reusable metric card
    PropertyCard.tsx      # Listing card on dashboard
    PortalBreakdown.tsx   # REA vs Domain stats side-by-side
    Chat.tsx              # Floating chat widget (client component)
  lib/
    types.ts              # TypeScript interfaces (VendorReport, ChatMessage, etc.)
    mock-data.ts          # Sample data for 4 properties
```

## Running Locally
```bash
npm run dev    # starts on localhost:3000 (or next available port)
npm run build  # production build
```

## Current Status (as of 5 March 2026)
### Done
- Project scaffolded and building successfully
- Dashboard page with weekly summary stats
- Individual vendor report pages with portal breakdown + inspections
- Chat widget UI (client-side only, no persistence)
- GEA branding (navy #1e3a5f / gold #c9a96e colour scheme)
- Pushed to GitHub

### TODO (next session)
1. **Google Sheets integration** — connect a spreadsheet as the data source so the team can update numbers without touching code
2. **Vendor authentication** — unique links per vendor so each client only sees their property
3. **Chat backend** — persist messages (database or Google Sheets)
4. **PDF export** — generate downloadable reports for email
5. **Deploy to Vercel** — make it accessible online
6. **Branding refinements** — add GEA logo, favicon, refine styling based on feedback
7. **Week-over-week trends** — show percentage changes vs previous week
8. **Historical data** — allow viewing past weeks' reports

## Dev Notes
- Port 3000 may be in use; dev server will auto-pick next available port
- The iCloud path has spaces — always quote paths in terminal commands
- Brand colours: primary navy `#1e3a5f`, accent gold `#c9a96e`
