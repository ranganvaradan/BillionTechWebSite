import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface BrandLogoProps {
  height?: number;
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
        ...(inverted
          ? {
              // Logo is dark-on-transparent; lighten for dark footers
              filter: 'brightness(0) invert(1)',
            }
          : null),
      }}
    />
  );

  if (!to) return img;

  return (
    <Box
      component={RouterLink}
      to={to}
      aria-label="BillionTech home"
      sx={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0 }}
    >
      {img}
    </Box>
  );
}
