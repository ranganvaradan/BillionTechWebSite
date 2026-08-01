import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { companyContact } from '@/data/company';
import { ContactForm } from '@/components/shared/ContactForm';
import { Section, SectionHeading } from '@/components/shared/SectionHeading';
import { colors } from '@/theme/tokens';

export function ContactPage() {
  return (
    <>
      <Section bg="dark" py={{ xs: 7, md: 9 }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: colors.primary, fontWeight: 700, letterSpacing: '0.1em' }}
          >
            Engage
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
            Contact
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.78)', maxWidth: 640, fontSize: '1.1rem' }}>
            Request a demo or talk to us about a scoped pilot. Use the form or write to our general
            inbox — form validates client-side; no live backend submission in v1.
          </Typography>
        </Container>
      </Section>

      <Section>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.4fr 0.8fr' },
              gap: 5,
              alignItems: 'start',
            }}
          >
            <Box>
              <ContactForm />
            </Box>

            <Box
              sx={{
                p: 3,
                backgroundColor: colors.gray50,
                borderLeft: `3px solid ${colors.primary}`,
              }}
            >
              <SectionHeading
                eyebrow="Inbox"
                title="General contact"
                subtitle="Public website inquiries — use the form or email below."
              />
              <Stack spacing={1.25}>
                <Typography variant="body2">
                  <Link
                    href={`mailto:${companyContact.email}`}
                    underline="hover"
                    sx={{ color: colors.primaryHover, fontWeight: 600 }}
                  >
                    {companyContact.email}
                  </Link>
                </Typography>
                <Typography variant="body2">
                  <Link
                    href={companyContact.website}
                    target="_blank"
                    rel="noreferrer"
                    underline="hover"
                    sx={{ color: colors.primaryHover }}
                  >
                    billiontech.ai
                  </Link>
                </Typography>
                <Typography variant="body2" sx={{ color: colors.gray700, pt: 1 }}>
                  Prefer a guided intro?{' '}
                  <Link component={RouterLink} to="/contact?intent=demo" underline="hover" sx={{ color: colors.primaryHover }}>
                    Request a demo
                  </Link>
                  .
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Section>
    </>
  );
}
