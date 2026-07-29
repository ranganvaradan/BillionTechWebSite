import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/tokens';

/** Illustrative AI-LOS risk score capability visual — not a live underwriting decision. */
export function RiskScoreVisual() {
  const score = 0.72;
  const decision = 'Refer';
  const confidence = 84;
  const dialPercent = Math.round(score * 100);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
        gap: 4,
        p: { xs: 3, md: 4 },
        backgroundColor: colors.white,
        border: `1px solid ${colors.gray200}`,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Box
          role="img"
          aria-label={`Illustrative risk score ${score.toFixed(2)} out of 1.00`}
          sx={{
            width: 200,
            height: 200,
            mx: 'auto',
            borderRadius: '50%',
            background: `conic-gradient(${colors.primary} ${dialPercent}%, ${colors.gray200} 0)`,
            display: 'grid',
            placeItems: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              backgroundColor: colors.white,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: colors.gray500, letterSpacing: '0.06em' }}>
              RISK SCORE
            </Typography>
            <Typography
              sx={{
                fontFamily: (t) => t.typography.h1.fontFamily,
                fontWeight: 700,
                fontSize: '2.5rem',
                color: colors.gray900,
                lineHeight: 1.1,
              }}
            >
              {score.toFixed(2)}
            </Typography>
            <Typography variant="caption" sx={{ color: colors.gray500 }}>
              of 1.00
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="overline" sx={{ color: colors.info, fontWeight: 700, letterSpacing: '0.08em' }}>
          AI-LOS recommendation
        </Typography>
        <Typography variant="h4" sx={{ mb: 1, fontSize: { xs: '1.4rem', md: '1.75rem' } }}>
          {decision}
          <Typography component="span" sx={{ ml: 1.5, color: colors.gray500, fontSize: '1rem', fontWeight: 500 }}>
            {confidence}% confidence
          </Typography>
        </Typography>
        <Typography variant="body2" sx={{ color: colors.gray500, mb: 3, maxWidth: 480 }}>
          Score band with reasoning for Approve / Refer / Decline. Credit officers review the draft memo and
          peer comparables before any decision.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 1.5,
            mb: 3,
          }}
        >
          {[
            { label: 'Approve', hint: 'High confidence · clear book fit' },
            { label: 'Refer', hint: 'Needs credit review', active: true },
            { label: 'Decline', hint: 'Counteroffer engine available' },
          ].map((item) => (
            <Box
              key={item.label}
              sx={{
                p: 2,
                border: `1px solid ${item.active ? colors.primary : colors.gray200}`,
                backgroundColor: item.active ? colors.primaryLight : colors.gray50,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  color: item.active ? colors.primaryHover : colors.gray900,
                  mb: 0.5,
                }}
              >
                {item.label}
              </Typography>
              <Typography variant="caption" sx={{ color: colors.gray500 }}>
                {item.hint}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box component="ul" sx={{ m: 0, pl: 2.25 }}>
          {[
            'Peer comparables — 5 similar past loans from the lender’s own book',
            'Early warning signals on portfolio monitoring',
            'Counteroffer engine when the recommendation is Decline',
          ].map((item) => (
            <Typography component="li" variant="body2" key={item} sx={{ mb: 0.75, color: colors.gray700 }}>
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
