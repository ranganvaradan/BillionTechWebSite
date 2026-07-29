import { Box, Container, Link, Stack, Typography } from '@mui/material';
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
            Request a demo or talk to us about a scoped pilot. Form validates client-side; no live
            backend submission in v1.
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
            <Box
              sx={{
                p: { xs: 0, md: 0 },
              }}
            >
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
                eyebrow="Direct"
                title="Leadership contact"
                subtitle="From our current enterprise proposal materials."
              />
              <Stack spacing={1.25}>
                <Typography sx={{ fontWeight: 700 }}>{companyContact.name}</Typography>
                <Typography variant="body2" sx={{ color: colors.gray500 }}>
                  {companyContact.title}
                </Typography>
                <Typography variant="body2">
                  <Link href={`tel:${companyContact.phone.replace(/\s/g, '')}`} underline="hover" color="inherit">
                    {companyContact.phone}
                  </Link>
                </Typography>
                <Typography variant="body2">
                  <Link href={`mailto:${companyContact.email}`} underline="hover" sx={{ color: colors.primaryHover }}>
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
              </Stack>
            </Box>
          </Box>
        </Container>
      </Section>
    </>
  );
}
