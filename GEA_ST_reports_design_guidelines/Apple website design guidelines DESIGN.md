# Design System Inspired by Apple Store

## 1. Visual Theme & Atmosphere

The Apple Store design system embodies premium minimalism with refined accessibility. It prioritizes clarity and product-centric storytelling, where content breathes through generous whitespace and typography creates visual hierarchy. The aesthetic is contemporary and refined, balancing bold accent colors (particularly vibrant orange for product highlights and electric blue for interactive elements) against a sophisticated neutral palette. Playful, hand-drawn decorative elements—such as colorful question marks, gear icons, and ribbon shapes—inject moments of delight and personality, particularly during seasonal campaigns. The design philosophy centers on making complex product ecosystems feel approachable and intuitive, with every visual decision serving both form and function.

**Key Characteristics**
- Minimal, spacious layout with generous whitespace
- Premium typography hierarchy using SF Pro family
- Vibrant accent colors for calls-to-action (orange, blue) contrasted against neutral darks
- Hand-drawn, whimsical decorative accents for seasonal campaigns
- Clean product photography as hero content
- Accessible button sizing and interactive touch targets
- Neutral base palette with high contrast for readability
- Subtle shadows and elevation only where necessary

## 2. Color Palette & Roles

### Primary
- **Apple Blue** (`#0071E3`): Primary interactive elements, links, call-to-action buttons; highest usage across the system
- **Apple Blue Dark** (`#006EDB`): Hover and active states for primary blue buttons
- **Apple Blue Deep** (`#0066CC`): Visited link states and secondary interactive emphasis

### Accent Colors
- **Bright Orange** (`#FF791B`): Highlight color for product promotions, promotional headings, and seasonal campaign emphasis
- **Bright Blue Secondary** (`#2997FF`): Alternative accent for specific interactive highlights and supplementary CTAs

### Interactive
- **Link Text** (`#0071E3`): Semantic link styling, underlined navigation items
- **Link Hover** (`#0066CC`): Hover state for interactive links
- **Button Text Default** (`#1D1D1F`): Text within secondary and tertiary buttons

### Neutral Scale
- **Text Primary** (`#1D1D1F`): Primary body text, headings, and main content
- **Text Secondary** (`#333336`): Secondary content, supporting text, metadata
- **Text Tertiary** (`#6E6E73`): Disabled states, captions, fine print
- **Text Inverse** (`#FFFFFF`): Text on dark backgrounds, contrast inverse
- **True Black** (`#000000`): High-contrast overlay text, modal backdrops

### Surface & Borders
- **Surface Light** (`#F5F5F7`): Light background containers, subtle differentiation
- **Border Light** (`#E8E8ED`): Subtle borders, dividers, and edge definition
- **Border Medium** (`#424245`): Secondary borders and subtle separators

### Semantic / Status
- **Error Red Dark** (`#B64400`): Error states, destructive actions, validation failures
- **Error Red Bright** (`#E30000`): High-emphasis error messaging, critical alerts

## 3. Typography Rules

### Font Family
**Primary:** SF Pro Display (`.SFNS-Display`, `system-ui`, `-apple-system`, fallback: `sans-serif`)
**Secondary:** SF Pro Text (`.SFNS-Text`, `system-ui`, `-apple-system`, fallback: `sans-serif`)

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|------------------|-------|
| Display / H1 | SF Pro Display | 80px | 600 | 84px | -0.015em | Hero headlines, campaign titles |
| Heading / H2 | SF Pro Text | 48px | 600 | 56px | -0.010em | Section headings, major content divisions |
| Subheading / H3 | SF Pro Text | 28px | 600 | 33px | -0.005em | Card titles, subsection headers |
| Body / Paragraph | SF Pro Text | 17px | 400 | 25px | 0em | Primary content, product descriptions |
| Body Secondary | SF Pro Text | 12px | 400 | 16px | 0em | Metadata, captions, fine print, form hints |
| Label / Button | SF Pro Text | 17px | 600 | 21px | 0em | Button text, form labels, navigation items |
| Link | SF Pro Text | 17px | 600 | 21px | 0em | Interactive link text, styled as underlined |
| Input / Form | SF Pro Display | 24px | 600 | 24px | 0em | Form input fields, input placeholder text |
| Code / Monospace | Menlo | 13px | 400 | 18px | 0em | Technical content, code blocks |

