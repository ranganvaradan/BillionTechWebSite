/**
 * BillionTech design tokens — mirrored from
 * LOS_APP-credinnov/ui-service/src/design-system/tokens.css
 * (same values as BillionTechLMS ops-console design-system).
 */
export const colors = {
  primary: '#f97316',
  primaryHover: '#ea6c0a',
  primaryLight: '#fff7ed',
  primaryBorder: '#fdba74',

  gray50: '#f8f9fb',
  gray100: '#f1f3f5',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray900: '#111827',

  white: '#FFFFFF',

  success: '#16a34a',
  successLight: '#f0fdf4',
  error: '#dc2626',
  errorLight: '#fef2f2',
  warning: '#d97706',
  warningLight: '#fffbeb',
  info: '#2563eb',
  infoLight: '#eff6ff',
} as const;

/** From fonts.css — Inter + Plus Jakarta Sans */
export const fonts = {
  heading: `'Plus Jakarta Sans', Inter, 'Segoe UI', Arial, sans-serif`,
  body: `'Inter', 'Segoe UI', Arial, sans-serif`,
} as const;

/** Common radii from components.css */
export const radii = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
} as const;

export const layout = {
  topNavHeight: 52,
} as const;

export type ColorToken = keyof typeof colors;
