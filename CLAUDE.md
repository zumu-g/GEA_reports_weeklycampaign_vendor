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
- **AI**: MiniMax M2.5 (`MINIMAX_API_KEY` in `.env.local`) — report generation, commentary drafting, market news, PDF stat extraction
- **Data**: Markdown files under `GEA_vendor_portal/properties/{slug}/` — property info, weekly analytics, inspection logs
- **Repo**: https://github.com/zumu-g/GEA_reports_weeklycampaign_vendor.git

## Project Structure
```
src/
  app/
    page.tsx                         # Agent dashboard — all listings summary
    layout.tsx                       # Root layout with GEA branding + PWA meta
    globals.css                      # Theme variables (navy/gold colour scheme)
    generate/page.tsx                # 7-step report wizard
    report/[id]/page.tsx             # Individual vendor report (agent view)
    vendor/[token]/page.tsx          # Vendor-facing portal (token-gated)
    vendor/[token]/layout.tsx        # Vendor layout
    api/
      extract-pdf/route.ts           # POST: PDF → raw text (pdf-parse)
      parse-stats/route.ts           # POST: PDF text → { views, enquiries, saves, searchAppearances } via AI
      generate-report/route.ts       # POST: all wizard data → GeneratedReportNarrative (MiniMax)
      draft-commentary/route.ts      # POST: stats → agent commentary draft (MiniMax)
      draft-market-news/route.ts     # POST: address/week → 3 market news bullets (MiniMax)
      weekly-drafts/
        generate/route.ts            # POST: create blank drafts for all properties this week
        [id]/route.ts                # GET/PATCH: fetch or update a draft
        [id]/approve/route.ts        # POST: approve a draft
      ingest/
        analytics/route.ts           # POST: store portal stats to property markdown
        inspection/route.ts          # POST: store inspection data to property markdown
        telegram/route.ts            # POST: ingest from Telegram bot
      properties/
        route.ts                     # GET: list all properties
        [slug]/route.ts              # GET: single property data
      vendor/
        tokens/route.ts              # GET/POST: manage vendor access tokens
  components/
    Header.tsx                       # GEA branded header/nav
    StatCard.tsx                     # Reusable metric card
    PropertyCard.tsx                 # Listing card on dashboard
    PortalBreakdown.tsx              # REA vs Domain stats side-by-side
    Chat.tsx                         # Floating chat widget (client component)
    ReportWizard.tsx                 # 7-step wizard with file upload + AI generation
    InspectionHistory.tsx            # Inspection log component
    vendor/
      VendorHeader.tsx               # Vendor portal header
      CampaignChecklist.tsx          # Vendor checklist component
      CommunicationsLog.tsx          # Agent-vendor comms log
  lib/
    types.ts                         # All TypeScript interfaces
    mock-data.ts                     # Sample data (fallback when no markdown files)
    minimax.ts                       # MiniMax API wrapper (callMiniMax, stripThinking)
    markdown-loader.ts               # Load property data from markdown files
    property-registry.ts             # List/resolve property slugs
    data-adapter.ts                  # Convert markdown props to VendorReport format
    weekly-drafts.ts                 # Draft lifecycle (create, save, approve)
    vendor-tokens.ts                 # Token to property slug mapping (JSON file)

GEA_vendor_portal/
  properties/
    {slug}/                          # One folder per listing
      index.md                       # Property details + metadata
      analytics/                     # Weekly portal stats (markdown tables)
      inspections/                   # Inspection logs
      weekly/                        # Weekly draft JSON files

public/
  icons/                             # PWA icons
  manifest.json                      # PWA manifest
  sw.js                              # Service worker
```

## Running Locally
```bash
npm run dev    # starts on localhost:3000 (or next available port — 3001 if 3000 is busy)
npm run build  # production build
```

## Key Flows

### Agent creates a weekly report
1. Go to `/generate` — 7-step ReportWizard
2. Step 1: select property or enter details
3. Steps 2-3: enter REA/Domain stats OR upload CSV/PDF export
   - CSV/TSV: parsed client-side instantly via `parseCSVStats()` in ReportWizard.tsx
   - PDF: extracted server-side via `/api/extract-pdf`, then AI-parsed via `/api/parse-stats`
4. Step 4: inspections
5. Step 5: agent commentary (can AI-draft via `/api/draft-commentary`)
6. Step 6: market news (can AI-draft via `/api/draft-market-news`)
7. Step 7: generate full narrative via `/api/generate-report` (MiniMax)
8. Report saved to draft, agent can approve — vendor can view at `/vendor/[token]`

### Vendor views their report
- Unique URL: `/vendor/[token]`
- Token resolves to property slug via `src/lib/vendor-tokens.ts` + `vendor-tokens.json`
- Shows latest approved draft: stats, checklist, communications log, inspection history

## Current Status (as of 12 May 2026)
### Done
- Project scaffolded and building (TypeScript clean)
- Agent dashboard with weekly summary stats
- 7-step ReportWizard with AI-powered narrative generation
- AI commentary drafting and market news drafting
- CSV stat parsing — client-side, deterministic column-header matching (no AI needed)
- PDF stat extraction — server-side extract + AI parse via MiniMax
- Vendor portal with token-gated access (`/vendor/[token]`)
- Markdown data layer for property + analytics storage
- Weekly draft workflow (create, edit, approve)
- API routes for property CRUD, ingest (analytics, inspection, Telegram)
- PWA support (manifest, service worker, icons)
- GEA branding (navy `#1e3a5f` / gold `#c9a96e`)

### TODO (next session)
1. **Chat backend** — persist agent-vendor messages (currently UI-only, no storage)
2. **PDF export** — generate downloadable vendor reports for email
3. **Week-over-week trends** — show % change vs previous week on stat cards
4. **Historical data** — let vendors/agents browse past weeks' reports
5. **Vendor token UI** — agent-facing screen to generate/share vendor access links
6. **Google Sheets integration** — optional: replace markdown data layer with Sheets
7. **Deploy** — host publicly so vendors can access their portal

## Dev Notes
- Port 3000 may be in use; dev server will auto-pick next available port
- The iCloud path has spaces — always quote paths in terminal commands
- Brand colours: primary navy `#1e3a5f`, accent gold `#c9a96e`
- `MINIMAX_API_KEY` must be set in `.env.local` — used by all AI routes
- CSV uploads are parsed entirely client-side (no API call) — see `parseCSVStats()` in `ReportWizard.tsx`
- PDF uploads: `/api/extract-pdf` (pdf-parse) then `/api/parse-stats` (MiniMax AI)
- Vendor tokens stored in `src/lib/vendor-tokens.json` (gitignored in prod — contains vendor URLs)
- Do NOT deploy to Vercel — use an alternative host
