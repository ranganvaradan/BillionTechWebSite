import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/tokens';
import { IllustrativeMockupFrame } from './IllustrativeMockupFrame';

const legs = [
  { label: 'PO', value: 'PO-88421', detail: 'Qty 1,200 · ₹4.8 L' },
  { label: 'GRN', value: 'GRN-22091', detail: 'Received · QC pass' },
  { label: 'Invoice', value: 'INV-77801', detail: 'Qty 1,200 · ₹4.8 L' },
];

/** Stylized 3-way match (PO / GRN / Invoice) — not a product screenshot. */
export function ThreeWayMatchMockup() {
  return (
    <IllustrativeMockupFrame title="3-way match" caption="Illustrative interface">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: colors.gray900 }}>
          Match review · PO / GRN / Invoice
        </Typography>
        <Box
          sx={{
            px: 1.25,
            py: 0.4,
            borderRadius: 1,
            backgroundColor: colors.successLight,
            border: `1px solid ${colors.success}`,
          }}
        >
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: colors.success }}>
            Auto-cleared
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr auto 1fr' },
          gap: { xs: 1.25, sm: 1 },
          alignItems: 'stretch',
          mb: 2,
        }}
      >
        {legs.map((leg, i) => (
          <Box key={leg.label} sx={{ display: 'contents' }}>
            <Box
              sx={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.gray200}`,
                borderRadius: 1.5,
                p: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: colors.primary,
                  mb: 0.75,
                }}
              >
                {leg.label}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: colors.gray900, mb: 0.35 }}>
                {leg.value}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: colors.gray700 }}>{leg.detail}</Typography>
            </Box>
            {i < legs.length - 1 ? (
              <Box
                aria-hidden
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.primary,
                  fontWeight: 700,
                  px: 0.25,
                }}
              >
                →
              </Box>
            ) : null}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.gray200}`,
            borderRadius: 1.5,
            p: 1.25,
          }}
        >
          <Typography sx={{ fontSize: '0.7rem', color: colors.gray700, mb: 0.35 }}>
            Quantity check
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: colors.gray900 }}>
            PO = GRN = Invoice · 1,200
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.gray200}`,
            borderRadius: 1.5,
            p: 1.25,
          }}
        >
          <Typography sx={{ fontSize: '0.7rem', color: colors.gray700, mb: 0.35 }}>
            Price check
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: colors.gray900 }}>
            Line totals aligned · ready for pay
          </Typography>
        </Box>
      </Box>
    </IllustrativeMockupFrame>
  );
}
