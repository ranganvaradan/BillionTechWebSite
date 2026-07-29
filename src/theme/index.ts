import { createTheme } from '@mui/material/styles';
import { colors, fonts, radii } from './tokens';

declare module '@mui/material/styles' {
  interface Palette {
    brand: typeof colors;
  }
  interface PaletteOptions {
    brand?: typeof colors;
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
      dark: colors.primaryHover,
      light: colors.primaryLight,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.gray900,
      contrastText: colors.white,
    },
    success: {
      main: colors.success,
      light: colors.successLight,
    },
    error: {
      main: colors.error,
      light: colors.errorLight,
    },
    warning: {
      main: colors.warning,
      light: colors.warningLight,
    },
    info: {
      main: colors.info,
      light: colors.infoLight,
    },
    background: {
      default: colors.white,
      paper: colors.white,
    },
    text: {
      primary: colors.gray900,
      secondary: colors.gray500,
    },
    divider: colors.gray200,
    brand: { ...colors },
  },
  typography: {
    fontFamily: fonts.body,
    h1: {
      fontFamily: fonts.heading,
      fontWeight: 700,
      color: colors.gray900,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: fonts.heading,
      fontWeight: 700,
      color: colors.gray900,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: fonts.heading,
      fontWeight: 600,
      color: colors.gray900,
    },
    h4: {
      fontFamily: fonts.heading,
      fontWeight: 600,
      color: colors.gray900,
    },
    h5: {
      fontFamily: fonts.heading,
      fontWeight: 600,
      color: colors.gray900,
    },
    h6: {
      fontFamily: fonts.heading,
      fontWeight: 600,
      color: colors.gray700,
    },
    body1: {
      fontFamily: fonts.body,
      color: colors.gray700,
      lineHeight: 1.65,
    },
    body2: {
      fontFamily: fonts.body,
      color: colors.gray500,
      lineHeight: 1.6,
    },
    button: {
      fontFamily: fonts.body,
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: radii.md,
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          // MUI clears outline by default; restore a visible WCAG focus ring
          '&.Mui-focusVisible, &:focus-visible': {
            outline: `2px solid ${colors.primary}`,
            outlineOffset: 2,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: radii.md,
          padding: '10px 22px',
          fontSize: '0.9375rem',
          '&.Mui-focusVisible, &:focus-visible': {
            outline: `2px solid ${colors.primary}`,
            outlineOffset: 2,
          },
        },
        containedPrimary: {
          backgroundColor: colors.primary,
          '&:hover': {
            backgroundColor: colors.primaryHover,
          },
        },
        outlinedPrimary: {
          borderColor: colors.primary,
          color: colors.primaryHover,
          '&:hover': {
            borderColor: colors.primaryHover,
            backgroundColor: colors.primaryLight,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible, &:focus-visible': {
            outline: `2px solid ${colors.primary}`,
            outlineOffset: 2,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: `2px solid ${colors.primary}`,
            outlineOffset: 2,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: colors.white,
          color: colors.gray900,
          overflowX: 'hidden',
        },
        img: {
          maxWidth: '100%',
          height: 'auto',
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
        'a:focus-visible, button:focus-visible, [role="button"]:focus-visible, [role="menuitem"]:focus-visible, summary:focus-visible':
          {
            outline: `2px solid ${colors.primary}`,
            outlineOffset: 2,
          },
        '@media (prefers-reduced-motion: reduce)': {
          html: {
            scrollBehavior: 'auto',
          },
          '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
          },
        },
      },
    },
  },
});
