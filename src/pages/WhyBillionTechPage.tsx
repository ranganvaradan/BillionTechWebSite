import { Box, Container, Typography } from '@mui/material';
import { differentiators } from '@/data/differentiators';
import { CTASection } from '@/components/shared/CTASection';
import { Section, SectionHeading } from '@/components/shared/SectionHeading';
import { colors } from '@/theme/tokens';

const aiNativeBody =
  "AI isn't a feature bolted onto BillionTech Flow and BillionTech LEND after the fact — it's woven into how the platforms work from day one. Autonomous agents draft and match; credit intelligence scores and drafts memos; the platform's speed comes from that automation running continuously, not from a dashboard add-on. Every AI-assisted action still requires human approval before anything financial or operational is finalized.";

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
            Six differentiators from live deployments — AI-native architecture, aggregate production
            proof, and mid-market deployment economics without multi-year ERP programmes.
          </Typography>
        </Container>
      </Section>

      <Section>
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Six reasons"
            title="Proof-driven differentiation"
            subtitle="Specific claims from production programmes — not generic SaaS marketing."
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

      <Section bg="light" id="ai-native">
        <Container maxWidth="md">
          <SectionHeading
            eyebrow="Intelligence layer"
            title="AI-Native by Design"
            subtitle="Core to both platforms — not a dashboard add-on."
          />
          <Typography
            sx={{
              color: colors.gray700,
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            {aiNativeBody}
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            {[
              { label: 'Agents', detail: 'Draft, match, and route work continuously' },
              { label: 'Credit intelligence', detail: 'Scores and memos grounded in your book' },
              { label: 'Human approval', detail: 'Required before financial or operational finalization' },
            ].map((item) => (
              <Box
                key={item.label}
                sx={{
                  p: 2.5,
                  borderTop: `3px solid ${colors.primary}`,
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.gray200}`,
                }}
              >
                <Typography sx={{ fontWeight: 700, color: colors.gray900, mb: 0.75 }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.gray700 }}>
                  {item.detail}
                </Typography>
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
