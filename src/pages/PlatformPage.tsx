import { Navigate, useParams } from 'react-router-dom';
import { getPlatformBySlug } from '@/data/platforms';
import { PlatformPageTemplate } from '@/components/platform/PlatformPageTemplate';

export function PlatformPage() {
  const { platformId } = useParams<{ platformId: string }>();
  const platform = platformId ? getPlatformBySlug(platformId) : undefined;

  if (!platform) {
    return <Navigate to="/" replace />;
  }

  return <PlatformPageTemplate platform={platform} />;
}
