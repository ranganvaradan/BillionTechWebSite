/**
 * Company page content — leadership bios, public contact, security notes, principles.
 * Do not reintroduce client-proposal–sourced volume figures here.
 */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Rangan V',
    role: 'Chief Executive Officer',
    bio: 'Serial entrepreneur, 30+ years in consulting and financial services. Co-founder of MicroGram (NBFC-P2P lending) and Beyond Square. Former Head of Banking & Capital Markets Domain, Infosys. PhD in Finance and Economics; Member of ICAI and ICWA.',
  },
  {
    name: 'Bala KV',
    role: 'Chairman (Non-Executive)',
    bio: '30 years at Infosys, including CFO from 2006 to 2012. Significant experience in corporate finance, international taxation, risk management and mergers & acquisitions. Member of ICAI, ICSI and ICWA.',
  },
  {
    name: 'Mohit C',
    role: 'Chief Risk Officer',
    bio: '25+ years in risk management, banking and consulting. Responsible for controls framework, compliance and governance across all platform deployments.',
  },
  {
    name: 'Ramakrishnan V',
    role: 'Advisor',
    bio: '25+ years in BFSI, principally in lending across products and customer segments. Leads enterprise engagement and commercial strategy.',
  },
  {
    name: 'Saseendran K',
    role: 'Head — Partnerships',
    bio: '20+ years of techno-functional experience in banking and financial services. Leads ecosystem partnerships and integration alliances.',
  },
  {
    name: 'Alwyn Vaz',
    role: 'Senior Business Analyst',
    bio: "20+ years' experience in bridging business needs and technology solutions. Skilled in requirements gathering, stakeholder management and process optimization that improve operational efficiency and business outcomes.",
  },
];

export const companyContact = {
  name: 'BillionTech',
  title: 'General inquiries',
  phone: '',
  email: 'contact@billiontech.ai',
  website: 'https://billiontech.ai',
} as const;

/** Security posture — stated transparently (SOC 2 in progress, not a completed badge). */
export const securityNotes = [
  {
    title: 'SOC 2 — certification in progress',
    detail:
      'BillionTech is undergoing SOC 2 certification (expected Q3 / Q4 2026). Stated openly as in progress, not concluded. Audit report to be shared on issue.',
  },
  {
    title: 'Data protection',
    detail:
      'Encryption in transit (TLS 1.2+) and at rest. Tenant data logically segregated.',
  },
  {
    title: 'India regulatory alignment',
    detail:
      'Built for Indian statutory requirements — GST, TDS and e-invoicing treatment. Data residency within India.',
  },
] as const;

export const aboutPrinciples = [
  {
    title: 'ERP stays system of record',
    detail:
      'BillionTech is the workflow and intelligence layer. Your ERP is not replaced — clean, controlled data flows into it.',
  },
  {
    title: 'Deterministic logic before AI',
    detail:
      'Agreement rules, match logic, and compliance checks run as enforceable controls. AI accelerates; it does not invent the control spine.',
  },
  {
    title: 'Human control over financial decisions',
    detail:
      'AI drafts, scores, and routes. Final approval, disbursement, and accounting entries remain with authorised personnel.',
  },
  {
    title: 'India-ready architecture',
    detail:
      "Job-work, GST, RBI's Digital Lending Guidelines, Account Aggregator, and channel-finance realities are designed in — not bolted on later.",
  },
] as const;
