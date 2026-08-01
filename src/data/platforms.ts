import type { ProductStat } from './products';
import { getProductById, products } from './products';

export interface Platform {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  oneLiner: string;
  combinedStatRow: ProductStat[];
  memberProductSlugs: string[];
  connectingNarrative: string;
  route: string;
}

/**
 * Two named platforms grouping the four existing products.
 * Stats are reused from member products — no new numbers invented.
 */
export const platforms: Platform[] = [
  {
    id: 'flow',
    name: 'BillionTech Flow',
    slug: 'flow',
    tagline: 'Procurement and receivables, on one operating layer.',
    oneLiner: 'BillionTech Flow — procurement and receivables in one operating layer',
    memberProductSlugs: ['flow-p2p', 'flow-o2c'],
    combinedStatRow: [
      { value: '80%+', label: 'Invoices/payments auto-matched across O2C and P2P' },
      { value: '6–7', label: 'Weeks to Full Deployment' },
      { value: '3,500+', label: 'Distributors on Platform (manufacturer network)' },
      { value: '6', label: 'AI Agents Working Autonomously (P2P)' },
    ],
    connectingNarrative:
      'Flow P2P and Flow O2C share the same ERP-integration pattern: your ERP stays the system of record while BillionTech removes manual reconciliation on both sides of the transaction — payables and receivables — without a 12–18 month ERP programme.',
    route: '/platform/flow',
  },
  {
    id: 'finance',
    name: 'BillionTech LEND',
    slug: 'finance',
    tagline: 'Embedded working capital and digital lending.',
    oneLiner: 'BillionTech LEND — embedded working capital and digital lending',
    memberProductSlugs: ['scf', 'billiontech-lend'],
    combinedStatRow: [
      { value: '₹1,500 Cr+', label: 'Platform-Enabled Loans' },
      { value: '100%', label: "Built for RBI's Digital Lending Guidelines (LOS)" },
      { value: '25', label: 'Active Corporate Programmes (SCF)' },
      { value: '5+', label: 'Years Production Deployment (SCF)' },
    ],
    // Deliberately does NOT claim SCF disbursement data feeds Lend's AI model —
    // that architectural link was not confirmed in the decks. Flag if product wants it stated.
    connectingNarrative:
      'SCF and Loan Origination System sit together because both are regulated-lending-adjacent and both serve BFSI anchors, NBFCs, and banks as the primary buyer — embedded working capital at the point of trade, and a self-hosted LOS with AI credit intelligence for the lender\'s own book.',
    route: '/platform/finance',
  },
];

export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find((p) => p.slug === slug);
}

export function getPlatformById(id: string): Platform | undefined {
  return platforms.find((p) => p.id === id);
}

export function getPlatformProducts(platform: Platform) {
  return platform.memberProductSlugs
    .map((slug) => getProductById(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
}

export function getProductsByPlatform(platformSlug: string) {
  return products.filter((p) => p.platform === platformSlug);
}