### Principles
- **Clarity First:** SF Pro Display and SF Pro Text are optimized for legibility at all sizes, with generous line heights supporting readability
- **Hierarchy via Weight & Size:** Visual weight is established through typography rather than color, maintaining a refined aesthetic
- **Consistent Vertical Rhythm:** All line heights are multiples of `4px` base unit, creating predictable spacing relationships
- **Accessible Contrast:** Text colors maintain WCAG AA minimum contrast ratios against all backgrounds
- **Dynamic Sizing:** Typography scales responsively; larger screens may increase base sizes by 10–15%
- **No All-Caps:** Only acronyms and proper nouns use capitals; sentence case preferred for readability

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background:** `#0071E3`
- **Text Color:** `#FFFFFF`
- **Font:** SF Pro Text, 17px, weight 600
- **Padding:** `12px 24px`
- **Border Radius:** `8px`
- **Border:** none
- **Line Height:** 21px
- **Height:** 44px (minimum touch target)
- **Box Shadow:** `0 2px 8px rgba(0, 0, 0, 0.08)`
- **Hover:** `background-color: #0066CC; box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3)`
- **Active:** `background-color: #006EDB`
- **Disabled:** `opacity: 0.5; cursor: not-allowed`

#### Secondary Button
- **Background:** `#F5F5F7`
- **Text Color:** `#1D1D1F`
- **Font:** SF Pro Text, 17px, weight 600
- **Padding:** `12px 24px`
- **Border Radius:** `8px`
- **Border:** `1px solid #E8E8ED`
- **Line Height:** 21px
- **Height:** 44px
- **Box Shadow:** none
- **Hover:** `background-color: #E8E8ED; border-color: #D2D2D7`
- **Active:** `background-color: #D2D2D7`
- **Disabled:** `opacity: 0.5; cursor: not-allowed`

#### Ghost / Text Button
- **Background:** transparent
- **Text Color:** `#0071E3`
- **Font:** SF Pro Text, 17px, weight 600
- **Padding:** `8px 12px`
- **Border Radius:** `0px`
- **Border:** none
- **Line Height:** 21px
- **Height:** 44px
- **Box Shadow:** none
- **Hover:** `text-decoration: underline; color: #0066CC`
- **Active:** `color: #006EDB`
- **Disabled:** `opacity: 0.5; cursor: not-allowed`

#### Accent Button (Orange)
- **Background:** `#FF791B`
- **Text Color:** `#FFFFFF`
- **Font:** SF Pro Text, 17px, weight 600
- **Padding:** `12px 24px`
- **Border Radius:** `8px`
- **Border:** none
- **Line Height:** 21px
- **Height:** 44px
- **Box Shadow:** `0 2px 8px rgba(255, 121, 27, 0.2)`
- **Hover:** `background-color: #E86E0F; box-shadow: 0 4px 12px rgba(255, 121, 27, 0.4)`
- **Active:** `background-color: #D86309`
- **Disabled:** `opacity: 0.5; cursor: not-allowed`

### Cards & Containers

#### Product Card
- **Background:** `#FFFFFF`
- **Text Color:** `#1D1D1F`
- **Padding:** `20px`
- **Border Radius:** `18px`
- **Border:** `1px solid #E8E8ED`
- **Box Shadow:** `0 2px 10px rgba(0, 0, 0, 0.05)`
- **Hover:** `box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); transform: translateY(-4px); transition: all 0.2s ease-out`
- **Image Border Radius:** `12px`
- **Spacing Between Image & Text:** `16px`

#### Hero Card (Full-Width Dark)
- **Background:** `#000000`
- **Text Color:** `#FFFFFF`
- **Padding:** `64px 56px`
- **Border Radius:** `18px`
- **Border:** none
- **Box Shadow:** none
- **Content Alignment:** Left-aligned text over product image
- **Heading Font:** SF Pro Display, 48px, weight 600
- **Body Font:** SF Pro Text, 17px, weight 400

#### Promotional Banner
- **Background:** `#F5F5F7`
- **Text Color:** `#1D1D1F`
- **Padding:** `32px 40px`
- **Border Radius:** `12px`
- **Border:** `1px solid #E8E8ED`
- **Accent Text Color:** `#FF791B`
- **Box Shadow:** none

### Inputs & Forms

#### Text Input
- **Background:** `#FFFFFF`
- **Text Color:** `#1D1D1F`
- **Font:** SF Pro Text, 17px, weight 400
- **Padding:** `12px 16px`
- **Border Radius:** `8px`
- **Border:** `1px solid #E8E8ED`
- **Line Height:** 21px
- **Height:** 44px
- **Placeholder Color:** `#6E6E73`
- **Focus State:** `border-color: #0071E3; box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1); outline: none`
- **Error State:** `border-color: #B64400; background-color: rgba(182, 68, 0, 0.05)`

