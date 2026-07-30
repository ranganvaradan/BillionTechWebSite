import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/tokens';

/** Real, verified customer names only — text wordmarks, not logo graphics. */
export const trustedByNames = [
  'TTK Prestige',
  'Sundaram Finance',
  'ICICI Bank',
  'TATA Capital',
] as const;

/**
 * Compact "Trusted by" band for the homepage — styled text chips, no fabricated logos.
 */
export function TrustedByBand() {
  return (
    <Box
      component="aside"
      id="trusted-by"
      aria-label="Trusted by"
      sx={{
        backgroundColor: colors.white,
        borderBottom: `1px solid ${colors.gray200}`,
        py: { xs: 2.5, md: 3 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 1.5, sm: 2.5 },
        }}
      >
        <Typography
          sx={{
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: colors.gray700,
            flexShrink: 0,
            minWidth: { sm: 110 },
          }}
        >
          Trusted by
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.25,
            width: '100%',
          }}
        >
          {trustedByNames.map((name) => (
            <Box
              key={name}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 1.5,
                border: `1px solid ${colors.gray300}`,
                backgroundColor: colors.gray50,
                minWidth: { xs: 'calc(50% - 6px)', sm: 0 },
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '0.85rem', md: '0.9rem' },
                  fontWeight: 600,
                  color: colors.gray700,
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                {name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
