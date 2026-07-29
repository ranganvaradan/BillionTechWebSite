import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouter } from './AppRouter';
import { theme } from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}
