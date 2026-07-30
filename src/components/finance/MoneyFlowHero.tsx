import { type RefObject } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { colors } from '@/theme/tokens';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const nodes = [
  { id: 'anchor', label: 'Anchor', x: 12, y: 42 },
  { id: 'distributor', label: 'Distributor', x: 38, y: 42 },
  { id: 'financier', label: 'Financier', x: 64, y: 42 },
  { id: 'repayment', label: 'Repayment', x: 90, y: 42 },
] as const;

interface MoneyFlowHeroProps {
  /** @deprecated Parallax uses page scrollY; kept for call-site compatibility. */
  scrollTargetRef?: RefObject<HTMLElement | null>;
}

/**
 * Finance-only hero visual: Anchor → Distributor → Financier → Repayment
 * with flow-line dash animation and distinct parallax layer speeds.
 *
 * Parallax is driven by page scrollY over the first ~420px so layers shift
 * while the diagram is still on-screen (target-end progress peaks too late).
 */
export function MoneyFlowHero(_props: MoneyFlowHeroProps = {}) {
  const reduceMotion = usePrefersReducedMotion();

  const { scrollY } = useScroll();

  // Large, visibly different layer speeds — most of the travel by ~420px scroll
  const bgY = useTransform(scrollY, [0, 420], [0, reduceMotion ? 0 : -140]);
  const midY = useTransform(scrollY, [0, 420], [0, reduceMotion ? 0 : -70]);
  const fgY = useTransform(scrollY, [0, 420], [0, reduceMotion ? 0 : -18]);
  const markerY = useTransform(scrollY, [0, 420], [0, reduceMotion ? 0 : -110]);

  return (
    <Box
      data-testid="money-flow-hero"
      role="img"
      aria-label="Money flow diagram: Anchor to Distributor to Financier to Repayment"
      sx={{
        width: '100%',
        maxWidth: 640,
        mx: 'auto',
        position: 'relative',
        aspectRatio: '16 / 10',
        overflow: 'hidden',
        '@keyframes bt-flow-dash': {
          to: { strokeDashoffset: -14 },
        },
      }}
    >
      {/* Far background — moves fastest */}
      <motion.div
        data-parallax-layer="bg"
        style={{ y: bgY, position: 'absolute', inset: '-20% 0 0 0', pointerEvents: 'none' }}
        aria-hidden
      >
        <Box
          sx={{
            position: 'absolute',
            left: '6%',
            right: '6%',
            top: '4%',
            height: '92%',
            borderRadius: 2,
            border: '1px solid rgba(249, 115, 22, 0.22)',
            background:
              'radial-gradient(ellipse at 25% 35%, rgba(249,115,22,0.22), transparent 55%), radial-gradient(ellipse at 75% 65%, rgba(255,255,255,0.06), transparent 50%)',
          }}
        />
        {/* Distinctive high-contrast markers so parallax is measurable in screenshots */}
        <Box
          sx={{
            position: 'absolute',
            top: '8%',
            left: '10%',
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: 'rgba(249, 115, 22, 0.35)',
            border: `2px solid ${colors.primary}`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '12%',
            right: '12%',
            width: 40,
            height: 40,
            borderRadius: 1,
            backgroundColor: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.35)',
          }}
        />
      </motion.div>

      <motion.div
        data-parallax-layer="mid"
        style={{ y: midY, position: 'absolute', inset: 0, pointerEvents: 'none' }}
        aria-hidden
      >
        <svg viewBox="0 0 100 62" width="100%" height="100%" style={{ display: 'block' }}>
          {[
            [18, 14],
            [50, 8],
            [78, 16],
            [30, 54],
            [70, 52],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.4" fill={colors.primary} opacity="0.55" />
          ))}
        </svg>
      </motion.div>

      {/* Extra mid-speed accent bar */}
      <motion.div
        data-parallax-layer="marker"
        style={{ y: markerY, position: 'absolute', left: '18%', right: '18%', top: '18%', pointerEvents: 'none' }}
        aria-hidden
      >
        <Box
          sx={{
            height: 3,
            borderRadius: 1,
            background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
            opacity: 0.7,
          }}
        />
      </motion.div>

      <motion.div
        data-parallax-layer="fg"
        style={{ y: fgY, position: 'absolute', inset: 0 }}
      >
        <svg viewBox="0 0 100 62" width="100%" height="100%" style={{ display: 'block' }}>
          {nodes.slice(0, -1).map((n, i) => {
            const next = nodes[i + 1];
            return (
              <line
                key={`line-${n.id}`}
                x1={n.x + 9}
                y1={n.y}
                x2={next.x - 9}
                y2={next.y}
                stroke={colors.primary}
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeDasharray="2.4 1.6"
                opacity="0.85"
                style={
                  reduceMotion
                    ? undefined
                    : { animation: 'bt-flow-dash 1.8s linear infinite' }
                }
              />
            );
          })}

          {nodes.map((n) => (
            <g key={n.id}>
              <rect
                x={n.x - 9}
                y={n.y - 5.5}
                width="18"
                height="11"
                rx="1.4"
                fill={colors.white}
                stroke={colors.primary}
                strokeWidth="0.55"
              />
              <text
                x={n.x}
                y={n.y + 1.2}
                textAnchor="middle"
                fill={colors.gray900}
                fontSize="2.55"
                fontWeight="600"
                fontFamily="Inter, sans-serif"
              >
                {n.label}
              </text>
            </g>
          ))}

          <text
            x="50"
            y="56"
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            fontSize="2.15"
            fontFamily="Inter, sans-serif"
          >
            Embedded working capital at the point of transaction
          </text>
        </svg>
      </motion.div>

      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 2,
          textAlign: 'center',
          color: 'rgba(255,255,255,0.45)',
          fontSize: '0.7rem',
          display: { xs: 'none', sm: 'block' },
          zIndex: 2,
        }}
      >
        Illustrative money-flow path — SCF programme lifecycle
      </Typography>
    </Box>
  );
}
