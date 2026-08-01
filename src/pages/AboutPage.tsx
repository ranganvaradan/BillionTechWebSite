import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  aboutPrinciples,
  companyContact,
  securityNotes,
  teamMembers,
} from '@/data/company';
import { approvedProductionStats } from '@/data/navigation';
import { CTASection } from '@/components/shared/CTASection';
import { Section, SectionHeading } from '@/components/shared/SectionHeading';
import { StatRow } from '@/components/shared/StatRow';
import { colors } from '@/theme/tokens';

export function AboutPage() {
  return (
    <>
      <Section bg="dark" py={{ xs: 7, md: 9 }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: colors.primary, fontWeight: 700, letterSpacing: '0.1em' }}
          >
            Company
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontFamily: (t) => t.typography.h1.fontFamily,
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.75rem' },
              color: colors.white,
              mt: 1,
              mb: 2,
            }}
          >
            About BillionTech
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.78)', maxWidth: 680, fontSize: '1.1rem' }}>
            The Operating System for Enterprise Supply Chains — four integrated products,
            production-proven controls, and a leadership team with deep BFSI and enterprise experience.
          </Typography>
        </Container>
      </Section>

      <Section>
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Principles"
            title="How we build"
            subtitle="ERP stays system of record. Deterministic controls before AI. Humans own financial decisions."
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
            }}
          >
            {aboutPrinciples.map((p) => (
              <Box
                key={p.title}
                sx={{
                  p: 3,
                  backgroundColor: colors.gray50,
                  borderLeft: `3px solid ${colors.primary}`,
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, fontSize: '1.1rem' }}>
                  {p.title}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.gray500 }}>
                  {p.detail}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      <Section bg="light">
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Scale"
            title="Not a first deployment"
            subtitle="The same production figures used on the homepage, Credentials, and platform pages — not a first-deployment story."
          />
          <StatRow stats={[...approvedProductionStats]} />
        </Container>
      </Section>

      <Section id="team">
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Leadership"
            title="A passionate and experienced management team"
            subtitle="Deep domain experience across financial services, technology, risk and enterprise transformation."
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {teamMembers.map((member) => (
              <Box
                key={member.name}
                sx={{
                  p: 3,
                  height: '100%',
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.gray200}`,
                  borderTop: `3px solid ${colors.primary}`,
                }}
              >
                <Typography variant="h6" sx={{ fontSize: '1.1rem', mb: 0.5 }}>
                  {member.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: colors.primaryHover, fontWeight: 700, display: 'block', mb: 1.5 }}
                >
                  {member.role}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.gray500 }}>
                  {member.bio}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      <Section bg="alt" id="security">
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Trust"
            title="Security & compliance posture"
            subtitle="Stated transparently — including SOC 2 in progress, not as a completed badge we do not hold yet."
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {securityNotes.map((note) => (
              <Box key={note.title} sx={{ p: 3, backgroundColor: colors.white, border: `1px solid ${colors.gray200}` }}>
                <Typography variant="h6" sx={{ fontSize: '1.05rem', mb: 1 }}>
                  {note.title}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.gray500 }}>
                  {note.detail}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      <Section>
        <Container maxWidth="md">
          <SectionHeading
            eyebrow="Contact"
            title="Get in touch"
            subtitle="Use our general inbox — leadership contact is not published on the public site."
          />
          <Stack spacing={1}>
            <Typography variant="body1">
              <Link href={`mailto:${companyContact.email}`} underline="hover" sx={{ color: colors.primaryHover }}>
                {companyContact.email}
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link href={companyContact.website} target="_blank" rel="noreferrer" underline="hover" sx={{ color: colors.primaryHover }}>
                billiontech.ai
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ color: colors.gray700, pt: 1 }}>
              Or use the{' '}
              <Link component={RouterLink} to="/contact" underline="hover" sx={{ color: colors.primaryHover }}>
                contact form
              </Link>
              .
            </Typography>
          </Stack>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
