'use client';

import { SiteShell } from '@/components/site-shell';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <SiteShell>
      <section className="state-page mx-auto flex w-full max-w-[var(--page-max)] flex-col justify-center px-5 py-24 md:px-8">
        <span className="state-kicker">Something went wrong</span>
        <h1>We hit a snag.</h1>
        <p>The page could not load. Try again, or contact the studio if the problem continues.</p>
        <div className="state-actions">
          <button className="state-primary" type="button" onClick={reset}>Try again</button>
          <a className="state-secondary" href="mailto:trevalt.tech@gmail.com">Contact us</a>
        </div>
      </section>
    </SiteShell>
  );
}
