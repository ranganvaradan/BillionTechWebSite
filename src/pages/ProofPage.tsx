import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { caseStudies } from '@/data/caseStudies';
import { platformScale, platformScaleNote } from '@/data/company';
import { CaseStudyCard } from '@/components/shared/CaseStudyCard';
import { CTASection } from '@/components/shared/CTASection';
import { Section, SectionHeading } from '@/components/shared/SectionHeading';
import { StatRow } from '@/components/shared/StatRow';
import { colors } from '@/theme/tokens';

const proofOrder = ['ttk-prestige', 'sundaram-finance', 'icici-bank', 'tata-capital', 'p2p-pilots'];

export function ProofPage() {
  const studies = proofOrder
    .map((id) => caseStudies.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

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
            Proof
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.78)', maxWidth: 680, fontSize: '1.1rem' }}>
            Named institutional customers and platform-scale transaction metrics — no invented case
            studies.
          </Typography>
        </Container>
      </Section>

      <Section bg="light" py={{ xs: 5, md: 6 }}>
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Platform scale"
            title="Live production volume"
            subtitle={platformScaleNote}
          />
          <StatRow stats={[...platformScale]} />
        </Container>
      </Section>

      <Section>
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Case studies"
            title="Customers and programmes in production"
            subtitle="TTK Prestige (O2C), Sundaram Finance / ICICI Bank / TATA Capital (SCF), and paying P2P pilots."
          />
          <Box sx={{ display: 'grid', gap: 3 }}>
            {studies.map((study) => (
              <Box key={study.id}>
                <CaseStudyCard study={study} />
                {study.product === 'Flow O2C' && (
                  <Button
                    component={RouterLink}
                    to="/products/flow-o2c"
                    sx={{ mt: 1.5, color: colors.primaryHover, fontWeight: 600 }}
                  >
                    View Flow O2C page →
                  </Button>
                )}
                {study.product === 'SCF' && study.id === 'sundaram-finance' && (
                  <Button
                    component={RouterLink}
                    to="/products/scf"
                    sx={{ mt: 1.5, color: colors.primaryHover, fontWeight: 600 }}
                  >
                    View SCF partners →
                  </Button>
                )}
                {study.product === 'Flow P2P' && (
                  <Button
                    component={RouterLink}
                    to="/products/flow-p2p"
                    sx={{ mt: 1.5, color: colors.primaryHover, fontWeight: 600 }}
                  >
                    View Flow P2P page →
                  </Button>
                )}
              </Box>
            ))}
          </Box>
          <Typography variant="body2" sx={{ color: colors.gray500, mt: 4 }}>
            Where decks indicate a CFO reference is available for a programme, we will share that
            under NDA during a scoped evaluation — not as public marketing copy invented here.
          </Typography>
        </Container>
      </Section>

      <CTASection
        heading="Want references for your segment?"
        subheading="Talk to us — we'll match proof to your buyer persona and product interest."
      />
    </>
  );
}
