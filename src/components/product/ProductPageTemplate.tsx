import { lazy, Suspense } from 'react';
import { Box, Button, Chip, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { Product } from '@/data/products';
import { getCaseStudyById } from '@/data/caseStudies';
import { AIAgentCard } from '@/components/shared/AIAgentCard';
import { CapabilityGroupBlock } from '@/components/shared/CapabilityGroup';
import { CaseStudyCard } from '@/components/shared/CaseStudyCard';
import { CompetitiveTable } from '@/components/shared/CompetitiveTable';
import { CTASection } from '@/components/shared/CTASection';
import { GuardrailPanel } from '@/components/shared/GuardrailPanel';
import { PartnerCard } from '@/components/shared/PartnerCard';
import { ProductLayerCard } from '@/components/shared/ProductLayerCard';
import { RiskScoreVisual } from '@/components/shared/RiskScoreVisual';
import { Section, SectionHeading } from '@/components/shared/SectionHeading';
import { StatRow } from '@/components/shared/StatRow';
import { WorkflowDiagram } from '@/components/shared/WorkflowDiagram';
import { colors } from '@/theme/tokens';

const FlowP2pProductVisuals = lazy(() => import('@/components/flow/FlowP2pProductVisuals'));

interface ProductPageTemplateProps {
  product: Product;
}

export function ProductPageTemplate({ product }: ProductPageTemplateProps) {
  const caseStudy = product.caseStudyRef ? getCaseStudyById(product.caseStudyRef) : undefined;
  const sections = product.sections;
  const heroCallout = sections?.heroCallout;

  return (
    <>
      {/* 1. Hero */}
      <Section bg="dark" py={{ xs: 7, md: 9 }}>
        <Container maxWidth="lg">
          <Chip
            label={product.statusBadge}
            size="small"
            sx={{
              mb: 2,
              height: 26,
              fontWeight: 600,
              backgroundColor: colors.primaryLight,
              color: colors.gray900,
            }}
          />
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
            {product.name}
          </Typography>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.78)',
              fontSize: '1.15rem',
              maxWidth: 680,
              mb: heroCallout ? 2.5 : 4,
            }}
          >
            {product.tagline}
          </Typography>

          {heroCallout && (
            <Box
              sx={{
                mb: 4,
                p: 2.5,
                maxWidth: 680,
                backgroundColor: 'rgba(249, 115, 22, 0.18)',
                borderLeft: `3px solid ${colors.primary}`,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: colors.primary, fontWeight: 700, mb: 0.75, letterSpacing: '0.04em' }}
              >
                {heroCallout.title}
              </Typography>
              <Typography sx={{ color: colors.white, fontSize: '1rem', lineHeight: 1.55 }}>
                {heroCallout.body}
              </Typography>
            </Box>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
        </Container>
      </Section>

      <Section bg="light" py={{ xs: 4, md: 5 }}>
        <Container maxWidth="lg">
          <StatRow stats={product.statRow} />
        </Container>
      </Section>

      {sections && (
        <>
          {/* 2. The problem */}
          <Section id="problem">
            <Container maxWidth="lg">
              <SectionHeading
                eyebrow="The problem"
                title={sections.problemTitle}
                subtitle={sections.problemSubtitle}
              />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                }}
              >
                {product.problemCards.map((card) => (
                  <Box
                    key={card.title}
                    sx={{
                      p: 3,
                      backgroundColor: colors.gray50,
                      borderLeft: `3px solid ${colors.primary}`,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 1, fontSize: '1.1rem' }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.gray500 }}>
                      {card.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Container>
          </Section>

          {/* 2b. Market context (SCF) */}
          {product.marketStats && product.marketStats.length > 0 && (
            <Section bg="alt" id="market">
              <Container maxWidth="lg">
                <SectionHeading
                  eyebrow="Market"
                  title={sections.marketTitle ?? 'Market context'}
                  subtitle={sections.marketSubtitle}
                />
                <StatRow stats={product.marketStats} variant="tint" />
              </Container>
            </Section>
          )}

          {/* 3. How it works */}
          <Section bg="light" id="how-it-works">
            <Container maxWidth="lg">
              <SectionHeading
                eyebrow="Workflow"
                title="How it works"
                subtitle={sections.workflowSubtitle}
              />
              <WorkflowDiagram steps={product.workflowSteps} />
            </Container>
          </Section>

          {/* 3b. Two-layer architecture (Lend) */}
          {product.layers && product.layers.length > 0 && (
            <Section id="layers">
              <Container maxWidth="lg">
                <SectionHeading
                  eyebrow="Architecture"
                  title={sections.layersTitle ?? 'Product architecture'}
                  subtitle={sections.layersSubtitle}
                />
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 3,
                  }}
                >
                  {product.layers.map((layer, i) => (
                    <ProductLayerCard
                      key={layer.id}
                      layer={layer}
                      accent={i === 0 ? 'primary' : 'info'}
                    />
                  ))}
                </Box>
              </Container>
            </Section>
          )}

          {/* 3c. Risk score visual + guardrail (Lend) */}
          {product.showRiskScoreVisual && (
            <Section bg="alt" id="risk-score">
              <Container maxWidth="lg">
                <SectionHeading
                  eyebrow="Intelligence layer"
                  title={sections.riskTitle ?? 'AI-LOS risk score'}
                  subtitle={sections.riskSubtitle}
                />
                <RiskScoreVisual />
                {sections.guardrail && <GuardrailPanel statement={sections.guardrail} />}
              </Container>
            </Section>
          )}

          {/* 4. Platform capabilities */}
          {product.capabilityGroups.length > 0 && (
            <Section id="capabilities">
              <Container maxWidth="lg">
                <SectionHeading
                  eyebrow="Platform"
                  title="Capabilities"
                  subtitle={sections.capabilitiesSubtitle}
                />
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: '1fr 1fr',
                      md: product.capabilityGroups.length > 4 ? 'repeat(3, 1fr)' : '1fr 1fr',
                    },
                    gap: 3,
                  }}
                >
                  {product.capabilityGroups.map((group) => (
                    <CapabilityGroupBlock key={group.title} group={group} />
                  ))}
                </Box>
              </Container>
            </Section>
          )}

          {/* Guardrail when no risk visual but AI agents present — already handled below */}
          {/* 5. AI agents + guardrail (when present) */}
          {product.aiAgents && product.aiAgents.length > 0 && sections.aiTitle && (
            <Section bg="alt" id="ai-agents">
              <Container maxWidth="lg">
                <SectionHeading
                  eyebrow="Intelligence layer"
                  title={sections.aiTitle}
                  subtitle={sections.aiSubtitle}
                />
                {product.id === 'flow-p2p' ? (
                  <Suspense
                    fallback={
                      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                        <CircularProgress color="primary" size={32} aria-label="Loading P2P visuals" />
                      </Box>
                    }
                  >
                    <FlowP2pProductVisuals agents={product.aiAgents} />
                  </Suspense>
                ) : (
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
                      gap: 2.5,
                    }}
                  >
                    {product.aiAgents.map((agent, i) => (
                      <AIAgentCard key={agent.name} agent={agent} index={i + 1} />
                    ))}
                  </Box>
                )}
                {sections.guardrail && <GuardrailPanel statement={sections.guardrail} />}
              </Container>
            </Section>
          )}

          {/* Standalone guardrail for Lend if somehow risk visual off but guardrail set */}
          {sections.guardrail &&
            !product.showRiskScoreVisual &&
            !(product.aiAgents && product.aiAgents.length > 0) && (
              <Section bg="light" id="guardrail">
                <Container maxWidth="lg">
                  <GuardrailPanel statement={sections.guardrail} />
                </Container>
              </Section>
            )}

          {/* 6a. Partner proof cards (SCF) */}
          {product.partners && product.partners.length > 0 && (
            <Section bg="light" id="partners">
              <Container maxWidth="lg">
                <SectionHeading
                  eyebrow="Proof"
                  title={sections.partnersTitle ?? sections.proofTitle}
                  subtitle={sections.partnersSubtitle ?? sections.proofSubtitle}
                />
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      md: `repeat(${Math.min(product.partners.length, 3)}, 1fr)`,
                    },
                    gap: 3,
                  }}
                >
                  {product.partners.map((partner) => (
                    <PartnerCard key={partner.name} partner={partner} />
                  ))}
                </Box>
              </Container>
            </Section>
          )}

          {/* 6b. Single case study (when no partner grid) */}
          {caseStudy && !(product.partners && product.partners.length > 0) && (
            <Section id="proof" bg={product.competitiveTable ? 'white' : 'light'}>
              <Container maxWidth="lg">
                <SectionHeading
                  eyebrow="Proof"
                  title={sections.proofTitle}
                  subtitle={sections.proofSubtitle}
                />
                <CaseStudyCard study={caseStudy} />
              </Container>
            </Section>
          )}

          {/* Compliance callout for Lend when no case study */}
          {!caseStudy &&
            !(product.partners && product.partners.length > 0) &&
            product.id === 'billiontech-lend' && (
              <Section bg="light" id="proof">
                <Container maxWidth="lg">
                  <SectionHeading
                    eyebrow="Proof"
                    title={sections.proofTitle}
                    subtitle={sections.proofSubtitle}
                  />
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                      gap: 2.5,
                    }}
                  >
                    {[
                      { value: 'RBI DLD 2025', label: 'Compliance built into the LOS' },
                      { value: 'Self-hosted', label: 'Air-gap ready for regulated lenders' },
                      { value: 'Human control', label: 'Approval & disbursement stay with credit personnel' },
                    ].map((item) => (
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
                            fontSize: '1.25rem',
                            color: colors.gray900,
                            mb: 1,
                          }}
                        >
                          {item.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: colors.gray500 }}>
                          {item.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Container>
              </Section>
            )}

          {/* 7. Competitive comparison (when present) */}
          {product.competitiveTable && sections.compareTitle && (
            <Section bg="light" id="compare">
              <Container maxWidth="lg">
                <SectionHeading
                  eyebrow="Comparison"
                  title={sections.compareTitle}
                  subtitle={sections.compareSubtitle}
                />
                <CompetitiveTable
                  columns={product.competitiveTable.columns}
                  rows={product.competitiveTable.rows}
                />
              </Container>
            </Section>
          )}

          {/* CTA */}
          <CTASection heading={sections.ctaHeading} subheading={sections.ctaSubheading} />
        </>
      )}
    </>
  );
}
