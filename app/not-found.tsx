import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';

export default function NotFound() {
  return (
    <SiteShell>
      <section className="state-page mx-auto flex w-full max-w-[var(--page-max)] flex-col justify-center px-5 py-24 md:px-8">
        <span className="state-kicker">404 / Page not found</span>
        <h1>The route ends here.</h1>
        <p>That page is unavailable. Explore the work or head back to the studio.</p>
        <div className="state-actions">
          <Link className="state-primary" href="/projects">Explore projects</Link>
          <Link className="state-secondary" href="/">Back to home</Link>
        </div>
      </section>
    </SiteShell>
  );
}
