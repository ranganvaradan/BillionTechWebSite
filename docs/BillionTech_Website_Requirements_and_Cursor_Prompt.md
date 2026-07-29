# BillionTech Corporate Website — Reconciled Requirements & Cursor Build Prompt

## 0. What changed from your draft, and why

Your draft spec (navy/blue palette, generic "Procure-to-Pay / Order-to-Cash / Lending Stack" naming, no real customer data) is a solid structural skeleton, but it doesn't match two things you now have on file.

**1. Colors and fonts now match your live application (BillionTechLMS / Flow), not the sales decks.** An earlier pass of this doc used colors pulled from your PPT decks (navy/teal). You've corrected that — the site should match the design system your product UI already uses, which lives at `ui-service/src/design-system/` in the LOS codebase (`tokens.css`, `fonts.css`, `layouts.css`, `components.css`):

| Role | Value | Notes |
|---|---|---|
| Primary (brand/CTA) | `#f97316` (orange) | Hover state: `#ea6c0a` |
| Primary light bg | `#fff7ed` | Tinted backgrounds behind orange accents |
| Gray scale | `#f8f9fb` → `#111827` | Full scale, light to dark — use for text, borders, section backgrounds |
| Success | green (with matching light bg) | Same semantic pattern as the app |
| Error | red (with matching light bg) | |
| Warning | amber (with matching light bg) | |
| Info | blue (with matching light bg) | |
| White | `#FFFFFF` | Base |

Fonts: **Inter** (body/UI text) + **Plus Jakarta Sans** (headings/logo) — both loaded via Google Fonts in the app, same approach for the site.

