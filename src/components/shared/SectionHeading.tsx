import { Box, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { colors } from '@/theme/tokens';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
}: SectionHeadingProps) {
  return (
    <Box sx={{ textAlign: align, mb: { xs: 4, md: 5 }, maxWidth: align === 'center' ? 720 : 640, mx: align === 'center' ? 'auto' : 0 }}>
      {eyebrow && (
        <Typography
          variant="overline"
          sx={{
            color: light ? 'rgba(255,255,255,0.85)' : colors.gray700,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            mb: 1,
            display: 'block',
            fontSize: '0.8rem',
          }}
        >
          {eyebrow}
        </Typography>
      )}
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.75rem', md: '2.25rem' },
          color: light ? colors.white : colors.gray900,
          mb: subtitle ? 1.5 : 0,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          sx={{ color: light ? 'rgba(255,255,255,0.75)' : colors.gray500, fontSize: '1.05rem' }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

interface SectionProps {
  children: ReactNode;
  id?: string;
  bg?: 'white' | 'light' | 'alt' | 'dark';
  py?: object | number;
}

export function Section({ children, id, bg = 'white', py }: SectionProps) {
  const bgMap = {
    white: colors.white,
    light: colors.gray50,
    alt: colors.gray100,
    dark: colors.gray900,
  };

  return (
    <Box
      id={id}
      component="section"
      sx={{
        backgroundColor: bgMap[bg],
        py: py ?? { xs: 7, md: 10 },
      }}
    >
      {children}
    </Box>
  );
}
