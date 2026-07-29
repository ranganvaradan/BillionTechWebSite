import { Box, Chip, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { segments } from '@/data/segments';
import { products } from '@/data/products';
import { CTASection } from '@/components/shared/CTASection';
import { Section, SectionHeading } from '@/components/shared/SectionHeading';
import { colors } from '@/theme/tokens';

function productRoute(name: string): string | undefined {
  return products.find((p) => p.name === name)?.route;
}

export function WhoWeServePage() {
  return (
    <>
      <Section bg="dark" py={{ xs: 7, md: 9 }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: colors.primary, fontWeight: 700, letterSpacing: '0.1em' }}
          >
            Audience
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
            Who We Serve
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.78)', maxWidth: 640, fontSize: '1.1rem' }}>
            Three buyer segments — FMCG &amp; manufacturers, NBFCs &amp; banks, and corporate anchors —
            with products, buy signals, and time-to-value.
          </Typography>
        </Container>
      </Section>

      <Section>
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Segments"
            title="Buyers we build for"
            subtitle="Paid pilot entry point. 6–7 weeks to a measurable outcome."
          />
          <Box sx={{ display: 'grid', gap: 3 }}>
            {segments.map((segment) => (
              <Box
                key={segment.id}
                sx={{
                  p: { xs: 3, md: 4 },
                  backgroundColor: colors.gray50,
                  borderTop: `3px solid ${colors.primary}`,
                }}
              >
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <Box>
                    <Typography variant="h4" sx={{ fontSize: { xs: '1.4rem', md: '1.75rem' }, mb: 0.75 }}>
                      {segment.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.gray700, fontWeight: 700 }}>
                      Primary buyer: {segment.primaryBuyer}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {segment.products.map((name) => {
                      const href = productRoute(name);
                      return (
                        <Chip
                          key={name}
                          label={name}
                          component={href ? RouterLink : 'div'}
                          to={href}
                          clickable={Boolean(href)}
                          sx={{
                            backgroundColor: colors.primaryLight,
                            color: colors.primaryHover,
                            fontWeight: 600,
                          }}
                        />
                      );
                    })}
                  </Stack>
                </Stack>

                <Typography variant="subtitle2" sx={{ mb: 1, color: colors.gray900 }}>
                  Buy signals
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2.25, mb: 2.5 }}>
                  {segment.buySignals.map((signal) => (
                    <Typography component="li" variant="body2" key={signal} sx={{ mb: 0.75 }}>
                      {signal}
                    </Typography>
                  ))}
                </Box>
                <Typography variant="body2" sx={{ color: colors.gray700 }}>
                  <Box component="span" sx={{ fontWeight: 700, color: colors.gray900 }}>
                    Time to value:{' '}
                  </Box>
                  {segment.timeToValue}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      <CTASection
        heading="Which segment matches your mandate?"
        subheading="We'll scope a paid pilot around one outcome — not a multi-year transformation."
      />
    </>
  );
}
