import { Box, Typography } from '@mui/material';
import type { AIAgent } from '@/data/products';
import { RfqPipelineMockup } from '@/components/flow/RfqPipelineMockup';
import { ThreeWayMatchMockup } from '@/components/flow/ThreeWayMatchMockup';
import { colors } from '@/theme/tokens';

interface FlowP2pProductVisualsProps {
  agents: AIAgent[];
}

/**
 * Flow P2P product visuals: illustrative mockups replace icon+text agent cards.
 * Agent names remain as a compact list so capability coverage is not lost.
 */
export default function FlowP2pProductVisuals({ agents }: FlowP2pProductVisualsProps) {
  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2.5,
          mb: 3,
        }}
      >
        <RfqPipelineMockup />
        <ThreeWayMatchMockup />
      </Box>

      <Typography
        sx={{
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: colors.gray700,
          mb: 1.5,
        }}
      >
        Six AI agents across the cycle
      </Typography>
      <Box
        component="ul"
        sx={{
          m: 0,
          p: 0,
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' },
          gap: 1.25,
        }}
      >
        {agents.map((agent, i) => (
          <Box
            key={agent.name}
            component="li"
            sx={{
              p: 1.5,
              borderRadius: 1.5,
              border: `1px solid ${colors.gray200}`,
              backgroundColor: colors.white,
            }}
          >
            <Typography
              sx={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: colors.primary,
                letterSpacing: '0.06em',
                mb: 0.5,
              }}
            >
              Agent {String(i + 1).padStart(2, '0')}
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: colors.gray900, mb: 0.35 }}>
              {agent.name}
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: colors.gray700, lineHeight: 1.5 }}>
              {agent.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
