export interface CaseStudy {
  id: string;
  name: string;
  product: string;
  summary: string;
  metrics: { value: string; label: string }[];
  before?: string;
  after?: string;
  note?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'p2p-pilots',
    name: '3 Paying P2P Pilots',
    product: 'Flow P2P',
    summary:
      'Manufacturing and FMCG pilots live on Flow P2P — paying customers validating the full RFQ-to-payment cycle with AI agents and job-work visibility.',
    metrics: [
      { value: '3', label: 'Paying pilots' },
      { value: '60–70%', label: 'Procurement cycle time reduction (reported)' },
      { value: '80%+', label: 'Invoices auto-matched' },
    ],
    note: 'Cycle-time reduction is reported by pilot customers — retained as a qualified claim per deck language.',
  },
  {
    id: 'ttk-prestige',
    name: 'TTK Prestige',
    product: 'Flow O2C',
    summary:
      '₹3,000 Cr manufacturer with 3,500+ distributors — full network live on Flow O2C for invoice-to-cash automation.',
    metrics: [
      { value: '₹3,000 Cr', label: 'Manufacturer revenue scale' },
      { value: '3,500+', label: 'Distributors live on O2C' },
      { value: '80%+', label: 'Payments auto-matched' },
    ],
    before:
      'Manual reconciliation consumed 3–4 FTEs — finance capacity locked in cash application and exception chase across the distributor network.',
    after:
      'Same team now handles 5× the volume — auto-match, distributor self-service, and real-time reconciliation absorb the load.',
  },
  {
    id: 'sundaram-finance',
    name: 'Sundaram Finance',
    product: 'SCF',
    summary:
      'Exclusive SCF partner since FY2020 — 25 corporate programmes and 28+ dealers live on the BillionTech platform.',
    metrics: [
      { value: '25', label: 'Corporate programmes' },
      { value: '28+', label: 'Dealers' },
      { value: 'FY2020', label: 'Live since' },
    ],
    note: 'ICICI Bank and TATA Capital SCF portfolios are also live — shown as partner cards on the SCF product page.',
  },
  {
    id: 'icici-bank',
    name: 'ICICI Bank',
    product: 'SCF',
    summary: 'SCF portfolio live on the BillionTech platform.',
    metrics: [{ value: 'LIVE', label: 'SCF portfolio' }],
  },
  {
    id: 'tata-capital',
    name: 'TATA Capital',
    product: 'SCF',
    summary: 'SCF portfolio live on the BillionTech platform.',
    metrics: [{ value: 'LIVE', label: 'SCF portfolio' }],
  },
];

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.id === id);
}
