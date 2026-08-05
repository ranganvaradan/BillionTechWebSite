import { Box, Container, Typography } from '@mui/material';
import { approvedProductionStats } from '@/data/navigation';
import { CTASection } from '@/components/shared/CTASection';
import { Section, SectionHeading } from '@/components/shared/SectionHeading';
import { colors } from '@/theme/tokens';

export function ProofPage() {
  return (
    <>
      <Section bg="dark" py={{ xs: 7, md: 9 }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: colors.primary, fontWeight: 700, letterSpacing: '0.1em' }}
          >
            Evidence
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
            Credentials
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.78)', maxWidth: 680, fontSize: '1.1rem' }}>
            Consolidated production metrics from live programmes.
          </Typography>
        </Container>
      </Section>

      <Section bg="light">
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="In market"
            title="Aggregate proof points"
            subtitle="Real numbers already established across Flow and LEND programmes."
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
              gap: 2.5,
            }}
          >
            {approvedProductionStats.map((item) => (
              <Box
                key={item.label}
                sx={{
                  p: 3,
                  backgroundColor: colors.white,
                  borderTop: `3px solid ${colors.primary}`,
                  border: `1px solid ${colors.gray200}`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: (t) => t.typography.h1.fontFamily,
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: colors.gray900,
                    mb: 1,
                  }}
                >
                  {item.value}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.gray700 }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      <CTASection
        heading="Want programme detail for your segment?"
        subheading="Talk to us — we'll match credentials to your buyer persona under a scoped evaluation."
      />
    </>
  );
}
