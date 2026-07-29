import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import { ctaLinks, platformMegaMenu, primaryNav } from '@/data/navigation';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { colors } from '@/theme/tokens';

interface MobileNavigationDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavigationDrawer({ open, onClose }: MobileNavigationDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 'min(100%, 360px)', backgroundColor: colors.white },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <BrandLogo height={26} to="/" />
        <IconButton aria-label="Close navigation menu" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography
          variant="overline"
          sx={{ color: colors.gray500, letterSpacing: '0.08em', fontWeight: 600 }}
        >
          Products
        </Typography>

        {platformMegaMenu.map((group) => (
          <Box key={group.href} sx={{ mt: 1.5 }}>
            <ListItemButton
              component={RouterLink}
              to={group.href}
              onClick={onClose}
              sx={{ borderRadius: 1, py: 1 }}
            >
              <ListItemText
                primary={group.name}
                secondary={group.oneLiner}
                primaryTypographyProps={{ fontWeight: 700, color: colors.gray900 }}
                secondaryTypographyProps={{ sx: { color: colors.gray500, mt: 0.25 } }}
              />
            </ListItemButton>
            <List dense disablePadding sx={{ pl: 1 }}>
              {group.products.map((item) => (
                <ListItemButton
                  key={item.href}
                  component={RouterLink}
                  to={item.href}
                  onClick={onClose}
                  sx={{ alignItems: 'flex-start', py: 1.25, borderRadius: 1 }}
                >
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                        <Typography sx={{ fontWeight: 600, color: colors.gray900 }}>{item.name}</Typography>
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
                      </Stack>
                    }
                    secondary={item.oneLiner}
                    secondaryTypographyProps={{ sx: { color: colors.gray500, mt: 0.5 } }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 1 }} />

      <List>
        {primaryNav.map((item) => (
          <ListItemButton
            key={item.href}
            component={RouterLink}
            to={item.href}
            onClick={onClose}
          >
            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ p: 2, mt: 'auto' }}>
        <Stack spacing={1.5}>
          <Button
            component={RouterLink}
            to={ctaLinks.requestDemo.href}
            variant="contained"
            fullWidth
            onClick={onClose}
          >
            {ctaLinks.requestDemo.label}
          </Button>
          <Button
            component={RouterLink}
            to={ctaLinks.talkToUs.href}
            variant="outlined"
            fullWidth
            onClick={onClose}
          >
            {ctaLinks.talkToUs.label}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}
