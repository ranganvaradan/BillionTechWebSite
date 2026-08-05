import { clientDescriptors } from './clients';
import { platforms } from './platforms';
import { getProductById } from './products';

export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuItem {
  name: string;
  oneLiner: string;
  statusBadge: string;
  href: string;
}

export interface PlatformMegaGroup {
  name: string;
  oneLiner: string;
  href: string;
  products: MegaMenuItem[];
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const primaryNav: NavLink[] = [
  { label: 'Who We Serve', href: '/who-we-serve' },
  { label: 'Credentials', href: '/proof' },
  { label: 'Why BillionTech', href: '/why-billiontech' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/** Mega menu: two platform groups, each with two products underneath. */
export const platformMegaMenu: PlatformMegaGroup[] = platforms.map((platform) => ({
  name: platform.name,
  oneLiner: platform.oneLiner,
  href: platform.route,
  products: platform.memberProductSlugs.map((slug) => {
    const p = getProductById(slug);
    if (!p) {
      throw new Error(`Missing product for platform mega menu: ${slug}`);
    }
    return {
      name: p.name,
      oneLiner: p.oneLiner,
      statusBadge: p.statusBadge,
      href: p.route,
    };
  }),
}));

/** Flat product list for callers that need every product link. */
export const productMegaMenu: MegaMenuItem[] = platformMegaMenu.flatMap((g) => g.products);

export const ctaLinks = {
  requestDemo: { label: 'Request a Demo', href: '/contact?intent=demo' },
  talkToUs: { label: 'Talk to Us', href: '/contact' },
  viewAllProducts: {
    label: 'View All Products',
    href: '/#products',
    description: 'Explore the complete BillionTech platform',
  },
} as const;

export const footerColumns: FooterColumn[] = [
  {
    title: 'Products',
    links: [
      { label: 'BillionTech Flow', href: '/platform/flow' },
      { label: 'Flow P2P', href: '/products/flow-p2p' },
      { label: 'Flow O2C', href: '/products/flow-o2c' },
      { label: 'BillionTech LEND', href: '/platform/finance' },
      { label: 'SCF', href: '/products/scf' },
      { label: 'Loan Origination System', href: '/products/billiontech-lend' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Why BillionTech', href: '/why-billiontech' },
      { label: 'Who We Serve', href: '/who-we-serve' },
      { label: 'Credentials', href: '/proof' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Live deployments', href: '/proof' },
      { label: "RBI's Digital Lending Guidelines", href: '/products/billiontech-lend' },
      { label: 'Talk to Us', href: '/contact' },
    ],
  },
];

/** Approved aggregate proof stats — reuse site-wide; do not invent new volume figures. */
export const homepageProofStats = [
  { value: '₹1,500 Cr+', label: 'Platform-enabled loans (cumulative SCF disbursed)' },
  { value: '62,000+', label: 'Invoices discounted via SCF' },
  { value: '3,500+', label: 'Distributors live on O2C (manufacturer network)' },
  { value: '80%+', label: 'Invoices/payments auto-matched across O2C and P2P' },
] as const;

/** Extended approved set for About / Credentials (adds SCF programme tenure stats). */
export const approvedProductionStats = [
  ...homepageProofStats,
  { value: '25', label: 'Active corporate SCF programmes' },
  { value: '5+', label: 'Years in production deployment (SCF)' },
] as const;

export const homepageDifferentiators = [
  'Deploys in 6–7 weeks — no ERP rework',
  'AI-Native by Design — autonomous agents, matching, and credit intelligence are core to how the platform operates',
  "Lender-trained credit model — trains on the client's own historical data",
  'Aggregate production proof — 62,000+ invoices, ₹1,500 Cr+, 3,500+ distributors',
  "Built for India, not adapted for it — job-work, GST, RBI's Digital Lending Guidelines, WhatsApp",
  '6–7 week deployment vs. 12–18 month enterprise suite programmes — mid-market economics without multi-year ERP rework',
] as const;

export const homepageProblems = [
  {
    title: 'Zero visibility / manual reconciliation',
    description:
      'Finance teams drown in spreadsheets reconciling invoices, payments, and GRNs across disconnected systems.',
  },
  {
    title: 'Siloed ERP systems',
    description:
      'ERP stays the system of record, but workflow and intelligence sit outside it — leaving gaps between purchase, cash, and credit.',
  },
  {
    title: 'Slow lending decisions',
    description:
      'Credit teams wait days for memos and risk scores while distributors and borrowers need working capital now.',
  },
  {
    title: 'No sub-contractor traceability',
    description:
      'Job-work and multi-tier manufacturing lose genealogy — a compliance and quality risk global P2P suites do not solve for India.',
  },
] as const;

export const homepageSegments = [
  {
    title: 'FMCG & Manufacturers',
    primaryBuyer: 'CFO / CPO',
    buySignals: ['Distributor network complexity', 'Procurement cycle time', 'Sub-con visibility'],
  },
  {
    title: 'NBFCs & Banks',
    primaryBuyer: 'Head of Credit',
    buySignals: ["Digital LOS / AI credit", "RBI's Digital Lending Guidelines", 'SCF programme scale'],
  },
  {
    title: 'Corporate Anchors',
    primaryBuyer: 'CFO / Treasury',
    buySignals: ['Dealer working capital', 'Multi-financier SCF', 'Channel finance visibility'],
  },
] as const;

export const homepageProofDeployments = [
  {
    name: clientDescriptors.sundaramFinance,
    detail: 'Exclusive SCF partner · 25 programmes · 28+ dealers · live since FY2020',
  },
  {
    name: clientDescriptors.ttkPrestige,
    detail: '₹3,000 Cr manufacturer · 3,500+ distributors · O2C live',
  },
  {
    name: clientDescriptors.iciciBank,
    detail: 'SCF portfolio live',
  },
  {
    name: clientDescriptors.tataCapital,
    detail: 'SCF portfolio live',
  },
] as const;
