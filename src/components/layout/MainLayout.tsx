import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { Footer } from './Footer';
import { SkipLink } from './SkipLink';
import { ScrollManager } from './ScrollManager';
import { PageMeta } from '@/components/seo/PageMeta';
import { colors } from '@/theme/tokens';

export function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: colors.white }}>
      <SkipLink />
      <PageMeta />
      <ScrollManager />
      <AppHeader />
      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{
          flex: 1,
          outline: 'none',
          // Offset sticky header when scrolling to in-page anchors
          '& section[id]': {
            scrollMarginTop: 72,
          },
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
