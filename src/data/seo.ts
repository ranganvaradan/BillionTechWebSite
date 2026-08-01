export interface PageSeo {
  title: string;
  description: string;
  path: string;
}

const siteName = 'BillionTech';
const defaultDescription =
  'Flow P2P, Flow O2C, Supply Chain Finance, and Loan Origination System — four integrated products in production with leading manufacturers, NBFCs, and banks. Deploy in 6–7 weeks.';

export const defaultSeo: PageSeo = {
  title: `${siteName} | The Operating System for Enterprise Supply Chains`,
  description: defaultDescription,
  path: '/',
};

export const seoByPath: Record<string, PageSeo> = {
  '/': defaultSeo,
  '/why-billiontech': {
    title: `Why BillionTech | ${siteName}`,
    description:
      'Six differentiators: 6–7 week deployment, AI-native architecture, lender-trained AI, aggregate production proof, India-ready design, and mid-market deployment economics.',
    path: '/why-billiontech',
  },
  '/who-we-serve': {
    title: `Who We Serve | ${siteName}`,
    description:
      'FMCG & manufacturers, NBFCs & banks, and corporate anchors — products, buy signals, and 6–7 week time-to-value for paid pilots.',
    path: '/who-we-serve',
  },
  '/proof': {
    title: `Credentials | ${siteName}`,
    description:
      'Production credentials: ₹1,500 Cr+ platform-enabled loans, 62,000+ invoices discounted, 3,500+ distributors, 80%+ auto-match — aggregate figures from live Flow and LEND programmes.',
    path: '/proof',
  },
  '/about': {
    title: `About | ${siteName}`,
    description:
      'BillionTech principles, leadership team, production credentials, and security posture — including SOC 2 certification in progress.',
    path: '/about',
  },
  '/contact': {
    title: `Contact | ${siteName}`,
    description:
      'Request a demo or talk to BillionTech about a scoped pilot across Flow P2P, Flow O2C, SCF, or Loan Origination System.',
    path: '/contact',
  },
  '/products/flow-p2p': {
    title: `Flow P2P | Procure-to-Pay | ${siteName}`,
    description:
      'From RFQ to payment in hours — 6 AI agents, job-work traceability, 80%+ auto-match. Paying pilots in manufacturing & FMCG.',
    path: '/products/flow-p2p',
  },
  '/products/flow-o2c': {
    title: `Flow O2C | Order-to-Cash | ${siteName}`,
    description:
      'Invoice-to-cash automation between ERP and distributors. LIVE at a leading manufacturer — 3,500+ distributors, 80%+ payments auto-matched.',
    path: '/products/flow-o2c',
  },
  '/products/scf': {
    title: `SCF | Supply Chain Finance | ${siteName}`,
    description:
      'Embedded, financier-neutral SCF. Live with leading NBFCs and banks — ₹1,500 Cr+ platform-enabled loans.',
    path: '/products/scf',
  },
  '/products/billiontech-lend': {
    title: `Loan Origination System | LOS + AI-LOS | ${siteName}`,
    description:
      'Digital LOS and AI credit intelligence trained on your book. Aligned with RBI\'s Digital Lending Guidelines, self-hosted, human-controlled decisions.',
    path: '/products/billiontech-lend',
  },
  '/platform/flow': {
    title: `BillionTech Flow | Procurement & Receivables | ${siteName}`,
    description:
      'BillionTech Flow — Flow P2P and Flow O2C on one operating layer. 80%+ auto-match, 6–7 week deployment, live in production.',
    path: '/platform/flow',
  },
  '/platform/finance': {
    title: `BillionTech LEND | Working Capital & Lending | ${siteName}`,
    description:
      'BillionTech LEND — SCF and Loan Origination System. ₹1,500 Cr+ platform-enabled loans, digital lending aligned with RBI guidelines.',
    path: '/platform/finance',
  },
};

export function resolveSeo(pathname: string): PageSeo {
  const exact = seoByPath[pathname];
  if (exact) return exact;
  if (pathname.startsWith('/products/')) {
    return {
      title: `Products | ${siteName}`,
      description: defaultDescription,
      path: pathname,
    };
  }
  if (pathname.startsWith('/platform/')) {
    return {
      title: `Platforms | ${siteName}`,
      description: defaultDescription,
      path: pathname,
    };
  }
  return { ...defaultSeo, path: pathname };
}