#### Checkbox / Radio
- **Size:** 24px × 24px (touch target: 44px inclusive)
- **Border Radius:** `6px` (checkbox), `50%` (radio)
- **Default Border:** `1px solid #6E6E73`
- **Checked Background:** `#0071E3`
- **Checked Border:** none
- **Focus Ring:** `box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.2)`

#### Select Dropdown
- **Background:** `#FFFFFF`
- **Text Color:** `#1D1D1F`
- **Font:** SF Pro Text, 17px, weight 400
- **Padding:** `12px 16px 12px 12px`
- **Border Radius:** `8px`
- **Border:** `1px solid #E8E8ED`
- **Height:** 44px
- **Arrow Icon Color:** `#6E6E73`
- **Hover:** `border-color: #D2D2D7`
- **Focus:** `border-color: #0071E3; box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1)`

### Navigation

#### Top Navigation Bar
- **Background:** `#FFFFFF`
- **Text Color:** `#1D1D1F`
- **Font:** SF Pro Text, 17px, weight 400
- **Height:** 44px
- **Padding:** `0px 16px`
- **Border Bottom:** `1px solid #E8E8ED`
- **Box Shadow:** none
- **Link Styling:** Text, no underline by default; underline on hover
- **Logo Font:** SF Pro Display, 24px, weight 600
- **Active Navigation Item:** `color: #0071E3; border-bottom: 2px solid #0071E3`

#### Breadcrumb
- **Font:** SF Pro Text, 12px, weight 400
- **Text Color:** `#6E6E73`
- **Separator:** ` / ` (forward slash)
- **Link Color:** `#0071E3`
- **Link Hover:** `text-decoration: underline; color: #0066CC`
- **Padding:** `12px 16px`

### Links & Typography Elements

#### Link (Inline)
- **Color:** `#0071E3`
- **Font Weight:** 600
- **Font Size:** 17px
- **Text Decoration:** none (underline on hover)
- **Cursor:** pointer
- **Hover:** `color: #0066CC; text-decoration: underline`
- **Visited:** `color: #0066CC`
- **Active:** `color: #006EDB`

#### Link with Arrow
- **Color:** `#0071E3`
- **Font Weight:** 600
- **Font Size:** 17px
- **Arrow:** ` ↗` (U+2197) or ` →` (U+2192)
- **Hover:** `color: #0066CC`

#### Badge
- **Background:** `#F5F5F7`
- **Text Color:** `#1D1D1F`
- **Font:** SF Pro Text, 12px, weight 600
- **Padding:** `4px 8px`
- **Border Radius:** `4px`
- **Border:** none
- **New Badge Variant:** `background: #FF791B; color: #FFFFFF`

## 5. Layout Principles

### Spacing System
**Base Unit:** 8px

**Scale:**
- `8px`: Minimal spacing, tight component clusters
- `12px`: Small spacing, form field margins
- `16px`: Standard component padding
- `20px`: Card internal padding
- `24px`: Section spacing, moderate breathing room
- `32px`: Section vertical spacing, container padding
- `40px`: Large section spacing, page padding
- `48px`: Extra-large spacing, major section breaks
- `56px`: Major container padding
- `64px`: Hero section padding, major visual breaks
- `80px`: Page-level spacing, full-screen sections

**Usage Context:**
- **Component Internal:** 12px–20px (padding within buttons, inputs, cards)
- **Component External:** 16px–24px (margin between components)
- **Section-to-Section:** 48px–80px (vertical spacing between major content blocks)
- **Page Margins:** 40px (desktop), 20px (tablet), 16px (mobile)

### Grid & Container
- **Max Width:** 1440px (desktop content area)
- **Column Strategy:** 12-column grid, adaptable to 6-column (tablet) and 1-column (mobile)
- **Gutter:** 16px between columns
- **Container Padding:** 40px left/right (desktop), 20px (tablet), 16px (mobile)
- **Section Pattern:** Full-width container with centered inner content block
- **Card Grid:** 3-column layout (desktop) with 24px gap; collapses to 2-column (tablet) and 1-column (mobile)

### Whitespace Philosophy
Whitespace is treated as a design element, not negative space. Generous margins around content create visual clarity and reduce cognitive load. Sections are clearly separated by 48–80px vertical spacing. Cards and components maintain 16–20px internal padding. Text is never flush against edges; minimum 16px margin on all sides. Floating elements (buttons, badges) within cards have 12px clearance from edges.

