import { Box, Container, Divider, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { colors } from '@/theme/tokens';

const companyLinks = [
  { label: 'Why BillionTech', href: '/why-billiontech' },
  { label: 'Who We Serve', href: '/who-we-serve' },
  { label: 'Credentials', href: '/proof' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const trustLinks = [
  { label: 'Live deployments', href: '/proof' },
  { label: "RBI's Digital Lending Guidelines", href: '/products/billiontech-lend' },
  { label: 'Talk to Us', href: '/contact' },
];

const productGroups = [
  {
    label: 'BillionTech Flow',
    href: '/platform/flow',
    children: [
      { label: 'Flow P2P', href: '/products/flow-p2p' },
      { label: 'Flow O2C', href: '/products/flow-o2c' },
    ],
  },
  {
    label: 'BillionTech LEND',
    href: '/platform/finance',
    children: [
      { label: 'SCF', href: '/products/scf' },
      { label: 'Loan Origination System', href: '/products/billiontech-lend' },
    ],
  },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      component={RouterLink}
      to={href}
      underline="hover"
      sx={{
        color: 'rgba(255,255,255,0.7)',
        fontSize: '0.9rem',
        '&:hover': { color: colors.primary },
      }}
    >
      {label}
    </Link>
  );
}

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
            gridTemplateColumns: { xs: '1fr 1fr', md: '2fr 1.2fr 1fr 1fr' },
            gap: 4,
          }}
        >
          <Box sx={{ gridColumn: { xs: '1 / -1', md: 'auto' } }}>
            <Box sx={{ mb: 1.5 }}>
              <BrandLogo height={28} inverted />
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 320 }}>
              The Operating System for Enterprise Supply Chains.
            </Typography>
          </Box>

          <Box>
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
              Products
            </Typography>
            <Stack spacing={2.25}>
              {productGroups.map((group) => (
                <Box key={group.href}>
                  <Link
                    component={RouterLink}
                    to={group.href}
                    underline="hover"
                    sx={{
                      color: colors.white,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      display: 'inline-block',
                      mb: 1,
                      '&:hover': { color: colors.primary },
                    }}
                  >
                    {group.label}
                  </Link>
                  <Stack spacing={1} sx={{ pl: 1.5, borderLeft: `2px solid rgba(249,115,22,0.45)` }}>
                    {group.children.map((child) => (
                      <FooterLink key={child.href} href={child.href} label={child.label} />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box>
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
              Company
            </Typography>
            <Stack spacing={1.25}>
              {companyLinks.map((link) => (
                <FooterLink key={link.href + link.label} href={link.href} label={link.label} />
              ))}
            </Stack>
          </Box>

          <Box>
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
              Trust
            </Typography>
            <Stack spacing={1.25}>
              {trustLinks.map((link) => (
                <FooterLink key={link.href + link.label} href={link.href} label={link.label} />
              ))}
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 4 }} />

        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          © {new Date().getFullYear()} BillionTech. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
