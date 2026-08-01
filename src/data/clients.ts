/**
 * Public-site client anonymization — use these exact descriptors everywhere
 * a named customer previously appeared. Do not invent alternate phrasings.
 */
export const clientDescriptors = {
  ttkPrestige: 'Leading Kitchen & Home Appliances Manufacturer',
  sundaramFinance: 'Leading NBFC (Exclusive SCF Partner)',
  iciciBank: 'Top 5 Private Sector Bank',
  tataCapital: 'Leading Diversified NBFC',
} as const;

/** Generic public inbox — no named leadership contact on the marketing site. */
export const publicContact = {
  email: 'hello@billiontech.ai',
  website: 'https://billiontech.ai',
} as const;
