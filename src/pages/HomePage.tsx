import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { platforms, getPlatformProducts } from '@/data/platforms';
import {
  homepageDifferentiators,
  homepageProblems,
  homepageProofDeployments,
  homepageProofStats,
  homepageSegments,
} from '@/data/navigation';
import { ProductCard } from '@/components/shared/ProductCard';
import { Section, SectionHeading } from '@/components/shared/SectionHeading';
import { StatRow } from '@/components/shared/StatRow';
import { SystemDiagram } from '@/components/shared/SystemDiagram';
import { colors } from '@/theme/tokens';

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section
        bg="dark"
        py={{ xs: 8, md: 11 }}
        id="hero"
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
              gap: { xs: 5, md: 6 },
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                component="h1"
                sx={{
                  fontFamily: (t) => t.typography.h1.fontFamily,
                  fontWeight: 700,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '2.85rem' },
                  lineHeight: 1.15,
                  color: colors.white,
                  mb: 2.5,
                  letterSpacing: '-0.02em',
                }}
              >
                The Operating System for India&apos;s Supply Chain &amp; Lending
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: { xs: '1.05rem', md: '1.15rem' },
                  lineHeight: 1.65,
                  mb: 4,
                  maxWidth: 520,
                }}
              >
                Two platforms, four battle-tested products. Every deployment in 6–7 weeks — no ERP
                changes.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={RouterLink}
                  to="/#products"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Explore Our Platforms
                </Button>
                <Button
                  component={RouterLink}
                  to="/contact?intent=demo"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.45)',
                    color: colors.white,
                    '&:hover': {
                      borderColor: colors.white,
                      backgroundColor: 'rgba(255,255,255,0.08)',
                    },
                  }}
                >
                  Request a Demo
                </Button>
              </Stack>
            </Box>
            <SystemDiagram />
          </Box>
        </Container>
      </Section>

      {/* Proof Strip */}
      <Section bg="light" py={{ xs: 4, md: 5 }} id="proof-strip">
        <Container maxWidth="lg">
          <StatRow stats={[...homepageProofStats]} />
        </Container>
      </Section>

      {/* Problem We Solve */}
      <Section id="problem">
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="The challenge"
            title="The Problem We Solve"
            subtitle="Operational gaps that CFOs, CPOs, and Heads of Credit face across India's supply chain and lending — amplified by RBI DLD 2025, DPDP Act, and Account Aggregator pressure."
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
            }}
          >
            {homepageProblems.map((problem) => (
              <Box
                key={problem.title}
                sx={{
                  p: 3,
                  backgroundColor: colors.gray50,
                  borderLeft: `3px solid ${colors.primary}`,
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, fontSize: '1.1rem' }}>
                  {problem.title}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.gray500 }}>
                  {problem.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Section>

      {/* Two Platforms, Four Products */}
      <Section bg="light" id="products">
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Platforms"
            title="Two Platforms, Four Products"
            subtitle="BillionTech Flow covers procurement and receivables. BillionTech Finance covers embedded working capital and digital lending — live with named institutional customers."
          />
          <Stack spacing={5}>
            {platforms.map((platform) => {
              const memberProducts = getPlatformProducts(platform);
              return (
                <Box key={platform.id}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
                    spacing={2}
                    sx={{ mb: 2.5 }}
                  >
                    <Box>
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: { xs: '1.35rem', md: '1.6rem' },
                          color: colors.gray900,
                          mb: 0.75,
                        }}
                      >
                        {platform.name}
                      </Typography>
                      <Typography variant="body1" sx={{ color: colors.gray500, maxWidth: 520 }}>
                        {platform.tagline}
                      </Typography>
                    </Box>
                    <Button
                      component={RouterLink}
                      to={platform.route}
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ flexShrink: 0 }}
                    >
                      Explore {platform.name}
                    </Button>
                  </Stack>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 3,
                    }}
                  >
                    {memberProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Container>
      </Section>

      {/* Why BillionTech */}
      <Section id="why">
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Differentiation"
            title="Why BillionTech"
            subtitle="Six differentiators from live deployments — not aspirational marketing."
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 2.5,
            }}
          >
            {homepageDifferentiators.map((item, index) => (
              <Box
                key={item}
                sx={{
                  display: 'flex',
                  gap: 2,
                  p: 2.5,
                  borderBottom: `1px solid ${colors.gray200}`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: (t) => t.typography.h1.fontFamily,
                    fontWeight: 700,
                    color: colors.primaryHover,
                    fontSize: '1.25rem',
                    minWidth: 28,
                  }}
                >
                  {index + 1}
                </Typography>
                <Typography variant="body1" sx={{ color: colors.gray700 }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
          <Button
            component={RouterLink}
            to="/why-billiontech"
            variant="text"
            sx={{ mt: 3, color: colors.primaryHover, fontWeight: 600 }}
          >
            Read the full Why BillionTech page →
          </Button>
        </Container>
      </Section>

      {/* Proof — Live Deployments */}
      <Section bg="alt" id="proof">
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="In production"
            title="Proof — Live Deployments"
            subtitle="Named institutional customers and programmes already running on the platform."
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
              gap: 2.5,
            }}
          >
            {homepageProofDeployments.map((item) => (
              <Box
                key={item.name}
                sx={{
                  p: 3,
                  backgroundColor: colors.white,
                  borderTop: `2px solid ${colors.info}`,
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, fontSize: '1.1rem' }}>
                  {item.name}
                </Typography>
                <Typography variant="body2">{item.detail}</Typography>
              </Box>
            ))}
          </Box>
          <Button
            component={RouterLink}
            to="/proof"
            variant="text"
            sx={{ mt: 3, color: colors.primaryHover, fontWeight: 600 }}
          >
            View all proof & case studies →
          </Button>
        </Container>
      </Section>

      {/* Who We Serve */}
      <Section id="who-we-serve">
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Audience"
            title="Who We Serve"
            subtitle="Three buyer segments with clear buy signals and primary personas."
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {homepageSegments.map((segment) => (
              <Box
                key={segment.title}
                sx={{
                  p: 3,
                  backgroundColor: colors.gray50,
                  height: '100%',
                }}
              >
                <Typography variant="h5" sx={{ mb: 1, fontSize: '1.2rem' }}>
                  {segment.title}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.gray700, fontWeight: 600, display: 'block', mb: 2 }}>
                  Primary buyer: {segment.primaryBuyer}
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                  {segment.buySignals.map((signal) => (
                    <Typography component="li" variant="body2" key={signal} sx={{ mb: 0.75 }}>
                      {signal}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
          <Button
            component={RouterLink}
            to="/who-we-serve"
            variant="text"
            sx={{ mt: 3, color: colors.primaryHover, fontWeight: 600 }}
          >
            See segment detail →
          </Button>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section bg="dark" id="cta" py={{ xs: 8, md: 10 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              sx={{ color: colors.white, mb: 2, fontSize: { xs: '1.85rem', md: '2.35rem' } }}
            >
              Let&apos;s scope your pilot.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.75)', mb: 4, fontSize: '1.1rem' }}>
              6–7 weeks. One measurable outcome, agreed upfront.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                component={RouterLink}
                to="/contact?intent=demo"
                variant="contained"
                color="primary"
                size="large"
              >
                Request a Demo
              </Button>
              <Button
                component={RouterLink}
                to="/contact"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'rgba(255,255,255,0.45)',
                  color: colors.white,
                  '&:hover': {
                    borderColor: colors.white,
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  },
                }}
              >
                Talk to Us
              </Button>
            </Stack>
          </Box>
        </Container>
      </Section>
    </>
  );
}
