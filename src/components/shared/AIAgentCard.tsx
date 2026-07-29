import { Box, Typography } from '@mui/material';
import type { AIAgent } from '@/data/products';
import { colors } from '@/theme/tokens';

interface AIAgentCardProps {
  agent: AIAgent;
  index: number;
}

export function AIAgentCard({ agent, index }: AIAgentCardProps) {
  return (
    <Box
      sx={{
        height: '100%',
        p: 3,
        backgroundColor: colors.white,
        border: `1px solid ${colors.gray200}`,
        borderTop: `3px solid ${colors.info}`,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: colors.info,
          fontWeight: 700,
          letterSpacing: '0.08em',
          display: 'block',
          mb: 1,
        }}
      >
        Agent {String(index).padStart(2, '0')}
      </Typography>
      <Typography variant="h6" sx={{ mb: 1, fontSize: '1.1rem', color: colors.gray900 }}>
        {agent.name}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.gray500 }}>
        {agent.description}
      </Typography>
    </Box>
  );
}
