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
- **Data**: Markdown files in `GEA_ST_vendor_portal/properties/` (path via `PROPERTIES_DIR` env var)
- **Repo**: https://github.com/zumu-g/GEA_reports_weeklycampaign_vendor.git

## Project Structure
```
src/
  app/
    page.tsx                    # Dashboard overview (all listings summary)
    layout.tsx                  # Root layout (PWA manifest + meta tags)
    globals.css                 # Theme variables (warm off-white + gold)
    report/[id]/page.tsx        # Internal report view
    vendor/[token]/page.tsx     # Owner-facing dashboard (token auth)
    vendor/[token]/layout.tsx   # Minimal layout + SW registration
    api/
      vendor/tokens/route.ts    # GET/POST token ↔ slug mapping
      ingest/analytics/         # Ingest REA/Domain stats
      ingest/inspection/        # Ingest inspection data
      ingest/telegram/          # Ingest Telegram shorthand
      properties/               # List all / get by slug
      weekly-drafts/            # Draft generation + approval
  components/
    StatCard.tsx                # Reusable metric card
    PropertyCard.tsx            # Listing card
    PortalBreakdown.tsx         # REA vs Domain stats (used in internal reports)
    InspectionHistory.tsx       # Inspection table
    vendor/
      VendorHeader.tsx          # Sticky header (GEA + address + days on market)
      CampaignChecklist.tsx     # Visual progress checklist
      CommunicationsLog.tsx     # Owner comms timeline
  lib/
    markdown-loader.ts          # Parse PROPERTY.md + sub-files
    property-registry.ts        # Keyword → slug + address + owner
    vendor-tokens.ts            # Token generation + slug lookup
    vendor-tokens.json          # GITIGNORED — secret token store
    types.ts                    # TypeScript interfaces
public/
  manifest.json                 # PWA manifest
  sw.js                         # Service worker (offline cache)
  icons/icon.svg                # PWA icon (SVG placeholder — needs PNG for production)
```

## Running Locally
```bash
npm run dev    # starts on localhost:3000 (or next available port)
npm run build  # production build
```

## Current Status (as of 12 May 2026)
### Done
- Project scaffolded and building
- Markdown data layer reading live property data from `GEA_ST_vendor_portal/`
- API routes: ingest (analytics, inspection, Telegram), list properties, weekly draft workflow
- **Vendor portal** `/vendor/[token]` — live, token-authenticated, reads markdown, PWA-enabled
  - Sections: hero, campaign checklist, analytics (REA + Domain), inspection history, comms log
  - Offline support via service worker
  - "Add to Home Screen" ready (manifest + Apple meta tags)

### Vendor Portal Tokens (dev — `localhost:3001`)
| Property | Token | URL |
|---|---|---|
| 85 Centenary Blvd (Vikram Aulakh) | `k7mP2xQn9rLs` | `/vendor/k7mP2xQn9rLs` |
| 14 Hartsmere Dr | `wB4hJ8fZt3Yd` | `/vendor/wB4hJ8fZt3Yd` |
| 9 Calibar Ct | `nC6vR1eA5gXp` | `/vendor/nC6vR1eA5gXp` |

### TODO (next session)
1. **Deploy to Vercel** — set `NEXT_PUBLIC_BASE_URL=https://portal.grantsea.com.au`, configure DNS
2. **PNG PWA icons** — generate `public/icons/icon-192.png` + `icon-512.png`, update `manifest.json`
3. **Notification hook** — wire `/api/vendor/notify` to Resend (email) or Twilio (SMS)
4. **Telegram shorthand parser** — parse Open Claw inspection shorthand into structured markdown
5. **Email/PDF parser** — extract REA/Domain weekly stats from PDF attachments automatically
6. **Week-over-week trends** — `%` change vs previous week in analytics section
7. **Chat backend** — persist agent↔vendor messages

## Dev Notes
- Port 3000 is usually in use; dev server auto-picks 3001
- The iCloud path has spaces — always quote paths in terminal commands
- `PROPERTIES_DIR` in `.env.local` points to the `GEA_ST_vendor_portal/properties/` folder
- `vendor-tokens.json` is gitignored — back it up or move to env vars before deploying