### Border Radius Scale
- **`0px`:** Sharp edges, navigation bars, full-width elements
- **`4px`:** Tight radius, badges, small utility elements
- **`8px`:** Standard radius, buttons, inputs, small cards
- **`12px`:** Medium radius, larger input fields, secondary cards
- **`18px`:** Large radius, primary product cards, hero sections
- **`50%`:** Circular, avatars, decorative elements, circular buttons
- **`56px`:** Ultra-rounded, pill-style buttons, full-radius small elements

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow | Navigation bars, full-width sections, flat overlays |
| Raised | `0 2px 8px rgba(0, 0, 0, 0.05)` | Standard cards, product cards, quiet elevation |
| Lifted | `0 4px 12px rgba(0, 0, 0, 0.1)` | Hover states on cards, interactive surfaces, modal containers |
| Floating | `0 8px 24px rgba(0, 0, 0, 0.15)` | Modals, dropdowns, floating action buttons |
| Deep | `0 12px 32px rgba(0, 0, 0, 0.2)` | Full-screen overlays, z-index 1000+ elements |

**Shadow Philosophy:** Shadows are used sparingly to indicate interactivity and elevation without overwhelming the minimal aesthetic. Subtle, diffused shadows create depth without visual heaviness. Shadows strengthen on hover/active states to provide clear interaction feedback. Dark overlays use semi-transparent black (`rgba(0, 0, 0, 0.4)` to `rgba(0, 0, 0, 0.6)`) for modal backdrops and image overlays, maintaining readability of content beneath.

## 7. Do's and Don'ts

### Do
- **Embrace whitespace** — Use generous margins and padding to create visual breathing room; never fill every pixel
- **Prioritize legibility** — Maintain high contrast ratios (WCAG AA minimum 4.5:1 for text) across all backgrounds
- **Use SF Pro typography** — Consistently apply SF Pro Display and SF Pro Text; avoid mixing serif or other font families
- **Test all interactive states** — Implement clear hover, active, focus, and disabled states for every interactive element
- **Maintain 44px minimum touch targets** — All clickable elements should be at least 44px × 44px for mobile accessibility
- **Layer depth deliberately** — Use shadows only to indicate elevation and interactivity; avoid shadow bloat
- **Apply blue and orange intentionally** — Use `#0071E3` for primary actions and `#FF791B` for promotional emphasis
- **Group related content** — Use consistent card styling and spacing to establish visual relationships
- **Include focus indicators** — Outline or box-shadow focus states for keyboard navigation accessibility
- **Respect the neutral palette** — Use `#1D1D1F`, `#333336`, and `#6E6E73` for text hierarchy and subtle distinction

### Don't
- **Avoid color as sole indicator** — Never rely on color alone to convey information; use text labels and icons in addition
- **Don't shrink below 12px typography** — Minimum body text is 12px; smaller sizes reduce accessibility
- **Avoid thin font weights below 17px** — Keep weights at 400 or 600 for body text; avoid 300 or lighter for legibility
- **Don't use pure black text on white** — Use `#1D1D1F` on `#FFFFFF` instead for reduced eye strain
- **Avoid excessive shadows** — Limit shadow stacking; flat or single-shadow approach maintains clarity
- **Don't mix border radius styles** — Stick to the scale (0px, 4px, 8px, 12px, 18px, 50%); avoid arbitrary values
- **Avoid overcrowding cards** — Maintain minimum 16px padding inside cards; don't pack content too densely
- **Don't disable buttons without visual feedback** — Use reduced opacity and clear disabled styling
- **Avoid animated text flashing** — Respect `prefers-reduced-motion` media query for animations
- **Don't break grid alignment** — Maintain consistent gutter spacing and column alignment across layouts

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Font Scaling | Grid Columns | Card Layout | Spacing Adjustment |
|------|-------|--------------|--------------|-------------|-------------------|
| Mobile | 320px–599px | Base (no scaling) | 1 column, full-width | Single card per row | 16px margins, 8px–16px padding |
| Tablet | 600px–999px | +5% increase | 6 columns, 2-card grids | 2 cards per row | 20px margins, 16px–24px padding |
| Desktop | 1000px+ | Base + 10% on headings | 12 columns, 3-card grids | 3 cards per row | 40px margins, 20px–32px padding |
| Large Desktop | 1440px+ | Base | 12 columns, optimized width | 3–4 cards per row | 40px margins, full whitespace usage |

