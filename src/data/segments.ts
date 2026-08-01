export interface Segment {
  id: string;
  title: string;
  primaryBuyer: string;
  products: string[];
  buySignals: string[];
  timeToValue: string;
}

export const segments: Segment[] = [
  {
    id: 'fmcg-manufacturers',
    title: 'FMCG & Manufacturers',
    primaryBuyer: 'CFO / CPO',
    products: ['Flow P2P', 'Flow O2C', 'SCF'],
    buySignals: [
      'Distributor network complexity across thousands of dealers',
      'Procurement cycle time and job-work / sub-con visibility',
      'Manual reconciliation consuming finance capacity',
      'Need for invoice-to-cash automation without ERP rip-and-replace',
    ],
    timeToValue: '6–7 weeks to a paid pilot with one measurable outcome agreed upfront.',
  },
  {
    id: 'nbfcs-banks',
    title: 'NBFCs & Banks',
    primaryBuyer: 'Head of Credit',
    products: ['Loan Origination System', 'SCF'],
    buySignals: [
      'Digital LOS / AI credit intelligence on the lender’s own book',
      "RBI's Digital Lending Guidelines compliance and self-hosted / air-gap options",
      'SCF programme scale with institutional partners',
      'Faster credit memos and daily portfolio monitoring',
    ],
    timeToValue: '6–7 weeks entry via paid pilot — LOS foundation and AI-LOS intelligence as one product.',
  },
  {
    id: 'corporate-anchors',
    title: 'Corporate Anchors',
    primaryBuyer: 'CFO / Treasury',
    products: ['SCF', 'Flow O2C'],
    buySignals: [
      'Dealer and distributor working capital at the point of transaction',
      'Multi-financier, financier-neutral SCF programmes',
      'Channel finance visibility across the network',
      'Need to avoid single-lender lock-in for distributors',
    ],
    timeToValue: '6–7 weeks to programme live — digital distributor onboarding under 72 hours.',
  },
];
