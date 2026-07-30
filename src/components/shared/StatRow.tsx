import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/tokens';
import { CountUpStatValue } from '@/components/shared/CountUpStatValue';

export interface StatItem {
  value: string;
  label: string;
}

interface StatRowProps {
  stats: readonly StatItem[];
  variant?: 'light' | 'dark' | 'tint';
  /** When true, numeric values count up on first scroll into view. */
  animate?: boolean;
}

export function StatRow({ stats, variant = 'light', animate = false }: StatRowProps) {
  const bg =
    variant === 'dark' ? colors.gray900 : variant === 'tint' ? colors.primaryLight : colors.gray50;
  const valueColor = variant === 'dark' ? colors.white : colors.gray900;
  const labelColor = variant === 'dark' ? 'rgba(255,255,255,0.7)' : colors.gray500;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr 1fr', md: `repeat(${Math.min(stats.length, 4)}, 1fr)` },
        gap: { xs: 3, md: 0 },
        backgroundColor: bg,
        borderRadius: variant === 'dark' ? 0 : 1,
        border: variant === 'light' ? `1px solid ${colors.gray200}` : 'none',
        py: { xs: 3, md: 4 },
        px: { xs: 2, md: 1 },
      }}
    >
      {stats.map((stat, i) => (
        <Box
          key={stat.label}
          sx={{
            textAlign: 'center',
            px: 2,
            borderRight: {
              xs: 'none',
              md:
                i < stats.length - 1
                  ? `1px solid ${variant === 'dark' ? 'rgba(255,255,255,0.12)' : colors.gray200}`
                  : 'none',
            },
          }}
        >
          {animate ? (
            <CountUpStatValue value={stat.value} color={valueColor} />
          ) : (
            <Typography
              sx={{
                fontFamily: (t) => t.typography.h1.fontFamily,
                fontWeight: 700,
                fontSize: { xs: '1.5rem', md: '1.85rem' },
                color: valueColor,
                mb: 0.75,
              }}
            >
              {stat.value}
            </Typography>
          )}
          <Typography variant="body2" sx={{ color: labelColor, maxWidth: 220, mx: 'auto', lineHeight: 1.45 }}>
            {stat.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
