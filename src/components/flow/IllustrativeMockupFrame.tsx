import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { colors } from '@/theme/tokens';

interface IllustrativeMockupFrameProps {
  children: ReactNode;
  /** Visible honesty label — required for content integrity. */
  caption?: 'Illustrative interface' | 'Conceptual view';
  title?: string;
}

/**
 * Chrome + mandatory honesty caption for stylized product mockups.
 * Caption uses gray700 on light surfaces for WCAG-friendly small text.
 */
export function IllustrativeMockupFrame({
  children,
  caption = 'Illustrative interface',
  title,
}: IllustrativeMockupFrameProps) {
  return (
    <Box
      sx={{
        border: `1px solid ${colors.gray200}`,
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: colors.white,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          py: 1,
          borderBottom: `1px solid ${colors.gray200}`,
          backgroundColor: colors.gray50,
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.6 }} aria-hidden>
          {[colors.gray300, colors.gray300, colors.gray300].map((c, i) => (
            <Box
              key={i}
              sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: c }}
            />
          ))}
        </Box>
        {title ? (
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: colors.gray700,
              ml: 0.5,
            }}
          >
            {title}
          </Typography>
        ) : null}
      </Box>

      <Box sx={{ p: { xs: 1.5, md: 2 }, flex: 1, backgroundColor: colors.gray50 }}>{children}</Box>

      <Typography
        component="p"
        sx={{
          m: 0,
          px: 1.5,
          py: 1,
          borderTop: `1px solid ${colors.gray200}`,
          backgroundColor: colors.white,
          fontSize: '0.8125rem',
          lineHeight: 1.4,
          fontWeight: 500,
          color: colors.gray700,
          letterSpacing: '0.01em',
        }}
      >
        {caption}
      </Typography>
    </Box>
  );
}
