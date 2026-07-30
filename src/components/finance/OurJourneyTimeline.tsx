import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { colors } from '@/theme/tokens';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export interface JourneyMilestone {
  era: string;
  title: string;
  detail: string;
}

/** Real SCF / Finance milestones — do not invent or alter. */
export const financeJourneyMilestones: JourneyMilestone[] = [
  {
    era: 'FY2020',
    title: 'Sundaram Finance exclusive SCF partnership begins',
    detail: 'Production deployment',
  },
  {
    era: 'Growth',
    title: 'Programme expansion',
    detail: '25 corporate programmes, 28+ dealers',
  },
  {
    era: 'Live',
    title: 'ICICI Bank SCF portfolio live',
    detail: 'Institutional SCF in production',
  },
  {
    era: 'Live',
    title: 'TATA Capital SCF portfolio live',
    detail: 'Institutional SCF in production',
  },
  {
    era: 'Today',
    title: '₹1,500 Cr+ platform-enabled loans',
    detail: '62,000+ invoices discounted',
  },
];

interface OurJourneyTimelineProps {
  milestones?: JourneyMilestone[];
}

export function OurJourneyTimeline({
  milestones = financeJourneyMilestones,
}: OurJourneyTimelineProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <Box
      component="section"
      id="our-journey"
      sx={{
        backgroundColor: colors.gray900,
        py: { xs: 7, md: 10 },
      }}
    >
      <Box sx={{ maxWidth: 720, mx: 'auto', px: { xs: 2, md: 3 } }}>
        <Typography
          variant="overline"
          sx={{
            color: 'rgba(255,255,255,0.75)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            display: 'block',
            mb: 1.5,
          }}
        >
          Our Journey
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: colors.white,
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            mb: 1.5,
          }}
        >
          From exclusive SCF partner to multi-anchor scale
        </Typography>
        <Typography sx={{ color: colors.gray200, mb: { xs: 4, md: 5 }, maxWidth: 560 }}>
          Real milestones from live BillionTech Finance deployments — not a projection roadmap.
        </Typography>

        <Box sx={{ position: 'relative', pl: '36px' }}>
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              left: 10,
              top: 8,
              bottom: 8,
              width: 2,
              backgroundColor: colors.primary,
              opacity: 0.55,
            }}
          />

          {milestones.map((m, index) => {
            const body = (
              <Box
                data-milestone-index={index}
                sx={{
                  position: 'relative',
                  // Tall spacing so only ~2–3 nodes fit in a 900px viewport at once
                  pb: index === milestones.length - 1 ? 0 : { xs: 7, md: 9 },
                  minHeight: index === milestones.length - 1 ? undefined : { xs: 120, md: 140 },
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    left: -36 + 4,
                    top: 4,
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    backgroundColor: colors.primary,
                    border: `2px solid ${colors.gray900}`,
                    boxShadow: `0 0 0 2px ${colors.primary}`,
                  }}
                />
                <Typography
                  sx={{
                    color: colors.primary,
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    mb: 0.75,
                  }}
                >
                  {m.era}
                </Typography>
                <Typography
                  sx={{
                    color: colors.white,
                    fontWeight: 600,
                    fontSize: { xs: '1.05rem', md: '1.15rem' },
                    mb: 0.5,
                  }}
                >
                  {m.title}
                </Typography>
                <Typography sx={{ color: colors.gray200, fontSize: '0.95rem' }}>{m.detail}</Typography>
              </Box>
            );

            if (reduceMotion) {
              return <Box key={`${m.era}-${index}`}>{body}</Box>;
            }

            return (
              <motion.div
                key={`${m.era}-${index}`}
                data-testid={`journey-milestone-${index}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                // Require entry into upper portion of viewport so lower nodes stay hidden
                // until the user scrolls further (enables a true mid-reveal screenshot).
                viewport={{ once: true, amount: 0.55, margin: '0px 0px -35% 0px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {body}
              </motion.div>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
