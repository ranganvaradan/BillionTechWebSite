import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Platform } from '@/data/platforms';
import { getPlatformProducts } from '@/data/platforms';
import { CTASection } from '@/components/shared/CTASection';
import { ProductCard } from '@/components/shared/ProductCard';
import { Section, SectionHeading } from '@/components/shared/SectionHeading';
import { StatRow } from '@/components/shared/StatRow';
import { colors } from '@/theme/tokens';

interface PlatformPageTemplateProps {
  platform: Platform;
}

export function PlatformPageTemplate({ platform }: PlatformPageTemplateProps) {
  const memberProducts = getPlatformProducts(platform);

  return (
    <>
      <Section bg="dark" py={{ xs: 7, md: 9 }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              display: 'block',
              mb: 1.5,
            }}
          >
            Platform
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontFamily: (t) => t.typography.h1.fontFamily,
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.75rem' },
              color: colors.white,
              mb: 1.5,
            }}
          >
            {platform.name}
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: '1.15rem',
              maxWidth: 680,
              mb: 4,
            }}
          >
            {platform.tagline}
          </Typography>
          <Button
            component={RouterLink}
            to="/contact?intent=demo"
            variant="contained"
            color="primary"
            size="large"
          >
            Request a Demo
          </Button>
        </Container>
      </Section>

      <Section bg="light" py={{ xs: 4, md: 5 }}>
        <Container maxWidth="lg">
          <StatRow stats={platform.combinedStatRow} />
        </Container>
      </Section>

      <Section id="products">
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Products"
            title={`Two products inside ${platform.name}`}
            subtitle="Drill into either product for full workflows, capabilities, and proof — these overview pages stay lightweight by design."
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
            }}
          >
            {memberProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        </Container>
      </Section>

      <Section bg="alt" id="why-together">
        <Container maxWidth="md">
          <SectionHeading eyebrow="Why together" title={`Why these two sit under ${platform.name}`} />
          <Typography variant="body1" sx={{ color: colors.gray700, fontSize: '1.05rem', lineHeight: 1.7 }}>
            {platform.connectingNarrative}
          </Typography>
        </Container>
      </Section>

      <CTASection
        heading={`Ready to explore ${platform.name}?`}
        subheading="6–7 weeks. One measurable outcome, agreed upfront."
      />
    </>
  );
}
