'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell';
import { FounderCard } from '@/components/founder-card';
import { founders } from '@/lib/founders';

export default function AboutPage() {
  const [hoveredFounder, setHoveredFounder] = useState<string | null>(null);
  const [isNityaFlipped, setIsNityaFlipped] = useState(false);
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-[var(--page-max)] px-5 py-12 md:px-8 md:py-20">
        <div className="border-b border-border pb-12">
          <div className="max-w-[48rem]">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-accent">
              [STUDIO_ENGINEERS // CREDENTIALS]
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-display md:text-5xl lg:text-7xl">
              Engineers. No accounts.
            </h1>
            <p className="mt-6 max-w-[38rem] text-base leading-7 text-muted md:text-lg">
              We operate as a compact three-person unit. We write code, deploy directly to production, and communicate over shared Slack channels. No account managers, no layers of overhead.
            </p>
          </div>
        </div>

        {/* Founder cards section with asymmetric layouts */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {founders.map((founder) => {
            const isHovered = hoveredFounder === founder.name;
            const isAnyHovered = hoveredFounder !== null;
            const isDimmed = isAnyHovered && !isHovered;

            return (
              <div
                key={founder.name}
                className={`flex flex-col gap-4 self-start ${founder.offset} transition-all duration-300 ease-smooth ${isHovered ? 'scale-[1.16] z-20 relative' : isDimmed ? 'opacity-15 blur-[4px] scale-[0.90]' : ''
                  }`}
                onMouseEnter={() => setHoveredFounder(founder.name)}
                onMouseLeave={() => setHoveredFounder(null)}
              >
                <div className="flex justify-between items-center border-b border-border/80 pb-2 font-mono text-[0.65rem] tracking-[0.2em] text-muted uppercase">
                  <span>[FOUNDER 0{founder.name.includes('Nitya') ? '1' : founder.name.includes('Aarav') ? '2' : '3'}]</span>
                  <span className="text-accent">{founder.role}</span>
                </div>
                {founder.name.includes('Nitya') ? (
                  <>
                    <div
                      className="relative w-full aspect-[1.6/1] rounded-[6px] overflow-hidden border border-border/80 group cursor-pointer bg-card"
                      onMouseEnter={() => setIsNityaFlipped(true)}
                      onMouseLeave={() => setIsNityaFlipped(false)}
                      onClick={() => setIsNityaFlipped(!isNityaFlipped)}
                    >
                      <Image
                        src="/images/nitya.jpg"
                        alt="Nitya Mehta"
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        priority
                        className="object-cover object-center"
                      />
                      {/* Tech feed overlay tag */}
                      <div className="absolute top-2.5 left-2.5 bg-[#080706]/85 backdrop-blur-sm px-2 py-0.5 rounded font-mono text-[0.55rem] tracking-wider text-accent border border-border/50 uppercase">
                        [FOUNDER PORTRAIT]
                      </div>
                      {/* Blueprint Corner Crosshairs */}
                      <div className="absolute inset-2 border border-accent/20 pointer-events-none rounded-[4px]">
                        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-accent" />
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-accent" />
                        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-accent" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-accent" />
                      </div>
                    </div>
                    {/* Schematic Connection Line */}
                    <div className="flex flex-col items-center -my-2.5 z-0">
                      <div className="w-[1px] h-7 bg-accent/60 border-dashed border-accent/30 border-l" />
                      <div className="w-2 h-2 rounded-full bg-accent -mt-1" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative w-full aspect-[1.6/1] rounded-[6px] overflow-hidden border border-border/80 bg-card group flex items-center justify-center p-4">
                      {/* Subtle blueprint grid background inside the avatar slot */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,85,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,85,0,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      <div className="relative w-[110px] h-[110px] transition-transform duration-300 group-hover:scale-110">
                        <Image
                          src={founder.name.includes('Aarav') ? "/images/mascot/bear_08_cool.png" : "/images/mascot/bear_06_thinking.png"}
                          alt={`${founder.name} Mascot`}
                          fill
                          sizes="110px"
                          className="object-contain"
                        />
                      </div>
                      {/* Tech feed overlay tag */}
                      <div className="absolute top-2.5 left-2.5 bg-[#080706]/85 backdrop-blur-sm px-2 py-0.5 rounded font-mono text-[0.55rem] tracking-wider text-accent border border-border/50 uppercase">
                        {founder.name.includes('Aarav') ? '[AVATAR // AAR-24]' : '[AVATAR // DEV-42]'}
                      </div>
                      {/* Blueprint Corner Crosshairs */}
                      <div className="absolute inset-2 border border-accent/15 pointer-events-none rounded-[4px]">
                        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-accent/60" />
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-accent/60" />
                        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-accent/60" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-accent/60" />
                      </div>
                    </div>
                    {/* Schematic Connection Line */}
                    <div className="flex flex-col items-center -my-2.5 z-0">
                      <div className="w-[1px] h-7 bg-accent/60 border-dashed border-accent/30 border-l" />
                      <div className="w-2 h-2 rounded-full bg-accent -mt-1" />
                    </div>
                  </>
                )}
                <div
                  onMouseEnter={() => founder.name.includes('Nitya') && setIsNityaFlipped(true)}
                  onMouseLeave={() => founder.name.includes('Nitya') && setIsNityaFlipped(false)}
                  className="w-full"
                >
                  <FounderCard
                    founder={founder}
                    isFlipped={founder.name.includes('Nitya') ? isNityaFlipped : undefined}
                    onToggleFlip={founder.name.includes('Nitya') ? () => setIsNityaFlipped(!isNityaFlipped) : undefined}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Capabilities spec sheet table */}
        <div className="mt-20 border-t border-border pt-12">
          <div className="max-w-[32rem]">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-accent">[TECHNICAL_STACK]</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-display md:text-4xl">Combined capabilities</h2>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-left font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink">
              <thead>
                <tr className="border-b border-border text-accent text-[0.65rem] tracking-[0.2em]">
                  <th className="py-4 font-bold">CAPABILITY</th>
                  <th className="py-4 font-bold">FRAMEWORKS & LANGUAGES</th>
                  <th className="py-4 font-bold text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="py-4 font-bold text-ink">Web Applications</td>
                  <td className="py-4 text-muted">React // Next.js // TypeScript // WASM</td>
                  <td className="py-4 text-right text-accent">READY</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-ink">Android Systems</td>
                  <td className="py-4 text-muted">Kotlin // Compose // Room // BLE Mesh</td>
                  <td className="py-4 text-right text-accent">READY</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-ink">AI Pipelines</td>
                  <td className="py-4 text-muted">Go // gRPC // PyTorch // CUDA</td>
                  <td className="py-4 text-right text-accent">READY</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
