import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import { ctaLinks, primaryNav } from '@/data/navigation';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { colors, layout } from '@/theme/tokens';
import { MegaMenu } from './MegaMenu';
import { MobileNavigationDrawer } from './MobileNavigationDrawer';

const navButtonSx = {
  color: colors.gray700,
  fontWeight: 500,
  px: { md: 1, lg: 1.5 },
  fontSize: { md: '0.875rem', lg: '0.9375rem' },
  borderRadius: 0,
  minHeight: layout.topNavHeight,
  borderBottom: '2px solid transparent',
  whiteSpace: 'nowrap' as const,
  '&:hover': {
    color: colors.primaryHover,
    backgroundColor: colors.primaryLight,
  },
};

export function AppHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const productsActive =
    location.pathname.startsWith('/products') || location.pathname.startsWith('/platform');

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: colors.white,
          borderBottom: `1px solid ${colors.gray200}`,
          color: colors.gray900,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{ minHeight: { xs: layout.topNavHeight, md: layout.topNavHeight }, gap: 1 }}
          >
            <BrandLogo height={28} />

            {!isMobile && (
              <Stack direction="row" alignItems="stretch" spacing={0.5} sx={{ flexGrow: 1, ml: 2 }}>
                <MegaMenu active={productsActive} />
                {primaryNav.map((item) => (
                  <Button
                    key={item.href}
                    component={NavLink}
                    to={item.href}
                    color="inherit"
                    sx={{
                      ...navButtonSx,
                      '&.active': {
                        color: colors.primary,
                        borderBottomColor: colors.primary,
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            )}

            {isMobile && <Box sx={{ flexGrow: 1 }} />}

            {!isMobile && (
              <Stack direction="row" spacing={1.5}>
                <Button
                  component={RouterLink}
                  to={ctaLinks.talkToUs.href}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  {ctaLinks.talkToUs.label}
                </Button>
                <Button
                  component={RouterLink}
                  to={ctaLinks.requestDemo.href}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  {ctaLinks.requestDemo.label}
                </Button>
              </Stack>
            )}

            {isMobile && (
              <IconButton
                edge="end"
                aria-label="Open navigation menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ color: colors.gray900 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <MobileNavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
