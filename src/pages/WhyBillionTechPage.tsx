import { Box, Container, Typography } from '@mui/material';
import { aribaComparison, differentiators } from '@/data/differentiators';
import { CTASection } from '@/components/shared/CTASection';
import { Section, SectionHeading } from '@/components/shared/SectionHeading';
import { UnplugTestVisual } from '@/components/shared/UnplugTestVisual';
import { colors } from '@/theme/tokens';

export function WhyBillionTechPage() {
  return (
    <>
      <Section bg="dark" py={{ xs: 7, md: 9 }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: colors.primary, fontWeight: 700, letterSpacing: '0.1em' }}
          >
            Differentiation
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
            Why BillionTech
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.78)', maxWidth: 640, fontSize: '1.1rem' }}>
            Six differentiators from live deployments — including the Unplug Test and mid-market
            economics versus SAP Ariba-class programmes.
          </Typography>
        </Container>
      </Section>

      <Section>
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Six reasons"
            title="Proof-driven differentiation"
            subtitle="Expanded from the homepage — specific claims, not generic SaaS marketing."
          />
          <Box sx={{ display: 'grid', gap: 3 }}>
            {differentiators.map((item, index) => (
              <Box
                key={item.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '72px 1fr' },
                  gap: 2,
                  p: 3,
                  backgroundColor: colors.gray50,
                  borderLeft: `3px solid ${colors.primary}`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: (t) => t.typography.h1.fontFamily,
                    fontWeight: 700,
                    fontSize: '2rem',
                    color: colors.primary,
                    lineHeight: 1,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Box>
                  <Typography variant="h5" sx={{ mb: 0.75, fontSize: '1.25rem' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.gray500, mb: 1.25 }}>
                    {item.summary}
                  </Typography>
                  <Typography variant="body1" sx={{ color: colors.gray700 }}>
                    {item.detail}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      <Section bg="light" id="unplug-test">
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Ownable idea"
            title="The Unplug Test"
            subtitle="If you disable AI and the platform still runs as usual, AI was never core. Toggle the states below."
          />
          <UnplugTestVisual />
        </Container>
      </Section>

      <Section id="ariba">
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Commercial framing"
            title={aribaComparison.title}
            subtitle="Deck-backed comparison points — not a full feature matrix against every Ariba module."
          />
          <Box sx={{ border: `1px solid ${colors.gray200}`, overflowX: 'auto' }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 1fr 1fr',
                minWidth: 560,
                backgroundColor: colors.gray900,
                color: colors.white,
                px: 2,
                py: 1.75,
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Dimension</Typography>
              <Typography sx={{ fontWeight: 600, color: colors.primary }}>BillionTech</Typography>
              <Typography sx={{ fontWeight: 600 }}>SAP Ariba</Typography>
            </Box>
            {aribaComparison.rows.map((row, i) => (
              <Box
                key={row.label}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 1fr 1fr',
                  minWidth: 560,
                  px: 2,
                  py: 2,
                  backgroundColor: i % 2 === 0 ? colors.white : colors.gray50,
                  borderTop: `1px solid ${colors.gray200}`,
                }}
              >
                <Typography sx={{ fontWeight: 600, color: colors.gray900 }}>{row.label}</Typography>
                <Typography sx={{ color: colors.primaryHover, fontWeight: 600 }}>
                  {row.billiontech}
                </Typography>
                <Typography sx={{ color: colors.gray700 }}>{row.ariba}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      <CTASection
        heading="See the differentiators on your use case."
        subheading="6–7 weeks. One measurable outcome, agreed upfront."
      />
    </>
  );
}
