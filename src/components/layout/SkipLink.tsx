import { Box } from '@mui/material';
import { colors } from '@/theme/tokens';

/** Skip link for keyboard users — first focusable control on every page. */
export function SkipLink() {
  return (
    <Box
      component="a"
      href="#main-content"
      sx={{
        position: 'absolute',
        left: 16,
        top: 0,
        zIndex: 2000,
        transform: 'translateY(-120%)',
        px: 2,
        py: 1,
        backgroundColor: colors.gray900,
        color: colors.white,
        fontWeight: 600,
        fontSize: '0.875rem',
        borderRadius: 1,
        '&:focus': {
          transform: 'translateY(12px)',
          outline: `2px solid ${colors.primary}`,
          outlineOffset: 2,
        },
      }}
    >
      Skip to main content
    </Box>
  );
}
