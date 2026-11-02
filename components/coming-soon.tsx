import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';

export function ComingSoon() {
  return (
    <SiteShell>
      <section className="state-page mx-auto flex w-full max-w-[var(--page-max)] flex-col justify-center px-5 py-24 md:px-8">
        <span className="state-kicker">Trevalt Studio / Portal</span>
        <h1>Coming soon.</h1>
        <p>The private workspace is temporarily unavailable. For project updates, contact the studio directly.</p>
        <div className="state-actions">
          <Link className="state-primary" href="/contact">Contact the studio</Link>
          <Link className="state-secondary" href="/projects">Explore projects</Link>
        </div>
      </section>
    </SiteShell>
  );
}
