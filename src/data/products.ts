export interface ProductStat {
  value: string;
  label: string;
}

export interface ProblemCard {
  title: string;
  description: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface CapabilityGroup {
  title: string;
  items: string[];
}

export interface AIAgent {
  name: string;
  description: string;
}

export interface CompetitiveRow {
  capability: string;
  billiontech: string;
  competitors: Record<string, string>;
}

export interface ProductPageSections {
  problemTitle: string;
  problemSubtitle: string;
  workflowSubtitle: string;
  capabilitiesSubtitle: string;
  proofTitle: string;
  proofSubtitle: string;
  ctaHeading: string;
  ctaSubheading: string;
  heroCallout?: { title: string; body: string };
  compareTitle?: string;
  compareSubtitle?: string;
  aiTitle?: string;
  aiSubtitle?: string;
  guardrail?: string;
  marketTitle?: string;
  marketSubtitle?: string;
  partnersTitle?: string;
  partnersSubtitle?: string;
  layersTitle?: string;
  layersSubtitle?: string;
  riskTitle?: string;
  riskSubtitle?: string;
}

export interface PartnerProof {
  name: string;
  badge?: string;
  detail: string;
  metrics?: ProductStat[];
}

export interface ProductLayer {
  id: string;
  name: string;
  role: string;
  description: string;
  items: string[];
}

export interface Product {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  oneLiner: string;
  statusBadge: string;
  route: string;
  /** Parent platform slug: 'flow' | 'finance' */
  platform: 'flow' | 'finance';
  buyerPersona: string;
  keyCapabilities: string[];
  statRow: ProductStat[];
  // Detailed page content — populated in later WEB tasks
  problemCards: ProblemCard[];
  workflowSteps: WorkflowStep[];
  capabilityGroups: CapabilityGroup[];
  aiAgents?: AIAgent[];
  caseStudyRef?: string;
  competitiveTable?: {
    columns: string[];
    rows: CompetitiveRow[];
  };
  marketStats?: ProductStat[];
  partners?: PartnerProof[];
  layers?: ProductLayer[];
  showRiskScoreVisual?: boolean;
  sections?: ProductPageSections;
}

export const products: Product[] = [
  {
    id: 'flow-p2p',
    name: 'Flow P2P',
    shortName: 'P2P',
    tagline: 'From RFQ to payment in hours, not days.',
    oneLiner: 'Procure-to-Pay — 6 AI agents, RFQ to payment in hours',
    statusBadge: '',
    route: '/products/flow-p2p',
    platform: 'flow',
    buyerPersona: 'CPO / Head of Procurement',
    keyCapabilities: [
      '6 autonomous AI agents',
      '3-way match, 80%+ auto-cleared',
      'Job-work / sub-contractor traceability',
      'Full genealogy: finished good → supplier',
    ],
    statRow: [
      { value: '6', label: 'AI Agents Working Autonomously' },
      { value: '50–70%', label: 'Faster Procurement Cycles' },
      { value: '80%+', label: 'Invoices Auto-Matched' },
      { value: '100%', label: 'Sub-Con Visibility' },
    ],
    problemCards: [
      {
        title: 'RFQ-to-PO still runs on email and spreadsheets',
        description:
          'Work orders become RFQs by hand, quotes arrive in every format, and approvals stall across inboxes — days lost before a PO is even cut.',
      },
      {
        title: 'Three-way match burns finance capacity',
        description:
          'PO, GRN, and invoice reconciliation is manual. Exceptions pile up; clean matches never clear at the rate the business needs.',
      },
      {
        title: 'Job-work is a black box',
        description:
          'Sub-contractors hold WIP and batches with no QR genealogy. Quality issues and compliance gaps surface too late — if at all.',
      },
      {
        title: 'Global P2P suites were not built for India',
        description:
          'Most enterprise P2P suites do not support job-work / sub-contractor traceability for India’s manufacturing ecosystem. Adapting them costs years and crores.',
      },
    ],
    workflowSteps: [
      {
        step: 1,
        title: 'Order',
        description: 'Work order or demand signal enters the platform with specs ready for sourcing.',
      },
      {
        step: 2,
        title: 'Sourcing',
        description: 'RFQ Agent auto-generates RFQs from work orders and distributes to suppliers.',
      },
      {
        step: 3,
        title: 'Evaluation',
        description: 'Negotiation Agent captures and compares quotes from email — any format.',
      },
      {
        step: 4,
        title: 'Procurement',
        description: 'PO Agent converts approved quotes to POs and routes approvals.',
      },
      {
        step: 5,
        title: 'Logistics',
        description: 'Job-Work Agent tracks QR-coded batches at sub-contractors in transit and WIP.',
      },
      {
        step: 6,
        title: 'Receipt',
        description: 'GRN capture feeds Matching Agent for three-way match against PO and invoice.',
      },
      {
        step: 7,
        title: 'Payment',
        description: 'Cleared matches release payment; Traceability Agent retains full genealogy.',
      },
    ],
    capabilityGroups: [
      {
        title: 'Autonomous procurement agents',
        items: [
          'RFQ generation from work orders with full specs',
          'Quote capture and comparison from email, any format',
          'PO creation and approval routing',
          'Exception handling with human-in-the-loop controls',
        ],
      },
      {
        title: 'Match & pay',
        items: [
          '3-way match: PO / GRN / Invoice',
          '80%+ invoices auto-cleared',
          'Payment release on cleared match',
          'ERP remains system of record — no ERP rework',
        ],
      },
      {
        title: 'Job-work & genealogy',
        items: [
          'QR-coded batch tracking at sub-contractors',
          'Full genealogy: finished good → raw material → supplier',
          '100% sub-con visibility',
          'Built for India’s manufacturing job-work model',
        ],
      },
      {
        title: 'Deployment & commercial fit',
        items: [
          'Live in 6–7 weeks',
          'No ERP changes required',
          'Mid-market pricing vs. multi-crore global suites',
          'Paying pilots in manufacturing & FMCG',
        ],
      },
    ],
    aiAgents: [
      {
        name: 'RFQ Agent',
        description: 'Auto-generates RFQs from work orders with full specs.',
      },
      {
        name: 'Negotiation Agent',
        description: 'AI quote capture and comparison from email, any format.',
      },
      {
        name: 'PO Agent',
        description: 'Converts approved quotes to POs and routes approvals.',
      },
      {
        name: 'Matching Agent',
        description: '3-way match (PO / GRN / Invoice) — 80%+ auto-cleared.',
      },
      {
        name: 'Job-Work Agent',
        description: 'QR-coded batch tracking at sub-contractors.',
      },
      {
        name: 'Traceability Agent',
        description: 'Full genealogy: finished good → raw material → supplier.',
      },
    ],
    sections: {
      problemTitle: 'Why procure-to-pay still stalls',
      problemSubtitle: 'Primary buyer: CPO / Head of Procurement. Pain points Flow P2P is built to close.',
      workflowSubtitle: 'Order → Sourcing → Evaluation → Procurement → Logistics → Receipt → Payment',
      capabilitiesSubtitle:
        'Grouped from live P2P deployments — agents, match & pay, job-work genealogy, and mid-market deployment.',
      proofTitle: 'Live pilot outcomes',
      proofSubtitle:
        'In production with manufacturing and FMCG pilots — 80%+ invoices auto-matched and reported 50–70% faster procurement cycles.',
      ctaHeading: 'Ready to pilot Flow P2P?',
      ctaSubheading: '6–7 weeks. One measurable procurement outcome, agreed upfront.',
      heroCallout: {
        title: 'Signature differentiator',
        body: "Job-work / sub-contractor traceability — a capability most global P2P suites do not offer for India's manufacturing ecosystem.",
      },
      aiTitle: 'Six AI agents',
      aiSubtitle:
        'Autonomous across the procure-to-pay cycle — always with human control on financial decisions.',
      guardrail:
        'Flow P2P agents draft, match, and route. PO approval, payment release, and every accounting entry remain with authorised procurement and finance personnel.',
    },
  },
  {
    id: 'flow-o2c',
    name: 'Flow O2C',
    shortName: 'O2C',
    tagline:
      'From invoice to cash — automated. The interaction layer between your ERP and your distributor network.',
    oneLiner: 'Order-to-Cash — distributor portal, virtual account matching',
    statusBadge: '',
    route: '/products/flow-o2c',
    platform: 'flow',
    buyerPersona: 'CFO / Finance Director',
    keyCapabilities: [
      'Virtual account & payment matching',
      'Distributor self-service portal',
      'Credit/debit notes & deductions',
      'Collections & cash flow intelligence',
    ],
    statRow: [
      { value: '80%+', label: 'Payments Auto-Matched' },
      { value: '15–20', label: 'Days DSO Reduction' },
      { value: '3,500+', label: 'Distributors on Platform' },
      { value: '6–7', label: 'Weeks to Full Deployment' },
    ],
    problemCards: [
      {
        title: 'Cash application still runs on spreadsheets',
        description:
          'Payments land without clear invoice linkage. Finance teams reconcile by hand while DSO stretches and cash visibility stays delayed.',
      },
      {
        title: 'Distributor network is opaque to finance',
        description:
          'Thousands of distributors, fragmented portals, and no shared view of invoices, deductions, and open items across the channel.',
      },
      {
        title: 'Credit notes and deductions break the close',
        description:
          'Claims, returns, and scheme deductions arrive outside the payment trail — turning month-end into exception management.',
      },
      {
        title: 'ERP is the system of record — but not the interaction layer',
        description:
          'ERP issues invoices; distributors and payments live elsewhere. Without a bridge, auto-match and collections intelligence never stick.',
      },
    ],
    workflowSteps: [
      {
        step: 1,
        title: 'Invoice in ERP',
        description: 'Invoice is generated in the ERP — ERP remains system of record.',
      },
      {
        step: 2,
        title: 'Distributor portal',
        description: 'Distributors self-serve invoices, statements, and open items on the platform.',
      },
      {
        step: 3,
        title: 'Virtual account payment',
        description: 'Payment arrives via virtual account keyed to the right customer or invoice context.',
      },
      {
        step: 4,
        title: 'Auto-allocation',
        description: 'Cash is auto-allocated to open invoices — targeting 80%+ auto-match.',
      },
      {
        step: 5,
        title: 'Real-time reconciliation',
        description: 'Exceptions surface immediately; clean matches clear without manual chase.',
      },
      {
        step: 6,
        title: 'Visibility & reporting',
        description: 'Collections and cash-flow intelligence across the full distributor network.',
      },
    ],
    capabilityGroups: [
      {
        title: 'Invoice ingestion & ERP integration',
        items: [
          'Invoices sourced from ERP without ERP rework',
          'ERP stays system of record',
          'Open-item sync for distributors and finance',
          'Deploy in 6–7 weeks',
        ],
      },
      {
        title: 'Virtual account & payment matching',
        items: [
          'Virtual account payment rails',
          '80%+ payments auto-matched',
          'Auto-allocation to open invoices',
          'Exception queues for the remainder',
        ],
      },
      {
        title: 'Credit/debit notes & deductions',
        items: [
          'Credit and debit note handling',
          'Scheme and claim deductions in the same trail',
          'Cleaner month-end close',
          'Audit-ready payment history',
        ],
      },
      {
        title: 'Distributor self-service portal',
        items: [
          'Self-serve invoices and statements',
          'Visibility across 3,500+ distributors (manufacturer network)',
          'Reduced inbound finance queries',
          'Network-wide adoption without custom portals per dealer',
        ],
      },
      {
        title: 'Collections & cash flow intelligence',
        items: [
          '15–20 days DSO reduction',
          'Real-time reconciliation status',
          'Collections prioritisation for finance teams',
          'Cash visibility for CFO / Finance Director',
        ],
      },
      {
        title: 'Downstream dealer & inventory management',
        items: [
          'Dealer-level visibility beyond the invoice',
          'Supports channel operations downstream of O2C',
          'Tied into the broader BillionTech platform',
          'Foundation for SCF where working capital is needed',
        ],
      },
    ],
    sections: {
      problemTitle: 'Why order-to-cash still stalls',
      problemSubtitle:
        'Primary buyer: CFO / Finance Director. Pain points Flow O2C closes between ERP and the distributor network.',
      workflowSubtitle:
        'Invoice generated in ERP → Distributor self-service portal → Payment via virtual account → Auto-allocation → Real-time reconciliation → Visibility & reporting',
      capabilitiesSubtitle:
        'Six capability groups — from ERP ingestion and virtual-account match through collections intelligence and dealer visibility.',
      proofTitle: 'Live at scale',
      proofSubtitle:
        'In production with a leading kitchen appliances manufacturer’s 3,500+ distributor network — 80%+ payments auto-matched.',
      ctaHeading: 'Ready to pilot Flow O2C?',
      ctaSubheading: '6–7 weeks. One measurable cash-application outcome, agreed upfront.',
      heroCallout: {
        title: 'Interaction layer',
        body: 'Flow O2C sits between your ERP and your distributor network — automating invoice-to-cash without changing the ERP system of record.',
      },
    },
  },
  {
    id: 'scf',
    name: 'SCF',
    shortName: 'SCF',
    tagline:
      'Embedded working capital for your dealer and distributor network. Finance at the point of transaction — not bolted on after.',
    oneLiner: 'Supply Chain Finance — embedded, multi-anchor, financier-neutral',
    statusBadge: '',
    route: '/products/scf',
    platform: 'finance',
    buyerPersona: 'CFO / Head of Credit',
    keyCapabilities: [
      'Financier-neutral, multi-anchor',
      'Digital onboarding under 72 hrs',
      'Invoice upload & limit check',
      'Live with leading NBFCs and banks',
    ],
    statRow: [
      { value: '₹1,500 Cr+', label: 'Platform-Enabled Loans' },
      { value: '25', label: 'Active Corporate Programmes' },
      { value: '5+', label: 'Years Production Deployment' },
      { value: '62,000+', label: 'Invoices Discounted' },
    ],
    marketStats: [
      { value: '₹20L Cr+', label: 'Addressable channel finance market in India' },
      { value: '63M+', label: "MSMEs (30% of India's GDP)" },
      { value: '14–18%', label: 'Typical overdraft cost distributors pay today' },
      { value: '9.2%', label: 'India SCF market CAGR FY24–32' },
    ],
    problemCards: [
      {
        title: 'Working capital is bolted on after the fact',
        description:
          'Dealers need finance at the point of transaction — not weeks later through a separate, disconnected lending process.',
      },
      {
        title: 'Overdraft is expensive and sticky',
        description:
          'Distributors often pay 14–18% on overdraft today. Channel finance should be cheaper, faster, and tied to real invoices.',
      },
      {
        title: 'Single-financier lock-in limits the network',
        description:
          'Anchors and distributors need choice. A financier-neutral platform lets borrowers pick their lender — no lock-in.',
      },
      {
        title: 'Onboarding is too slow for MSME distributors',
        description:
          'If digital onboarding takes weeks, programmes never scale. SCF needs under-72-hour distributor onboarding to reach the channel.',
      },
    ],
    workflowSteps: [
      {
        step: 1,
        title: 'Anchor programme',
        description: 'Corporate anchor programme setup with participating financiers.',
      },
      {
        step: 2,
        title: 'Digital onboarding',
        description: 'Distributor onboarding digitally — under 72 hours.',
      },
      {
        step: 3,
        title: 'Invoice & limit',
        description: 'Invoice upload with limit check against the programme.',
      },
      {
        step: 4,
        title: 'Borrower acceptance',
        description: 'Distributor accepts the offer and chooses their financier.',
      },
      {
        step: 5,
        title: 'Sanction & disbursement',
        description: 'Lender sanctions and disburses against the invoice.',
      },
      {
        step: 6,
        title: 'Repayment & closure',
        description: 'Repayment and programme closure — ready for the next cycle.',
      },
    ],
    capabilityGroups: [
      {
        title: 'Financier-neutral, multi-anchor',
        items: [
          'Distributors choose their financier — no lock-in',
          'Multi-anchor programmes on one platform',
          'Live with leading NBFCs and banks',
          'Built for banks and NBFCs as equal participants',
        ],
      },
      {
        title: 'Digital distributor onboarding',
        items: [
          'Digital onboarding under 72 hours',
          'Scales to MSME dealer networks',
          'Programme-ready without paper-heavy cycles',
          'Supports exclusive and multi-financier models',
        ],
      },
      {
        title: 'Invoice, limit & disbursement',
        items: [
          'Invoice upload and limit check',
          'Borrower acceptance workflow',
          'Lender sanction and disbursement',
          'Repayment and closure tracking',
        ],
      },
      {
        title: 'Production-proven scale',
        items: [
          '₹1,500 Cr+ platform-enabled loans',
          '62,000+ invoices discounted',
          '25 active corporate programmes',
          '5+ years in production (since FY2020 with exclusive SCF partner)',
        ],
      },
    ],
    sections: {
      problemTitle: 'Why channel finance still under-serves distributors',
      problemSubtitle:
        'Primary buyer: CFO / Head of Credit. Embedded SCF at the point of transaction — not a bolted-on afterthought.',
      workflowSubtitle:
        'Anchor programme setup → Digital distributor onboarding (under 72 hrs) → Invoice upload & limit check → Borrower acceptance → Lender sanction & disbursement → Repayment & closure',
      capabilitiesSubtitle:
        'Financier-neutral programmes, fast MSME onboarding, and production scale with institutional anchors.',
      marketTitle: 'The market opportunity',
      marketSubtitle: 'India channel finance context from the decks — addressable market, MSME scale, and cost of status-quo overdraft.',
      proofTitle: 'Institutional proof',
      proofSubtitle:
        'Exclusive SCF partnership with a leading NBFC since FY2020 — multi-anchor portfolios also live with a top 5 private sector bank and a leading diversified NBFC.',
      ctaHeading: 'Ready to scope an SCF programme?',
      ctaSubheading: '6–7 weeks. One measurable channel-finance outcome, agreed upfront.',
      heroCallout: {
        title: 'Financier-neutral · multi-anchor',
        body: 'Distributors choose their financier — no lock-in. Live with an exclusive SCF partner and multi-anchor portfolios at leading NBFCs and banks.',
      },
    },
  },
  {
    id: 'billiontech-lend',
    name: 'Loan Origination System',
    shortName: 'Lend',
    tagline:
      'End-to-end digital lending — lead to disbursement — with AI credit intelligence that trains on your own historical loan data. Your portfolio. Your model. Your advantage.',
    oneLiner: 'LOS + AI credit intelligence, self-hosted',
    statusBadge: '',
    route: '/products/billiontech-lend',
    platform: 'finance',
    buyerPersona: 'Head of Credit / CTO',
    keyCapabilities: [
      'Full digital LOS lifecycle',
      'AI-LOS risk score with reasoning',
      'Digital KYC & Account Aggregator',
      'Self-hosted / air-gap ready',
    ],
    statRow: [
      { value: '<48 hrs', label: 'Loan Processing Target' },
      { value: '~5 min', label: 'AI Credit Memo Draft' },
      { value: 'Daily', label: 'Portfolio Monitoring' },
      { value: '100%', label: "RBI's Digital Lending Guidelines Aligned" },
    ],
    problemCards: [
      {
        title: 'Loan processing still takes days',
        description:
          'Lead-to-disbursement cycles stall on paperwork, manual KYC, and sequential hand-offs — missing the <48 hour target credit teams need.',
      },
      {
        title: 'Credit memos are a bottleneck',
        description:
          'Analysts spend hours drafting memos. AI-LOS drafts in ~5 minutes — with reasoning credit officers can review, not replace.',
      },
      {
        title: 'Generic models ignore your book',
        description:
          'Off-the-shelf scores miss your portfolio’s history. Lender-trained intelligence uses your own past loans — your model, your advantage.',
      },
      {
        title: 'Compliance and hosting constraints',
        description:
          "RBI's Digital Lending Guidelines and air-gap requirements rule out many SaaS LOS options. Loan Origination System is self-hosted and compliance-ready by design.",
      },
    ],
    workflowSteps: [
      {
        step: 1,
        title: 'Lead intake',
        description: 'Digital lead capture into the Kanban loan pipeline.',
      },
      {
        step: 2,
        title: 'Digital KYC',
        description: 'Aadhaar OTP, PAN, GSTIN, Video KYC, Account Aggregator, eSign.',
      },
      {
        step: 3,
        title: 'AI risk score',
        description: 'Score 0.00–1.00 with Approve / Refer / Decline and confidence %.',
      },
      {
        step: 4,
        title: 'Credit memo',
        description: 'AI credit memo drafted in ~5 minutes for credit review.',
      },
      {
        step: 5,
        title: 'Human decision',
        description: 'Authorised credit personnel approve, refer, or decline — AI never decides alone.',
      },
      {
        step: 6,
        title: 'Disbursement',
        description: 'Disbursement and accounting entries remain with authorised personnel.',
      },
    ],
    layers: [
      {
        id: 'los',
        name: 'LOS',
        role: 'Foundation layer',
        description:
          'Full digital lending lifecycle — configurable workflow, KYC, and compliance — self-hosted and air-gap-ready.',
        items: [
          'Full digital lifecycle, lead to disbursement',
          'Kanban pipeline for credit operations',
          'Digital KYC: Aadhaar OTP, PAN, GSTIN, Video KYC, Account Aggregator, eSign',
          'Configurable workflow engine',
          "RBI's Digital Lending Guidelines compliance built-in",
          'Self-hosted / air-gap-ready',
        ],
      },
      {
        id: 'ai-los',
        name: 'AI-LOS',
        role: 'Intelligence layer',
        description:
          'Credit intelligence trained on the lender’s own historical loan data — scores, drafts, and early warnings with human control.',
        items: [
          'Risk score 0.00–1.00 with reasoning',
          'Approve / Refer / Decline + confidence %',
          'AI credit memo drafted in ~5 minutes',
          'Peer comparables — 5 similar past loans from your own book',
          'Early warning system',
          'Counteroffer engine on decline',
        ],
      },
    ],
    capabilityGroups: [
      {
        title: 'Digital lending operations',
        items: [
          'Kanban pipeline across the loan lifecycle',
          'Configurable workflow engine',
          'Self-hosted deployment, air-gap ready',
          'Built for NBFC and bank credit teams',
        ],
      },
      {
        title: 'Identity & compliance',
        items: [
          'Aadhaar OTP, PAN, GSTIN',
          'Video KYC and eSign',
          'Account Aggregator integration',
          "100% aligned with RBI's Digital Lending Guidelines",
        ],
      },
      {
        title: 'AI credit intelligence',
        items: [
          'Lender-trained on your historical loans',
          'Risk score with decision recommendation and confidence',
          '~5 minute AI credit memo draft',
          'Daily portfolio monitoring and early warning',
        ],
      },
      {
        title: 'Human-controlled outcomes',
        items: [
          'AI analyses, scores, and drafts only',
          'Final approval stays with authorised credit personnel',
          'Disbursement and accounting entries stay human-owned',
          'Counteroffer path on decline — not a hard stop alone',
        ],
      },
    ],
    showRiskScoreVisual: true,
    sections: {
      problemTitle: 'Why digital lending still stalls',
      problemSubtitle:
        'Primary buyer: Head of Credit / CTO. Two layers — LOS foundation and AI-LOS intelligence — not four separate product SKUs.',
      workflowSubtitle:
        'Lead intake → Digital KYC → AI risk score → Credit memo → Human decision → Disbursement',
      capabilitiesSubtitle:
        'Operations, KYC & compliance, AI credit intelligence, and human-controlled outcomes — one product, two layers.',
      layersTitle: 'Two layers, one product',
      layersSubtitle:
        'LOS is the foundation. AI-LOS is the intelligence layer trained on your own historical loan data. Do not split into separate LOS / LMS / PLP / AI-LOS product pages.',
      riskTitle: 'AI-LOS risk score',
      riskSubtitle:
        'Illustrative capability view — score 0.00–1.00 with Approve / Refer / Decline and confidence. Not a live underwriting decision.',
      proofTitle: 'Built for regulated lenders',
      proofSubtitle: "RBI's Digital Lending Guidelines alignment, self-hosted deployment, and human control over every financial decision.",
      ctaHeading: 'Ready to pilot Loan Origination System?',
      ctaSubheading: '6–7 weeks. One measurable lending outcome, agreed upfront.',
      heroCallout: {
        title: 'Your portfolio. Your model. Your advantage.',
        body: "AI credit intelligence trains on your own historical loan data — paired with a full digital LOS that is self-hosted and aligned with RBI's Digital Lending Guidelines.",
      },
      guardrail:
        'AI-LOS analyses, scores, and drafts. Final approval, disbursement, and every accounting entry remain with authorised credit personnel.',
    },
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductByRoute(route: string): Product | undefined {
  return products.find((p) => p.route === route);
}
