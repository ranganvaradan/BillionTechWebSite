import { Box, Chip, Stack, Typography } from '@mui/material';
import type { PartnerProof } from '@/data/products';
import { colors } from '@/theme/tokens';

interface PartnerCardProps {
  partner: PartnerProof;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Box
      sx={{
        height: '100%',
        p: 3,
        backgroundColor: colors.white,
        border: `1px solid ${colors.gray200}`,
        borderTop: `3px solid ${colors.primary}`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mb: 1.5 }}>
        <Typography variant="h6" sx={{ fontSize: '1.15rem', color: colors.gray900 }}>
          {partner.name}
        </Typography>
        {partner.badge && (
          <Chip
            label={partner.badge}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.7rem',
              fontWeight: 600,
              backgroundColor: colors.primaryLight,
              // gray900 on tint — WCAG-AA for small badge text
              color: colors.gray900,
            }}
          />
        )}
      </Stack>

      <Typography variant="body2" sx={{ color: colors.gray500, mb: 2.5, flexGrow: 1 }}>
        {partner.detail}
      </Typography>

      {partner.metrics && partner.metrics.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(partner.metrics.length, 3)}, 1fr)`,
            gap: 1.5,
          }}
        >
          {partner.metrics.map((m) => (
            <Box key={m.label} sx={{ p: 1.5, backgroundColor: colors.gray50 }}>
              <Typography
                sx={{
                  fontFamily: (t) => t.typography.h1.fontFamily,
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: colors.gray900,
                  mb: 0.25,
                }}
              >
                {m.value}
              </Typography>
              <Typography variant="caption" sx={{ color: colors.gray500 }}>
                {m.label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
