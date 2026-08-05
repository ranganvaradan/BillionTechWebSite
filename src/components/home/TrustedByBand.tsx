import { Box, Typography } from '@mui/material';
import { clientDescriptors } from '@/data/clients';
import { colors } from '@/theme/tokens';

/** Anonymized customer descriptors — text chips, not logo graphics. */
export const trustedByNames = [
  clientDescriptors.ttkPrestige,
  clientDescriptors.sundaramFinance,
  clientDescriptors.iciciBank,
  clientDescriptors.tataCapital,
] as const;

/**
 * Compact band for the homepage — "Who We Work With" (descriptors, not named logos).
 */
export function TrustedByBand() {
  return (
    <Box
      component="aside"
      id="trusted-by"
      aria-label="Who we work with"
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
            minWidth: { sm: 140 },
          }}
        >
          Who We Work With
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 1.25,
            width: '100%',
            alignItems: 'stretch',
          }}
        >
          {trustedByNames.map((name) => (
            <Box
              key={name}
              sx={{
                px: 2,
                py: 1.25,
                borderRadius: 1.5,
                border: `1px solid ${colors.gray300}`,
                backgroundColor: colors.gray50,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: { sm: 52 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '0.78rem', md: '0.85rem' },
                  fontWeight: 600,
                  color: colors.gray700,
                  letterSpacing: '0.01em',
                  lineHeight: 1.35,
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
