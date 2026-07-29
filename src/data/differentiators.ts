export interface Differentiator {
  id: string;
  title: string;
  summary: string;
  detail: string;
}

export const differentiators: Differentiator[] = [
  {
    id: 'deploy-fast',
    title: 'Deploys in 6–7 weeks — no ERP rework',
    summary: 'Live programmes without ripping out the system of record.',
    detail:
      'BillionTech sits as the workflow and intelligence layer. ERP stays system of record — no multi-year ERP programme required to get P2P, O2C, SCF, or Lend into production.',
  },
  {
    id: 'unplug-test',
    title: 'AI that passes the "Unplug Test"',
    summary: 'Disable AI and the platform stops functioning — AI is core, not a side panel.',
    detail:
      'The Unplug Test is a named, ownable idea: if you turn AI off, autonomous agents, matching, and credit drafting stop. That is the opposite of bolt-on AI theatre.',
  },
  {
    id: 'lender-trained',
    title: 'Lender-trained credit model',
    summary: "Trains on the client's own historical loan data.",
    detail:
      'AI-LOS is your portfolio advantage — risk scores, peer comparables, and credit memos grounded in your book, not a generic bureau-only model.',
  },
  {
    id: 'institutional-proof',
    title: 'Live institutional proof',
    summary: 'Sundaram Finance, TTK Prestige, ICICI Bank, TATA Capital in production.',
    detail:
      'Named customers and programmes already running — exclusive SCF partnership with Sundaram Finance since FY2020, O2C live at TTK Prestige, and SCF portfolios with ICICI Bank and TATA Capital.',
  },
  {
    id: 'india-ready',
    title: 'Built for India, not adapted for it',
    summary: 'Job-work, GST, RBI DLD 2025, WhatsApp — designed for the market.',
    detail:
      'Job-work / sub-contractor traceability, GST-ready ops, RBI DLD 2025 compliance, and India channel realities are first-class — not localisation afterthoughts on a global suite.',
  },
  {
    id: 'cost-vs-ariba',
    title: '1/10th the cost of SAP Ariba',
    summary: 'Mid-market pricing vs. multi-crore global suites and 12–18 month deployments.',
    detail:
      'SAP Ariba-class programmes often run ₹5–10 Cr/yr and 12–18 months. BillionTech targets mid-market economics with 6–7 week deployment — without claiming feature parity on every enterprise suite module.',
  },
];

export const aribaComparison = {
  title: 'Deployment & cost framing vs. SAP Ariba',
  rows: [
    { label: 'Typical deployment', billiontech: '6–7 weeks', ariba: '12–18 months' },
    { label: 'Relative cost', billiontech: '~1/10th of SAP Ariba', ariba: '₹5–10 Cr/yr class' },
    { label: 'ERP changes', billiontech: 'None — ERP stays SoR', ariba: 'Often significant' },
    {
      label: 'India job-work / sub-con',
      billiontech: 'Native (Flow P2P)',
      ariba: 'Not offered',
    },
  ],
} as const;
