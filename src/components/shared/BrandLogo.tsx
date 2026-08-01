import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '@/theme/tokens';

interface BrandLogoProps {
  height?: number;
  /** When true, render on a light pad so brand colors stay correct on dark footers (no CSS invert). */
  inverted?: boolean;
  to?: string;
}

export function BrandLogo({ height = 28, inverted = false, to = '/' }: BrandLogoProps) {
  const img = (
    <Box
      component="img"
      src="/brand/BillionTech_Logo_Final.png"
      alt="BillionTech"
      sx={{
        height,
        width: 'auto',
        display: 'block',
      }}
    />
  );

  // CSS invert washed the orange mark to white. LOS BrandLogo avoids invert for the
  // same reason — use a light pad on dark surfaces so the real asset stays legible.
  const mark = inverted ? (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 1,
        px: 1,
        py: 0.5,
      }}
    >
      {img}
    </Box>
  ) : (
    img
  );

  if (!to) return mark;

  return (
    <Box
      component={RouterLink}
      to={to}
      aria-label="BillionTech home"
      sx={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0 }}
    >
      {mark}
    </Box>
  );
}
