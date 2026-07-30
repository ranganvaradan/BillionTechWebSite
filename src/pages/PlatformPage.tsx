import { lazy, Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import { getPlatformBySlug } from '@/data/platforms';
import { PlatformPageTemplate } from '@/components/platform/PlatformPageTemplate';
import { colors } from '@/theme/tokens';

const FinancePlatformPage = lazy(() => import('@/pages/FinancePlatformPage'));
const FlowPlatformPage = lazy(() => import('@/pages/FlowPlatformPage'));

function PlatformFallback({ label }: { label: string }) {
  return (
    <Box
      sx={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray900,
      }}
    >
      <CircularProgress color="primary" size={36} aria-label={`Loading ${label} platform page`} />
    </Box>
  );
}

export function PlatformPage() {
  const { platformId } = useParams<{ platformId: string }>();
  const platform = platformId ? getPlatformBySlug(platformId) : undefined;

  if (!platform) {
    return <Navigate to="/" replace />;
  }

  if (platform.slug === 'finance') {
    return (
      <Suspense fallback={<PlatformFallback label="Finance" />}>
        <FinancePlatformPage platform={platform} />
      </Suspense>
    );
  }

  if (platform.slug === 'flow') {
    return (
      <Suspense fallback={<PlatformFallback label="Flow" />}>
        <FlowPlatformPage platform={platform} />
      </Suspense>
    );
  }

  return <PlatformPageTemplate platform={platform} />;
}
