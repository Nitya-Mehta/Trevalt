import { HomepageClient } from '@/components/homepage-client';
import { SiteShell } from '@/components/site-shell';

export default function HomePage() {
  return (
    <SiteShell>
      <HomepageClient />
    </SiteShell>
  );
}