**Key Changes by Breakpoint:**
- **Mobile:** Navigation collapses to hamburger menu; hero text reduces to 48px; buttons stack vertically; cards full-width; product images square or portrait orientation
- **Tablet:** Navigation icons inline; typography increases 5%; cards arrange 2-per-row; moderate spacing; product images slightly larger
- **Desktop:** Full navigation bar; typography optimal; 3-column product grids; generous whitespace; hero imagery at full scale

### Touch Targets
- **Minimum Size:** 44px × 44px (mobile, all interactive elements)
- **Recommended Size:** 48px × 48px (buttons, links)
- **Minimum Spacing:** 8px between adjacent interactive elements (prevents accidental touches)
- **Link Padding:** 8px horizontal padding around link text to expand touch area
- **Button Padding:** 12px horizontal, 12px vertical (44px total height including text)
- **Checkbox / Radio:** 24px visual size, 44px interactive area (including padding)

### Collapsing Strategy
- **Navigation:** Top bar compresses to hamburger icon at 600px breakpoint; prioritize Home, Search, Cart, Account
- **Product Grids:** 3 columns → 2 columns (600px) → 1 column (< 600px)
- **Hero Section:** Full-width image + text side-by-side (desktop) → stacked vertically with image above text (tablet) → image full-width, text below (mobile)
- **Spacing:** 80px section gaps reduce to 48px (tablet) and 24px (mobile)
- **Typography:** Headings reduce 10–20% at tablet, 20–30% at mobile; body text remains 17px minimum
- **Modals:** Full-screen on mobile (100% width, 100vh max-height); centered box on desktop (max 90vw)
- **Forms:** Label-above-input layout on mobile; label-beside-input (inline) on desktop if space permits

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** Apple Blue (`#0071E3`)
- **Primary CTA Hover:** Apple Blue Dark (`#006EDB`)
- **Accent / Promotion:** Bright Orange (`#FF791B`)
- **Heading Text:** Text Primary (`#1D1D1F`)
- **Body Text:** Text Primary (`#1D1D1F`)
- **Secondary Text:** Text Secondary (`#333336`)
- **Disabled / Caption:** Text Tertiary (`#6E6E73`)
- **Background / Cards:** White (`#FFFFFF`)
- **Light Surface:** Surface Light (`#F5F5F7`)
- **Borders:** Border Light (`#E8E8ED`)
- **Error State:** Error Red Dark (`#B64400`)
- **Overlay / Dark:** True Black (`#000000`)

### Iteration Guide

1. **Typography Foundation:** All body text is SF Pro Text, 17px, weight 400, line-height 25px. Headings use SF Pro Display or SF Pro Text weight 600. Never use lighter than 400 or smaller than 12px for body content.

2. **Color Hierarchy:** Start with `#1D1D1F` for primary text, `#0071E3` for all primary interactive elements, and `#FF791B` for promotional or accent emphasis. Links are always `#0071E3` until visited (`#0066CC`).

3. **Spacing Consistency:** Apply 8px base unit across all padding and margins. Component internal padding is 12px–20px; external margins are 16px–24px. Section-level spacing is 48px–80px.

4. **Button Sizing:** All buttons are minimum 44px height with 12px horizontal padding. Text is centered, vertically aligned. Primary buttons use `#0071E3` background with white text; secondary buttons use `#F5F5F7` background with dark text.

5. **Card Styling:** Product cards are `#FFFFFF` with `1px solid #E8E8ED` border and `18px` border radius. Internal padding is 20px. Images inside cards have `12px` border radius. Hover state elevates with `box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1)` and slight upward transform.

6. **Forms & Inputs:** Text inputs and selects are 44px height, `#FFFFFF` background, `1px solid #E8E8ED` border, `8px` border radius. Focus state adds `border-color: #0071E3` and `box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1)`. Error states use `#B64400` border and light error background.

7. **Navigation Styling:** Top bar is 44px height, white background, dark text. Links are 17px, weight 400; active states are underlined or blue. No shadows on navigation. Breadcrumbs are 12px, light gray text, with blue links.

8. **Touch Accessibility:** Every interactive element is minimum 44px × 44px. Links and buttons have 8px horizontal padding around text. Modals and overlays respect safe area insets on mobile.

9. **Whitespace Priority:** Never place text or components flush against edges. Minimum 16px margin on all sides. Generous spacing between sections (48–80px) creates visual separation and focus. Use Surface Light (`#F5F5F7`) sparingly for subtle differentiation only.

10. **Responsive Scaling:** At 600px breakpoint, collapse multi-column grids to 2 columns, then 1 column below 600px. Reduce section margins to 24px on mobile. Typography remains readable at all sizes; never shrink heading sizes below 24px or body below 12px. Hero sections stack image-above-text on mobile.