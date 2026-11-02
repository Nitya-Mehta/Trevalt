import Link from 'next/link';
import Image from 'next/image';
import { LoadingReveal } from '@/components/loading-reveal';
import { AuthNavLinks } from '@/components/auth-nav-links';

const nav = [
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="trevalt-shell min-h-screen bg-paper text-ink">
      <LoadingReveal />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="site-header-inner mx-auto max-w-[var(--page-max)] px-5 md:px-8">
          <Link href="/" className="site-brand" aria-label="Trevalt home">
            <Image src="/images/mascot/logo.png" alt="" width={30} height={30} className="site-brand-mark" priority />
            <span>Trevalt</span>
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <AuthNavLinks />
          </nav>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="mx-auto max-w-[var(--page-max)] px-5 md:px-8">
          <div className="site-footer-bottom">
            <span>© {new Date().getFullYear()} Trevalt</span>
            <div className="site-footer-links">
              <a href="mailto:trevalt.tech@gmail.com">Email</a>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
