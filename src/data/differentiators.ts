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
      'BillionTech sits as the workflow and intelligence layer. ERP stays system of record — no multi-year ERP programme required to get P2P, O2C, SCF, or Loan Origination System into production.',
  },
  {
    id: 'ai-native',
    title: 'AI-Native by Design',
    summary: 'Autonomous agents, matching, and credit intelligence are core — not bolt-on features.',
    detail:
      "AI isn't a feature bolted onto BillionTech Flow and BillionTech LEND after the fact — it's woven into how the platforms work from day one. Autonomous agents draft and match; credit intelligence scores and drafts memos; the platform's speed comes from that automation running continuously, not from a dashboard add-on. Every AI-assisted action still requires human approval before anything financial or operational is finalized.",
  },
  {
    id: 'lender-trained',
    title: 'Lender-trained credit model',
    summary: "Trains on the client's own historical loan data.",
    detail:
      'AI-LOS is your portfolio advantage — risk scores, peer comparables, and credit memos grounded in your book, not a generic bureau-only model. Built into the Loan Origination System product.',
  },
  {
    id: 'aggregate-proof',
    title: 'Aggregate production proof',
    summary: '62,000+ invoices, ₹1,500 Cr+, 3,500+ distributors in live programmes.',
    detail:
      'Production scale across SCF, O2C, and lending programmes — cumulative invoices discounted, platform-enabled loans, and distributor network volume already running in market.',
  },
  {
    id: 'india-ready',
    title: 'Built for India, not adapted for it',
    summary: "Job-work, GST, RBI's Digital Lending Guidelines, WhatsApp — designed for the market.",
    detail:
      "Job-work / sub-contractor traceability, GST-ready ops, RBI's Digital Lending Guidelines alignment, and India channel realities are first-class — not localisation afterthoughts on a global suite.",
  },
  {
    id: 'deployment-speed',
    title: '6–7 weeks vs. 12–18 months',
    summary: 'Mid-market deployment without multi-year ERP programmes.',
    detail:
      'Enterprise suite programmes often run 12–18 months before value lands. BillionTech targets 6–7 week deployment with ERP as system of record — workflow and intelligence without a multi-crore rip-and-replace.',
  },
];
