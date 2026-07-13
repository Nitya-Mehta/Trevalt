import Link from 'next/link';
import Image from 'next/image';
import { LoadingReveal } from '@/components/loading-reveal';
import { AuthNavLinks } from '@/components/auth-nav-links';

const nav = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <LoadingReveal />
      <header className="border-b border-border/100">
        <div className="mx-auto flex max-w-[var(--page-max)] items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-7 h-7 overflow-hidden rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/mascot/logo.png"
                alt="Trevalt Mascot"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="font-display text-sm uppercase tracking-[0.24em] text-ink transition-colors duration-200 group-hover:text-accent">
              Trevalt
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-[0.75rem] font-mono uppercase tracking-[0.18em] text-muted">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors duration-200 ease-smooth hover:text-ink">
                {item.label}
              </Link>
            ))}
            <AuthNavLinks />
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border bg-[#0b0a09] py-8 md:py-10">
        <div className="mx-auto max-w-[var(--page-max)] px-5 md:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Branding Column */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative w-8 h-8 overflow-hidden rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/images/mascot/logo.png"
                    alt="Trevalt Mascot"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="font-display text-lg font-bold uppercase tracking-[0.24em] text-ink transition-colors duration-200 group-hover:text-accent">
                  Trevalt
                </span>
              </Link>
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted space-y-1.5">
                <span className="block text-accent font-bold">CORE_FOUNDERS</span>
                <div className="space-y-1 text-ink">
                  <p>01 / NITYA MEHTA</p>
                  <p>02 / AARAV HALVADIYA</p>
                  <p>03 / DEVANSHU VERMA</p>
                </div>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="space-y-4">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent font-bold block">[REGISTRY_INDEX]</span>
              <nav className="flex flex-col gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
                {nav.map((item) => (
                  <Link key={item.href} href={item.href} className="transition-colors duration-200 ease-smooth hover:text-ink w-fit">
                    {item.label}
                  </Link>
                ))}
                <Link href="/terms" className="transition-colors duration-200 ease-smooth hover:text-ink w-fit">
                  Terms
                </Link>
              </nav>
            </div>

            {/* Channels Column */}
            <div className="space-y-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
              <div>
                <span className="block text-accent font-bold">[CONNECTED_CHANNELS]</span>
                <div className="mt-3 text-ink">
                  <div className="flex flex-col border-b border-border/40 pb-2">
                    <span className="mb-1">EMAILS</span>
                    <a href="mailto:nityachintan@gmail.com" className="hover:text-accent transition-colors duration-200 lowercase tracking-normal font-sans">nityachintan@gmail.com</a>
                    <a href="mailto:aaravhalvadiya@gmail.com" className="hover:text-accent transition-colors duration-200 lowercase tracking-normal font-sans mt-0.5">aaravhalvadiya@gmail.com</a>
                    <a href="mailto:devanshuverma72@gmail.com" className="hover:text-accent transition-colors duration-200 lowercase tracking-normal font-sans mt-0.5">devanshuverma72@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border/80 pt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
            <span>© {new Date().getFullYear()} TREVALT STUDIO. ALL RIGHTS RESERVED.</span>
            <span>BUILT TO STAY LEAN, READABLE, AND DEPLOYABLE.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