Layout conventions worth carrying over for visual consistency (even though the marketing site isn't a sidebar app): the app uses a 256px sidebar, fixed 52px top nav, and orange-highlighted active states — the site's top nav should borrow the same accent logic (orange underline/highlight on active nav items, orange primary buttons) so a visitor moving from the marketing site into the product feels zero visual discontinuity.

The deck's navy/teal palette (`#0D1B2A`, `#1A5276`, `#0D9488`) is now **not used** — that was sales-collateral styling, not product-application styling, and you've confirmed you want the latter.

**2. Your real product names, positioning, and proof points.** Your platform is not generically named "Procure-to-Pay / Order-to-Cash / Lending Stack" — it's four named, branded products:

- **Flow P2P** (Procure-to-Pay) — 3 paying pilots, manufacturing & FMCG
- **Flow O2C** (Order-to-Cash) — LIVE at TTK Prestige (₹3,000 Cr revenue, 3,500+ distributors)
- **SCF** (Supply Chain Finance) — LIVE with Sundaram Finance (exclusive partner, production since FY2020), ICICI Bank, TATA Capital
- **BillionTech Lend** (LOS + AI-LOS) — self-hosted, RBI DLD 2025 compliant

Master tagline from the deck: **"The Operating System for India's Supply Chain & Lending."**

I've rebuilt the requirements below around your real products, real named customers, and real metrics (₹1,500 Cr+ platform-enabled loans, 62,000+ invoices discounted, 80%+ auto-match rates, 6–7 week deployment, etc.) — all pulled directly from your decks, so nothing here is invented. Your original "don't invent customer names/stats" rule is preserved; I'm just using the real ones you already have.

The generic LOS/LMS/PLP/AI-LOS lending page structure from your draft is kept, but reframed under **BillionTech Lend** as your product name, with LOS and AI-LOS as its two layers (per the deck) rather than four separate lending products — PLP and standalone LMS pages are folded in as capability sections unless you tell me you want them as distinct product SKUs on the site.

---

## 1. Objective

Build a premium, enterprise-grade marketing website for BillionTech that positions it as:

> The operating system for India's supply chain and lending — four integrated, production-proven products, not a collection of point tools.

Audience: CFOs, CPOs, Finance Directors, Heads of Credit at manufacturers, FMCG companies, NBFCs, and banks.

---

## 2. Technology Stack & Design Tokens

- React + TypeScript + Vite
- Material UI (MUI v5+)
- React Router
- Structured local TypeScript data files (no backend/CMS in v1)
- `npm install`, `npm run dev`, `npm run build` must all work cleanly

**Design tokens (theme.ts) — mirror the app's `design-system/tokens.css` exactly:**

```ts
export const colors = {
  primary: '#f97316',        // brand orange — CTAs, links, active states
  primaryHover: '#ea6c0a',
  primaryLight: '#fff7ed',   // tinted backgrounds behind orange accents/icons

  gray50:  '#f8f9fb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray500: '#6b7280',
  gray700: '#374151',
  gray900: '#111827',

  white: '#FFFFFF',

  // Semantic — match the app's existing pattern of a solid + a light-bg pair
  success: '#16a34a',      successLight: '#f0fdf4',
  error:   '#dc2626',      errorLight:   '#fef2f2',
  warning: '#f59e0b',      warningLight: '#fffbeb',
  info:    '#2563eb',      infoLight:    '#eff6ff',
};

export const fonts = {
  heading: `'Plus Jakarta Sans', Inter, 'Segoe UI', Arial, sans-serif`,
  body: `'Inter', 'Segoe UI', Arial, sans-serif`,
};
```

Load Inter and Plus Jakarta Sans via Google Fonts — same as the app does. If exact gray-scale or semantic-color hex values differ once you pull the real `tokens.css` file, replace the placeholders above with the exact values rather than approximating; ideally, have Cursor read `tokens.css`/`fonts.css` directly from the LOS repo rather than retyping values (see §24).

---

## 3. Brand Personality

Enterprise-grade, India-ready, operationally credible, proof-driven. The deck's own voice is confident and specific ("6–7 weeks," "80%+ auto-matched," named customers) rather than vague — the website should carry that same specificity, not water it down into generic SaaS marketing copy.

Avoid: generic AI imagery, stock photography heroes, unverified superlatives, cartoon illustrations.

---

## 4. Site Architecture

```
/
/products/flow-p2p
/products/flow-o2c
/products/scf
/products/billiontech-lend
/why-billiontech
/who-we-serve
/proof              (customer outcomes / case studies)
/pricing            (commercial model — optional, gate behind CTA if you'd rather not publish pricing publicly)
/about
/contact
```

Optional/future: `/resources`, `/security`.

---

## 5. Navigation

Top nav: **Products** (mega menu) · **Who We Serve** · **Proof** · **Why BillionTech** · **About** · **Contact**

Top-right CTAs: **Request a Demo** · **Talk to Us**

### Products Mega Menu

| Product | One-liner | Status badge |
|---|---|---|
| Flow P2P | Procure-to-Pay — 6 AI agents, RFQ to payment in hours | 3 Paying Pilots |
| Flow O2C | Order-to-Cash — distributor portal, virtual account matching | LIVE · TTK Prestige |
| SCF | Supply Chain Finance — embedded, multi-anchor, financier-neutral | LIVE · 3 BFSI Anchors |
| BillionTech Lend | LOS + AI credit intelligence, self-hosted | RBI DLD 2025 Compliant |

Footer of mega menu: "Explore the complete BillionTech platform" → **View All Products**

---

## 6. Homepage

### Hero

Heading: **"The Operating System for India's Supply Chain & Lending"**
Subheading: **"Four battle-tested products. One integrated platform. Every deployment in 6–7 weeks — no ERP changes."**

Primary CTA: Explore Our Platforms · Secondary CTA: Request a Demo

Hero visual: a system diagram — four product blocks (Flow P2P, Flow O2C, SCF, BillionTech Lend) connecting into a central "BillionTech" node, with lines out to ERP / Suppliers / Distributors / Banks & NBFCs. Not a stock photo.

### Proof Strip (directly under hero)

Real numbers from the deck, as a stat row:

- **₹1,500 Cr+** — Platform-enabled loans (cumulative SCF disbursed)
- **62,000+** — Invoices discounted via SCF
- **3,500+** — Distributors live on O2C (TTK Prestige network)
- **80%+** — Invoices/payments auto-matched across O2C and P2P

### The Problem We Solve

Four cards, pulled directly from deck slide 2: Zero visibility/manual reconciliation · Siloed ERP systems · Slow lending decisions · No sub-contractor traceability. Include the RBI DLD 2025 / DPDP Act / Account Aggregator compliance-pressure point — it's a genuine differentiator buyers care about.

### Four Products, One Platform

Four product cards (Flow O2C, Flow P2P, SCF, BillionTech Lend), each with: status badge (LIVE / pilots), one-line description, 3–4 key capabilities, named buyer persona (CFO/CPO/Head of Credit), CTA to product page. Content per product is in §8–11 below.

### Why BillionTech — Six Differentiators

Straight from deck slide 8:
1. Deploys in 6–7 weeks — no ERP rework
2. AI that passes the "Unplug Test" — disable AI, platform stops functioning (it's core, not a side panel)
3. Lender-trained credit model — trains on the client's own historical data
4. Live institutional proof — Sundaram Finance, TTK Prestige, ICICI Bank, TATA Capital in production
5. Built for India, not adapted for it — job-work sub-contracting, GST, RBI DLD 2025, WhatsApp notifications
6. 1/10th the cost of SAP Ariba — ₹5–10 Cr/yr and 12–18 months for Ariba vs. 6–7 weeks at mid-market pricing for BillionTech

### Proof — Live Deployments

Reuse deck slide 9 exactly: Sundaram Finance (exclusive SCF partner, 25 programmes, 28+ dealers, live since FY2020), TTK Prestige (₹3,000 Cr manufacturer, 3,500+ distributors, O2C), ICICI Bank (SCF portfolio live), TATA Capital (SCF portfolio live), 3 paying P2P pilots.

### Who We Serve

Three segment cards — FMCG & Manufacturers / NBFCs & Banks / Corporate Anchors — each with buy signals and primary buyer, from deck slide 10.

### Final CTA

Heading: "Let's scope your pilot." Sub: "6–7 weeks. One measurable outcome, agreed upfront." Buttons: Request a Demo · Talk to Us

---

## 7. Shared Product Page Template

Each of the four product pages (`/products/flow-p2p`, `/products/flow-o2c`, `/products/scf`, `/products/billiontech-lend`) follows this structure:

1. Hero (product name, one-liner, status badge, stat row, CTA)
2. The problem (2–4 pain-point cards, from that product's deck)
3. How it works (numbered workflow — reuse the deck's step-by-step flow diagrams)
4. Platform capabilities (grouped feature lists, from deck capability slides)
5. AI/intelligence layer where applicable (P2P's 6 agents; Lend's AI-LOS) — always paired with a guardrail statement on human control
6. Case study / proof (named customer, real metrics)
7. Competitive comparison table (P2P has one built already — vs. SAP Ariba/Zycus/Coupa; build equivalents for others only if you have the data, otherwise omit rather than invent)
8. Commercial model (pricing structure from deck slide 11, if you want pricing public)
9. CTA

---

## 8. Flow P2P — Procure-to-Pay

Tagline: "From RFQ to payment in hours, not days."

Stats: 6 AI Agents Working Autonomously · 50–70% Faster Procurement Cycles · 80%+ Invoices Auto-Matched · 100% Sub-Con Visibility

**The 6 AI Agents** (each gets a card: name, what it does):
1. RFQ Agent — auto-generates RFQs from work orders with full specs
2. Negotiation Agent — AI quote capture/comparison from email, any format
3. PO Agent — converts approved quotes to POs, routes approvals
4. Matching Agent — 3-way match (PO/GRN/Invoice), 80%+ auto-cleared
5. Job-Work Agent — QR-coded batch tracking at sub-contractors
6. Traceability Agent — full genealogy: finished good → raw material → supplier

**Signature differentiator:** job-work/sub-contractor traceability — explicitly "a capability no global platform offers for India's manufacturing ecosystem." This is P2P's sharpest wedge vs. SAP Ariba/Zycus/Coupa (none support job-work) — make this a hero-level claim on this page, not buried.

**Workflow diagram (7 steps):** Order → Sourcing → Evaluation → Procurement → Logistics → Receipt → Payment

**Competitive table:** include the built one from the deck (BillionTech P2P vs. SAP Ariba vs. Zycus Merlin vs. Coupa) — it's already differentiated and specific.

---

## 9. Flow O2C — Order-to-Cash

Tagline: "From invoice to cash — automated. The interaction layer between your ERP and your distributor network."

Stats: 80%+ Payments Auto-Matched · 15–20 Days DSO Reduction · 3,500+ Distributors on Platform · 6–7 Weeks to Full Deployment

**How it works (6 steps):** Invoice generated in ERP → Distributor self-service portal → Payment via virtual account → Auto-allocation → Real-time reconciliation → Visibility & reporting.

**Capability groups:** Invoice ingestion & ERP integration · Virtual account & payment matching · Credit/debit notes & deductions · Distributor self-service portal · Collections & cash flow intelligence · Downstream dealer & inventory management.

**Case study — TTK Prestige:** ₹3,000 Cr manufacturer, 3,500+ distributors, full network live. Before/after framing (manual reconciliation consuming 3–4 FTEs → same team now handles 5× the volume) is compelling and already written in the deck — reuse it directly on this page as a before/after two-column layout.

---

## 10. SCF — Supply Chain Finance

Tagline: "Embedded working capital for your dealer and distributor network. Finance at the point of transaction — not bolted on after."

Stats: ₹1,500 Cr+ Platform-Enabled Loans · 25 Active Corporate Programmes · 5+ Years Production Deployment

**Market context stats (good for a market-sizing subsection):** ₹20L Cr+ addressable channel finance market in India · 63M+ MSMEs (30% of India's GDP) · 14–18% typical overdraft cost distributors pay today · 9.2% India SCF market CAGR FY24–32.

**How it works (6 steps):** Anchor programme setup → Digital distributor onboarding (under 72 hrs) → Invoice upload & limit check → Borrower acceptance → Lender sanction & disbursement → Repayment & closure.

**Key positioning: financier-neutral, multi-anchor.** Distributors choose their financier; no lock-in. Currently live: Sundaram Finance (exclusive partner), ICICI Bank, TATA Capital — show as three named-partner logos/cards with individual stats (each partner's card copy is already written in the deck, slide 6/9).

---

## 11. BillionTech Lend — LOS + AI

Tagline: "End-to-end digital lending — lead to disbursement — with AI credit intelligence that trains on your own historical loan data. Your portfolio. Your model. Your advantage."

Stats: <48 hrs Loan Processing Target · ~5 min AI Credit Memo Draft · Daily Portfolio Monitoring · 100% RBI DLD 2025 Compliant

**Two-layer framing (this is the actual product architecture — keep it, don't split into 4 separate LOS/LMS/PLP/AI-LOS product pages unless you confirm otherwise):**
- **LOS (foundation layer):** full digital lifecycle, Kanban pipeline, digital KYC (Aadhaar OTP, PAN, GSTIN, Video KYC, Account Aggregator, eSign), configurable workflow engine, RBI DLD 2025 compliance built-in, self-hosted/air-gap-ready.
- **AI-LOS (intelligence layer):** risk score 0.00–1.00 with reasoning (Approve/Refer/Decline + confidence %), AI credit memo drafted in ~5 minutes, peer comparables (5 similar past loans from the lender's own book), early warning system, counteroffer engine on decline.

**Guardrail statement (required):** "AI-LOS analyses, scores, and drafts. Final approval, disbursement, and every accounting entry remain with authorised credit personnel." Use `GuardrailPanel` component here and on the P2P page (its 6-agent framing needs the same treatment).

---

## 12. Why BillionTech (`/why-billiontech`)

Standalone page expanding the homepage's six-differentiator section with full detail + the "1/10th cost of SAP Ariba" comparison and the "Unplug Test" concept as a named, ownable idea (worth a dedicated visual — a toggle/switch illustration showing "AI on" vs "AI off" states).

---

## 13. Who We Serve (`/who-we-serve`)

Three segments (FMCG & Manufacturers / NBFCs & Banks / Corporate Anchors), each with: relevant products, buy signals (bulleted, from deck slide 10), primary buyer persona, time-to-value note (6–7 weeks, paid pilot entry point).

---

## 14. Proof (`/proof`)

Dedicated page for the case studies your decks already contain in detail:
- **TTK Prestige** (O2C) — full before/after
- **Sundaram Finance** (SCF, exclusive partner since FY2020, 25 programmes, 28+ dealers)
- **ICICI Bank** (SCF, portfolio live)
- **TATA Capital** (SCF, portfolio live)
- **3 P2P pilots** (manufacturing & FMCG, 60–70% procurement cycle time reduction reported)

Keep the "CFO reference available" language from the deck where present — it's a credible trust signal.

---

## 15. Commercial / Pricing (`/pricing`) — optional

Content exists in the deck (slide 11): Flow O2C = monthly seat fee + per-invoice; Flow P2P = monthly seat fee + per-PO fee; SCF = 0.25% p.a. on AUM + seat fee; BillionTech Lend = annual licence + per-application fee. Plus the 4-step paid-pilot process (Discovery → Integration → Go-Live → Results Review, 6–7 weeks).

**Decide before build:** do you want pricing mechanics public, or should this page just describe the paid-pilot process and push to "Talk to Us" for commercial terms? Flag your preference — I've left it as a separate optional route so Cursor can build it last / skip it without blocking everything else.

---

## 16. About (`/about`)

Structure per your original draft (principles: ERP stays system of record, BillionTech is the workflow/intelligence layer, deterministic logic before AI, human control over financial decisions, India-ready architecture). Do not add unverified company history, headcount, funding, or founding date unless you supply it.

---

## 17. Contact (`/contact`)

Per your original draft: form with Name, Company, Business email, Phone, Country, Product interest (Flow P2P / Flow O2C / SCF / BillionTech Lend / Multiple), Company type (Manufacturer/Distributor/Bank/NBFC/Fintech/Other). No live submission in v1 — validate, show success state, log locally in dev only.

---

## 18. Shared Components

```
AppHeader · MegaMenu · MobileNavigationDrawer
HeroSection · SectionHeading · StatRow
ProductCard · ProductPageTemplate
CapabilityGroup · WorkflowDiagram (numbered step flow)
AIAgentCard (for P2P's 6 agents) · GuardrailPanel
CaseStudyCard (logo/name, stat row, before/after)
CompetitiveTable
IndustryCard · BuyerPersonaTag
CTASection · Footer · ContactForm
```

---

## 19. Data Files

```
src/data/products.ts       — Flow P2P, Flow O2C, SCF, BillionTech Lend (full structured content)
src/data/caseStudies.ts    — TTK Prestige, Sundaram Finance, ICICI Bank, TATA Capital, P2P pilots
src/data/differentiators.ts
src/data/segments.ts       — who-we-serve content
src/data/navigation.ts
src/data/pricing.ts        — commercial model, if §15 is in scope
```

Each product entry should include: `name`, `tagline`, `statusBadge`, `statRow`, `problemCards`, `workflowSteps`, `capabilityGroups`, `aiAgents?`, `caseStudyRef`, `competitiveTable?`, `route`.

---

## 20. Content Rules

Every number, customer name, and claim on this site should trace back to the five decks you supplied. Do not extend beyond them (e.g., don't invent a 5th case study, don't round metrics up, don't add SOC 2/ISO badges you haven't confirmed you hold). Where the decks say "reported" (e.g., the 60–70% P2P cycle-time reduction), keep that qualifier on the site rather than stating it as a flat fact.

---

## 21. Responsive & Accessibility

Same as your original draft: test at 375/768/1024/1440px, semantic headings, keyboard nav, visible focus states, alt text, WCAG-AA contrast (verify orange-on-white combinations specifically — `#f97316` on white passes for large/bold text and UI elements but is borderline for small body text; use `gray900`/`gray700` for body copy and reserve orange for headings, buttons, links, and icons, matching how the app itself uses it).

---

## 22. SEO

Homepage title: **"BillionTech | The Operating System for India's Supply Chain & Lending"**
Description: **"Flow P2P, Flow O2C, Supply Chain Finance, and BillionTech Lend — four integrated platforms live with Sundaram Finance, TTK Prestige, ICICI Bank, and TATA Capital. Deploy in 6–7 weeks."**

---

## 23. Implementation Sequence

**Phase 1 — Foundation:** theme tokens, fonts, routes, header/mega-menu/footer, typed product + case study data.
**Phase 2 — Homepage:** hero, proof strip, problem section, four product cards, six differentiators, proof section, who-we-serve, final CTA.
**Phase 3 — Product pages:** Flow P2P, Flow O2C, SCF, BillionTech Lend (in that order — P2P has the richest, most differentiated content, good to get the template right on it first).
**Phase 4 — Supporting pages:** Why BillionTech, Who We Serve, Proof, About, Contact, Pricing (if in scope).
**Phase 5 — Polish:** responsive QA, accessibility pass, SEO, build validation.

Do not auto-continue between phases without reporting completion — same discipline as your original spec.

---

## 24. First Cursor Task — Ready to Paste

```text
You are working in the BillionTech website frontend repository.

GOAL
Create the visual and structural foundation for the BillionTech corporate website — an
enterprise SaaS marketing site for a company with four live/piloted products: Flow P2P
(Procure-to-Pay), Flow O2C (Order-to-Cash), SCF (Supply Chain Finance), and BillionTech
Lend (LOS + AI-LOS lending).

BEFORE CODING
1. Inspect the existing repository and frontend stack.
2. Reuse the existing React + TypeScript + Vite + Material UI setup if present.
3. Do not remove existing application code unless this is a separate website repository.
   If adding to the existing product repo, place this in a clearly separated app/package.

DESIGN SYSTEM — must visually match BillionTech's existing application (BillionTechLMS /
Flow), not a new palette. Do not substitute a default MUI theme and do not invent colors.

STEP ZERO: Locate the real design-system source files before writing any theme code.
They live at ui-service/src/design-system/ in the LOS codebase (tokens.css, fonts.css,
layouts.css, components.css, content-theme.css, tailwind-v4-bridge.css — the same files
already ported into the Ops Console). If that path is accessible from this repo or a
sibling checkout, read the actual files and use their exact hex values, spacing, and
radius tokens verbatim. Only fall back to the approximate values below if those files
are genuinely unavailable to you, and flag clearly that you used placeholders.

Approximate values (replace with real tokens.css values per Step Zero if possible):
Colors:
  primary:       #f97316   (brand orange — CTAs, active nav, links)
  primaryHover:  #ea6c0a
  primaryLight:  #fff7ed   (tinted backgrounds behind orange accents/icons)
  gray50:        #f8f9fb
  gray100:       #f3f4f6
  gray200:       #e5e7eb
  gray300:       #d1d5db
  gray500:       #6b7280
  gray700:       #374151
  gray900:       #111827
  white:         #FFFFFF
  success / successLight, error / errorLight, warning / warningLight, info / infoLight
    — each a solid + light-bg pair, matching the app's existing semantic-color pattern

Fonts: headings/logo in "Plus Jakarta Sans", body/UI text in "Inter" — load both via
Google Fonts, same as the app does.

Layout cues to echo for continuity with the product app: orange underline/highlight on
active top-nav items, orange primary buttons with the hover state above, rounded-corner
cards matching the app's radius convention (check components.css for the exact value).

Put all of the above in src/theme/tokens.ts and wire an MUI ConfigProvider/theme around
it so every component consumes the same palette — no hardcoded hex values in components.

Also check for a BillionTech logo file (brand/ or public/ folder in the LOS codebase —
BillionTech_Logo_Final.png) and reuse that exact asset in the site header/footer rather
than recreating the logo.

CREATE
- Global MUI theme from the tokens above
- Responsive top navigation with a Products mega menu (4 items: Flow P2P, Flow O2C, SCF,
  BillionTech Lend — each with name, one-line description, and a status badge like
  "LIVE · TTK Prestige" or "3 Paying Pilots")
- Mobile navigation drawer
- Footer (Products / Company / Trust columns)
- React Router routes (see below)
- Typed navigation and product data files (src/data/products.ts, src/data/navigation.ts)
  — populate with the real product names, taglines, and status badges above; leave
  detailed page content as clearly marked TODO placeholders for the next task
- Homepage shell with placeholder sections in this order: Hero, Proof Strip (stat row),
  Problem We Solve, Four Products, Why BillionTech (six differentiators), Proof (live
  deployments), Who We Serve, Final CTA

ROUTES
/
/products/flow-p2p
/products/flow-o2c
/products/scf
/products/billiontech-lend
/why-billiontech
/who-we-serve
/proof
/about
/contact

DESIGN QUALITY BAR
- Enterprise-grade, serious B2B SaaS — not flashy, not a generic template
- No stock-photo hero — hero visual should be a simple system diagram placeholder
  (four product blocks connecting to a central node) that we'll refine in a later task
- No unsupported claims in placeholder copy — use the real stats provided above only

ACCEPTANCE CRITERIA
- All 9 routes load without errors
- Header, mega menu, footer, and mobile drawer all work
- Homepage sections are scaffolded in the specified order
- npm run build passes with no TypeScript errors
- No backend/API changes
- Stop after this task and report: files changed, and a screenshot or description of the
  rendered homepage and one product page
```

---

## 25. Follow-up Cursor tasks (queue these after Task 1 is verified)

- **WEB-2:** Flow P2P product page — full content per §8 (6 AI agent cards, 7-step workflow diagram, competitive table vs. SAP Ariba/Zycus/Coupa).
- **WEB-3:** Flow O2C product page — full content per §9 (6-step workflow, TTK Prestige case study as before/after layout).
- **WEB-4:** SCF product page — full content per §10 (market stats, 6-step workflow, three named-partner cards for Sundaram Finance/ICICI Bank/TATA Capital).
- **WEB-5:** BillionTech Lend product page — full content per §11 (two-layer LOS/AI-LOS framing, guardrail panel, risk-score visual).
- **WEB-6:** Why BillionTech, Who We Serve, Proof, About, Contact pages.
- **WEB-7:** Responsive + accessibility + SEO polish pass.

Run each task independently through your usual Claude → Cursor → verify workflow, and confirm each phase visually in the browser before moving to the next — same discipline as BillionTechLMS.
