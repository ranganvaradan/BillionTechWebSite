import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as RouterLink } from 'react-router-dom';
import { ctaLinks, platformMegaMenu } from '@/data/navigation';
import { colors, layout } from '@/theme/tokens';

interface MegaMenuProps {
  active?: boolean;
}

export function MegaMenu({ active = false }: MegaMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleCloseAndFocusTrigger = useCallback(() => {
    setAnchorEl(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        handleCloseAndFocusTrigger();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open, handleCloseAndFocusTrigger]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
        <Button
          ref={triggerRef}
          color="inherit"
          endIcon={<KeyboardArrowDownIcon aria-hidden />}
          aria-haspopup="menu"
          aria-expanded={open ? 'true' : 'false'}
          aria-controls={open ? menuId : undefined}
          onClick={(e) => setAnchorEl(open ? null : e.currentTarget)}
          onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            color: active || open ? colors.primary : colors.gray700,
            fontWeight: 500,
            px: { md: 1, lg: 1.5 },
            borderRadius: 0,
            minHeight: layout.topNavHeight,
            borderBottom: `2px solid ${active || open ? colors.primary : 'transparent'}`,
            '&:hover': { color: colors.primaryHover, backgroundColor: colors.primaryLight },
          }}
        >
          Products
        </Button>

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
          style={{ zIndex: 1300 }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'left top' }} unmountOnExit>
              <Paper
                id={menuId}
                role="menu"
                elevation={0}
                onMouseLeave={handleClose}
                sx={{
                  mt: 1,
                  width: { xs: 'min(92vw, 560px)', md: 560 },
                  maxWidth: 'calc(100vw - 24px)',
                  border: `1px solid ${colors.gray200}`,
                  boxShadow: '0 12px 40px rgba(17, 24, 39, 0.12)',
                  overflow: 'hidden',
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={0}
                  sx={{ p: 1.5, alignItems: 'stretch' }}
                  divider={
                    <Box
                      sx={{
                        width: { xs: '100%', sm: '1px' },
                        height: { xs: '1px', sm: 'auto' },
                        alignSelf: 'stretch',
                        backgroundColor: colors.gray200,
                        mx: { sm: 0.5 },
                        my: { xs: 1, sm: 0 },
                      }}
                    />
                  }
                >
                  {platformMegaMenu.map((group) => (
                    <Box key={group.href} sx={{ flex: 1, minWidth: 0, px: 0.5 }}>
                      <Box
                        component={RouterLink}
                        to={group.href}
                        onClick={handleClose}
                        role="menuitem"
                        sx={{
                          display: 'block',
                          px: 1.5,
                          py: 1.25,
                          borderRadius: 1,
                          mb: 0.5,
                          '&:hover, &:focus-visible': { backgroundColor: colors.gray50 },
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: colors.gray900,
                            letterSpacing: '0.02em',
                          }}
                        >
                          {group.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: colors.gray500, display: 'block', mt: 0.25 }}>
                          {group.oneLiner}
                        </Typography>
                      </Box>

                      <Stack spacing={0}>
                        {group.products.map((item) => (
                          <Box
                            key={item.href}
                            component={RouterLink}
                            role="menuitem"
                            to={item.href}
                            onClick={handleClose}
                            sx={{
                              display: 'block',
                              p: 1.5,
                              borderRadius: 1,
                              '&:hover, &:focus-visible': { backgroundColor: colors.gray50 },
                            }}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              sx={{ mb: 0.5 }}
                              flexWrap="wrap"
                              useFlexGap
                            >
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, color: colors.gray900, fontFamily: 'inherit' }}
                              >
                                {item.name}
                              </Typography>
                              {item.statusBadge ? (
                                <Chip
                                  label={item.statusBadge}
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: '0.65rem',
                                    fontWeight: 600,
                                    backgroundColor: colors.primaryLight,
                                    color: colors.gray900,
                                  }}
                                />
                              ) : null}
                            </Stack>
                            <Typography variant="body2" sx={{ color: colors.gray500, fontSize: '0.8rem' }}>
                              {item.oneLiner}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  ))}
                </Stack>

                <Box
                  sx={{
                    borderTop: `1px solid ${colors.gray200}`,
                    backgroundColor: colors.gray50,
                    px: 2.5,
                    py: 1.75,
                  }}
                >
                  <Typography variant="body2" sx={{ color: colors.gray500, mb: 0.5 }}>
                    {ctaLinks.viewAllProducts.description}
                  </Typography>
                  <Typography
                    component={RouterLink}
                    to={ctaLinks.viewAllProducts.href}
                    onClick={handleClose}
                    sx={{
                      color: colors.primaryHover,
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {ctaLinks.viewAllProducts.label} →
                  </Typography>
                </Box>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
