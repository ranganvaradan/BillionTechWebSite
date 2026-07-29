import { Box, Container, Divider, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { footerColumns } from '@/data/navigation';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { colors } from '@/theme/tokens';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.gray900,
        color: colors.white,
        pt: 8,
        pb: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: '2fr 1fr 1fr 1fr' },
            gap: 4,
          }}
        >
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
            <Box sx={{ mb: 1.5 }}>
              <BrandLogo height={28} inverted />
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 320 }}>
              The Operating System for India&apos;s Supply Chain &amp; Lending.
            </Typography>
          </Box>

          {footerColumns.map((col) => (
            <Box key={col.title}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: colors.white,
                  fontWeight: 600,
                  mb: 2,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                }}
              >
                {col.title}
              </Typography>
              <Stack spacing={1.25}>
                {col.links.map((link) => (
                  <Link
                    key={link.href + link.label}
                    component={RouterLink}
                    to={link.href}
                    underline="hover"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.9rem',
                      '&:hover': { color: colors.primary },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 4 }} />

        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          © {new Date().getFullYear()} BillionTech. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
