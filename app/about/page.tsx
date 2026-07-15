'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell';
import { FounderCard } from '@/components/founder-card';
import { founders } from '@/lib/founders';

export default function AboutPage() {
  const [hoveredFounder, setHoveredFounder] = useState<string | null>(null);
  const [flippedStates, setFlippedStates] = useState<Record<number, boolean>>({});

  const handleMouseEnter = (index: number) => {
    setFlippedStates(prev => ({ ...prev, [index]: true }));
  };

  const handleMouseLeave = (index: number) => {
    setFlippedStates(prev => ({ ...prev, [index]: false }));
  };

  const handleToggleFlip = (index: number) => {
    setFlippedStates(prev => ({ ...prev, [index]: !prev[index] }));
  };

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
          {founders.map((founder, index) => {
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
                <div
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  className="w-full relative mt-8 lg:mt-12"
                >
                  {/* Circular Portrait on Corner */}
                  <div
                    className={`absolute w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-[6px] border-[#080706] shadow-2xl z-40 bg-card flex items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-110 hover:rotate-[8deg] ${
                      index % 2 === 0 ? '-top-8 -right-4 md:-top-12 md:-right-8' : '-bottom-8 -right-4 md:-bottom-12 md:-right-8'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFlip(index);
                    }}
                  >
                    <Image
                      src={founder.name.includes('Nitya') ? "/images/nitya.jpg" : founder.name.includes('Aarav') ? "/images/aarav.jpg" : "/images/devanshu.jpg"}
                      alt={founder.name}
                      fill
                      sizes="128px"
                      className="transition-all duration-700 ease-out object-cover filter saturate-[0.85] contrast-[1.1] hover:saturate-100"
                    />
                  </div>

                  {/* Business Card */}
                  <FounderCard
                    founder={founder}
                    isFlipped={flippedStates[index]}
                    onToggleFlip={() => handleToggleFlip(index)}
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
                  <td className="py-4 text-muted">React // Next.js // TypeScript // MERN</td>
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
