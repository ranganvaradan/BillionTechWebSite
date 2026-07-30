import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/tokens';
import { IllustrativeMockupFrame } from './IllustrativeMockupFrame';

const payments = [
  { ref: 'VA-44102', party: 'Distributor North', amount: '₹2.4 L', match: 'Matched' },
  { ref: 'VA-44108', party: 'Distributor West', amount: '₹98 K', match: 'Matched' },
  { ref: 'VA-44115', party: 'Distributor South', amount: '₹1.1 L', match: 'Exception' },
];

/** Stylized O2C cash / reconciliation view — not a product screenshot. */
export function O2cReconciliationMockup() {
  return (
    <IllustrativeMockupFrame title="O2C reconciliation" caption="Illustrative interface">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 1,
          mb: 2,
        }}
      >
        {[
          { label: 'Auto-matched today', value: '80%+' },
          { label: 'Open exceptions', value: '14' },
          { label: 'DSO trend', value: '−15–20 days' },
        ].map((kpi) => (
          <Box
            key={kpi.label}
            sx={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.gray200}`,
              borderRadius: 1.5,
              p: 1.25,
            }}
          >
            <Typography sx={{ fontSize: '0.7rem', color: colors.gray700, mb: 0.4 }}>
              {kpi.label}
            </Typography>
            <Typography
              sx={{
                fontFamily: (th) => th.typography.h1.fontFamily,
                fontWeight: 700,
                fontSize: '1.15rem',
                color: colors.gray900,
              }}
            >
              {kpi.value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.gray200}`,
          borderRadius: 1.5,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr 0.9fr 0.9fr',
            gap: 1,
            px: 1.25,
            py: 0.85,
            backgroundColor: colors.gray50,
            borderBottom: `1px solid ${colors.gray200}`,
          }}
        >
          {['Virtual a/c', 'Distributor', 'Amount', 'Status'].map((h) => (
            <Typography
              key={h}
              sx={{ fontSize: '0.7rem', fontWeight: 700, color: colors.gray700 }}
            >
              {h}
            </Typography>
          ))}
        </Box>
        {payments.map((p) => {
          const ok = p.match === 'Matched';
          return (
            <Box
              key={p.ref}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.4fr 0.9fr 0.9fr',
                gap: 1,
                px: 1.25,
                py: 1,
                borderBottom: `1px solid ${colors.gray100}`,
                alignItems: 'center',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: colors.gray900 }}>
                {p.ref}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: colors.gray700 }}>{p.party}</Typography>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: colors.gray900 }}>
                {p.amount}
              </Typography>
              <Box
                sx={{
                  display: 'inline-flex',
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  width: 'fit-content',
                  backgroundColor: ok ? colors.successLight : colors.warningLight,
                  border: `1px solid ${ok ? colors.success : colors.warning}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: ok ? colors.success : colors.warning,
                  }}
                >
                  {p.match}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </IllustrativeMockupFrame>
  );
}
