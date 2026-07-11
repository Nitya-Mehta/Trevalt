'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function LoadingReveal() {
  // Bypassed for homepage startup; kept in codebase to use as a submit/request buffer later
  return null;

  /*
  const pathname = usePathname();
  const [shouldRender, setShouldRender] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Only run on the main home screen ('/')
    if (pathname !== '/') {
      setShouldRender(false);
      setReady(true);
      return;
    }

    setShouldRender(true);
    setReady(false);

    let cancelled = false;
    let timeoutId = 0;
    const startedAt = performance.now();
    const minimumDuration = 2800; // 2.8 seconds matching video playback duration

    const finish = () => {
      if (cancelled) return;
      const remaining = Math.max(0, minimumDuration - (performance.now() - startedAt));
      timeoutId = window.setTimeout(() => {
        setReady(true);
      }, remaining);
    };

    const waitForLoad =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
          window.addEventListener('load', () => resolve(), { once: true });
        });
    const waitForFonts = 'fonts' in document ? document.fonts.ready : Promise.resolve();

    Promise.all([waitForLoad, waitForFonts]).then(finish);

    const failSafeId = window.setTimeout(() => {
      setReady(true);
    }, 7000);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      window.clearTimeout(failSafeId);
    };
  }, [pathname]);

  // Completely unmount the loading overlay from the DOM 1 second after fade-out completes
  useEffect(() => {
    if (ready && pathname === '/') {
      const id = window.setTimeout(() => {
        setShouldRender(false);
      }, 1000); // 1000ms ensures the 800ms CSS fade transition completes
      return () => window.clearTimeout(id);
    }
  }, [ready, pathname]);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <div className={`loading-reveal${ready ? ' is-ready' : ''}`} aria-hidden="true" />
      <div className={`loading-skeleton${ready ? ' is-ready' : ''}`} aria-hidden="true">
        <video
          src="/skeleton.mp4"
          autoPlay
          muted
          playsInline
          className="w-[200px] h-[200px] object-contain opacity-90"
        />
      </div>
    </>
  );
  */
}
