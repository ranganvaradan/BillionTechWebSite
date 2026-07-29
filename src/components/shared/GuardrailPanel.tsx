import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/tokens';

interface GuardrailPanelProps {
  title?: string;
  statement: string;
}

export function GuardrailPanel({
  title = 'Human control',
  statement,
}: GuardrailPanelProps) {
  return (
    <Box
      role="note"
      sx={{
        mt: 4,
        p: { xs: 2.5, md: 3 },
        backgroundColor: colors.primaryLight,
        borderLeft: `4px solid ${colors.primary}`,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: colors.gray700,
          fontWeight: 700,
          mb: 1,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
        }}
      >
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: colors.gray700, maxWidth: 760 }}>
        {statement}
      </Typography>
    </Box>
  );
}
