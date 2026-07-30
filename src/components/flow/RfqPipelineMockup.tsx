import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/tokens';
import { IllustrativeMockupFrame } from './IllustrativeMockupFrame';

const stages = [
  { label: 'RFQ issued', count: '12', tone: 'open' as const },
  { label: 'Quotes in', count: '8', tone: 'progress' as const },
  { label: 'In evaluation', count: '5', tone: 'progress' as const },
  { label: 'PO ready', count: '3', tone: 'done' as const },
];

const rows = [
  { id: 'RFQ-1042', supplier: 'Acme Polymers', status: 'Quotes in', age: '2h' },
  { id: 'RFQ-1038', supplier: '3 invited', status: 'RFQ issued', age: '5h' },
  { id: 'RFQ-1031', supplier: 'Nova Castings', status: 'In evaluation', age: '1d' },
];

function toneColor(tone: 'open' | 'progress' | 'done') {
  if (tone === 'done') return { bg: colors.successLight, fg: colors.success };
  if (tone === 'progress') return { bg: colors.primaryLight, fg: colors.primaryHover };
  return { bg: colors.gray100, fg: colors.gray700 };
}

/** Stylized RFQ / sourcing pipeline — not a product screenshot. */
export function RfqPipelineMockup() {
  return (
    <IllustrativeMockupFrame title="RFQ pipeline" caption="Illustrative interface">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
          gap: 1,
          mb: 2,
        }}
      >
        {stages.map((s) => {
          const t = toneColor(s.tone);
          return (
            <Box
              key={s.label}
              sx={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.gray200}`,
                borderRadius: 1.5,
                p: 1.25,
              }}
            >
              <Typography sx={{ fontSize: '0.7rem', color: colors.gray700, mb: 0.5 }}>
                {s.label}
              </Typography>
              <Typography
                sx={{
                  fontFamily: (th) => th.typography.h1.fontFamily,
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: colors.gray900,
                }}
              >
                {s.count}
              </Typography>
              <Box
                sx={{
                  mt: 0.75,
                  height: 4,
                  borderRadius: 1,
                  backgroundColor: t.bg,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    width: s.tone === 'done' ? '100%' : s.tone === 'progress' ? '55%' : '30%',
                    backgroundColor: t.fg,
                  }}
                />
              </Box>
            </Box>
          );
        })}
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
            gridTemplateColumns: '1.1fr 1.4fr 1.1fr 0.6fr',
            gap: 1,
            px: 1.25,
            py: 0.85,
            backgroundColor: colors.gray50,
            borderBottom: `1px solid ${colors.gray200}`,
          }}
        >
          {['RFQ', 'Supplier / pool', 'Status', 'Age'].map((h) => (
            <Typography
              key={h}
              sx={{ fontSize: '0.7rem', fontWeight: 700, color: colors.gray700 }}
            >
              {h}
            </Typography>
          ))}
        </Box>
        {rows.map((r) => (
          <Box
            key={r.id}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1.4fr 1.1fr 0.6fr',
              gap: 1,
              px: 1.25,
              py: 1,
              borderBottom: `1px solid ${colors.gray100}`,
              alignItems: 'center',
              '&:last-child': { borderBottom: 'none' },
            }}
          >
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: colors.gray900 }}>
              {r.id}
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: colors.gray700 }}>{r.supplier}</Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: 1,
                py: 0.25,
                borderRadius: 1,
                backgroundColor: colors.primaryLight,
                border: `1px solid ${colors.primaryBorder}`,
                width: 'fit-content',
              }}
            >
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: colors.gray900 }}>
                {r.status}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '0.75rem', color: colors.gray700 }}>{r.age}</Typography>
          </Box>
        ))}
      </Box>
    </IllustrativeMockupFrame>
  );
}
