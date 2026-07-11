'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { HeroAsciiMorph } from '@/components/hero-ascii-morph';
import { ArrowUpRightIcon, GitHubIcon, PlayStoreIcon } from '@/components/icons';
import { Mockup } from '@/components/mockups';
import { projects } from '@/lib/projects';

gsap.registerPlugin(ScrollTrigger);

export function HomepageClient() {
  const heroRef = useRef<HTMLElement | null>(null);
  const majorOneRef = useRef<HTMLElement | null>(null);
  const majorTwoRef = useRef<HTMLElement | null>(null);
  const minorRef = useRef<HTMLElement | null>(null);
  const minorConstraintsRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const majorProjects = useMemo(() => projects.filter((project) => project.tier === 'major'), []);
  const minorProjects = useMemo(() => projects.filter((project) => project.tier === 'minor'), []);

  const scatterPositions = useMemo(() => [
    { left: '4%', top: '15%', rotate: -3 },
    { left: '36%', top: '35%', rotate: 2 },
    { left: '68%', top: '10%', rotate: -2 },
  ], []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      lerp: 0.08,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const hero = heroRef.current;
    const majorOne = majorOneRef.current;
    const majorTwo = majorTwoRef.current;
    const minor = minorRef.current;
    const closing = closingRef.current;

    const triggers: ScrollTrigger[] = [];

    if (hero) {
      const heroText = hero.querySelector('[data-hero-text]');
      const heroEyebrow = hero.querySelector('[data-hero-eyebrow]');
      const heroKeycap = hero.querySelector('[data-hero-keycap]');
      gsap.set(heroText, { opacity: 1, y: 0, scale: 1 });
      gsap.set(heroEyebrow, { opacity: 1, x: 0 });
      gsap.set(heroKeycap, { opacity: 1, x: 0, y: 0 });
      triggers.push(
        ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: '+=110%',
          scrub: 0.45,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(heroText, { opacity: 1 - progress * 1.05, y: progress * 56, scale: 1 - progress * 0.06 });
            gsap.set(heroEyebrow, { opacity: 1 - progress * 0.65, x: progress * 32 });
            gsap.set(heroKeycap, { opacity: 1, x: progress * -20, y: progress * 10 });
          },
        }),
      );
    }

    if (majorOne) {
      const title = majorOne.querySelector('[data-project-title]');
      const copy = majorOne.querySelector('[data-project-copy]');
      const mock = majorOne.querySelector('[data-project-mockup]');
      const meta = majorOne.querySelector('[data-project-meta]');
      const numeral = majorOne.querySelector('[data-project-numeral]');
      gsap.set([title, copy, mock, meta], { opacity: 0 });
      gsap.set(title, { x: -60 });
      gsap.set(copy, { x: -24 });
      gsap.set(mock, { rotate: 11, scale: 0.86, x: 100, y: 52 });
      gsap.set(numeral, { opacity: 0.08, scale: 1 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: majorOne,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.5,
        },
      });
      timeline
        .to(title, { opacity: 1, x: 0, duration: 0.3 }, 0)
        .to(copy, { opacity: 1, x: 0, duration: 0.28 }, 0.08)
        .to(meta, { opacity: 1, duration: 0.24 }, 0.1)
        .to(mock, { opacity: 1, rotate: 0, scale: 1, x: 0, y: 0, duration: 0.42 }, 0.04)
        .to(numeral, { opacity: 0.06, scale: 1.02, duration: 0.42 }, 0);
      triggers.push(timeline.scrollTrigger as ScrollTrigger);
    }

    if (majorTwo) {
      const title = majorTwo.querySelector('[data-project-title]');
      const copy = majorTwo.querySelector('[data-project-copy]');
      const mock = majorTwo.querySelector('[data-project-mockup]');
      const meta = majorTwo.querySelector('[data-project-meta]');
      const numeral = majorTwo.querySelector('[data-project-numeral]');
      gsap.set([title, copy, mock, meta], { opacity: 0 });
      gsap.set(title, { x: 52 });
      gsap.set(copy, { x: 24 });
      gsap.set(mock, { rotate: -9, scale: 0.9, x: -92, y: 46 });
      gsap.set(numeral, { opacity: 0.08, scale: 1 });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: majorTwo,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.5,
        },
      });
      timeline
        .to(title, { opacity: 1, x: 0, duration: 0.3 }, 0)
        .to(copy, { opacity: 1, x: 0, duration: 0.28 }, 0.08)
        .to(meta, { opacity: 1, duration: 0.24 }, 0.1)
        .to(mock, { opacity: 1, rotate: 0, scale: 1, x: 0, y: 0, duration: 0.42 }, 0.04)
        .to(numeral, { opacity: 0.06, scale: 1.02, duration: 0.42 }, 0);
      triggers.push(timeline.scrollTrigger as ScrollTrigger);
    }

    if (minor) {
      const items = minor.querySelectorAll('[data-minor-item]');
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: minor,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.45,
        },
      });
      timeline.fromTo(
        items,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.28 },
        0,
      );
      triggers.push(timeline.scrollTrigger as ScrollTrigger);
    }

    if (closing) {
      const text = closing.querySelector('[data-closing-copy]');
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: closing,
          start: 'top 82%',
          end: 'bottom 20%',
          scrub: 0.45,
        },
      });
      timeline.fromTo(text, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.24 }, 0);
      triggers.push(timeline.scrollTrigger as ScrollTrigger);
    }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      triggers.length = 0;
    };
  }, [shouldReduceMotion]);

  const minorItems = minorProjects.slice(0, 3);

  return (
    <div className="noise">
      <section
        ref={heroRef}
        className="scene-grid relative flex min-h-[calc(100svh-53px)] flex-col justify-between overflow-hidden border-b border-border"
      >
        <div className="relative mx-auto grid w-full max-w-[var(--page-max)] grow grid-cols-1 md:grid-cols-[1fr_260px] md:divide-x md:divide-border px-0">
          <div className="flex flex-col justify-start px-5 py-8 md:px-8 md:py-14">
            <div>
              <div data-hero-eyebrow className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.28em] text-accent md:text-[0.72rem]">
                FOR TEAMS WITHOUT A TECH CO-FOUNDER
              </div>
              <div data-hero-text className="mt-4 max-w-[56rem]">
                <h1 className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold leading-[0.92] tracking-display text-ink">
                  Your idea needs code.
                  <span className="mt-2.5 block w-fit max-w-full bg-accent px-3 py-1 text-paper tracking-tighter md:mt-3">
                    We&apos;re the ones who write it.
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="hidden flex-col justify-start p-6 font-mono text-[0.68rem] uppercase tracking-[0.16em] md:flex py-8 md:py-14 space-y-12">
            <div>
              <span className="block text-muted font-bold">SERVICES_INTEGRATED</span>
              <div className="mt-4 space-y-4">
                <div className="border-b border-border/40 pb-2">
                  <span className="block text-accent text-[0.6rem] tracking-[0.2em]">01 / WEBSITES</span>
                  <span className="mt-1 block text-ink text-[0.65rem]">Next.js / React / WASM</span>
                </div>
                <div className="border-b border-border/40 pb-2">
                  <span className="block text-accent text-[0.6rem] tracking-[0.2em]">02 / MOBILE APPS</span>
                  <span className="mt-1 block text-ink text-[0.65rem]">Kotlin / Compose / Android</span>
                </div>
                <div>
                  <span className="block text-accent text-[0.6rem] tracking-[0.2em]">03 / AI & ML</span>
                  <span className="mt-1 block text-ink text-[0.65rem]">Go gRPC / PyTorch / CUDA</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border/80 pt-4">
              <span className="block text-muted font-bold">STUDIO_STATEMENT</span>
              <p className="mt-2 text-[0.65rem] leading-4 text-muted normal-case font-sans tracking-normal">
                A three-person engineering studio covering Android, full-stack web, and AI. Small enough to ship in weeks, skilled enough to bypass the learning curve.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-border">
          <div
            data-hero-keycap
            className="flex h-[34vh] w-full min-h-[220px] items-center overflow-hidden bg-card/20 md:h-[40vh]"
          >
            <HeroAsciiMorph />
          </div>
        </div>
      </section>

      {/* Major 01 - NewAgeIT */}
      <section
        ref={majorOneRef}
        className="relative flex min-h-[90vh] items-center overflow-hidden border-b border-border"
      >
        <div data-project-numeral className="pointer-events-none absolute right-4 top-4 z-0 select-none font-display text-[14rem] font-bold leading-none tracking-display text-ink/[0.03] md:right-12 md:top-6 md:text-[20rem]">
          01
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-[var(--page-max)] gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-8 md:py-20">
          <div className="relative max-w-[42rem]">
            <div data-project-meta className="mb-6 flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-accent">
              <span>01 / 05 // CASE STUDY</span>
            </div>
            <Link href={`/projects/${majorProjects[0].slug}`} className="group/title block w-fit">
              <div data-project-title className="font-display text-5xl font-bold tracking-display transition-colors duration-200 group-hover/title:text-accent md:text-7xl">
                {majorProjects[0].title}
              </div>
            </Link>
            <p data-project-copy className="mt-6 max-w-[36rem] text-base leading-7 text-muted md:text-lg md:leading-8">
              {majorProjects[0].tagline}
            </p>

            <div className="mt-8 space-y-4 border-t border-b border-border py-6">
              <div className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-4 font-mono text-[0.72rem] tracking-[0.16em]">
                <span className="uppercase text-accent">Stack</span>
                <span className="text-muted">{majorProjects[0].tech.join(' // ')}</span>
              </div>
              <div className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-4 font-mono text-[0.72rem] tracking-[0.16em]">
                <span className="uppercase text-accent">Core Specs</span>
                <span className="text-muted">sub-45ms latency // WebRTC stream multiplexing // rust-wasm decoders</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/projects/${majorProjects[0].slug}`}
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-accent bg-accent px-5 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-paper transition-transform duration-200 ease-smooth hover:scale-[1.02]"
              >
                Inspect brief
                <ArrowUpRightIcon />
              </Link>
              <a
                href={majorProjects[0].links?.[1]?.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-border px-5 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink transition-colors duration-200 ease-smooth hover:border-ink/40"
              >
                <GitHubIcon />
                GitHub
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>
          <Link
            href={`/projects/${majorProjects[0].slug}`}
            data-project-mockup
            className="block origin-center will-change-transform transition-transform duration-300 hover:scale-[1.015]"
          >
            <Mockup type="laptop" label="NewAgeIT Live Operations Console" />
          </Link>
        </div>
      </section>

      {/* Major 02 - GeoWav */}
      <section
        ref={majorTwoRef}
        className="relative flex min-h-[90vh] items-center overflow-hidden border-b border-border"
      >
        <div data-project-numeral className="pointer-events-none absolute bottom-4 left-4 z-0 select-none font-display text-[14rem] font-bold leading-none tracking-display text-ink/[0.03] md:bottom-6 md:left-12 md:text-[20rem]">
          02
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-[var(--page-max)] gap-10 px-5 py-16 md:grid-cols-[0.85fr_1.15fr] md:items-center md:px-8 md:py-20">
          <Link
            href={`/projects/${majorProjects[1].slug}`}
            data-project-mockup
            className="order-2 block origin-center will-change-transform transition-transform duration-300 hover:scale-[1.015] md:order-1"
          >
            <Mockup
              type="phone"
              label="GeoWav / App preview"
              imageSrc={majorProjects[1].screenshots?.[0]}
              imageAlt="GeoWav app screen"
            />
          </Link>
          <div className="order-1 max-w-[42rem] md:order-2 md:justify-self-start">
            <div data-project-meta className="mb-6 flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-accent">
              <span>02 / 05 // CASE STUDY</span>
            </div>
            <Link href={`/projects/${majorProjects[1].slug}`} className="group/title block w-fit">
              <div data-project-title className="font-display text-5xl font-bold tracking-display transition-colors duration-200 group-hover/title:text-accent md:text-7xl">
                {majorProjects[1].title}
              </div>
            </Link>
            <p data-project-copy className="mt-6 max-w-[36rem] text-base leading-7 text-muted md:text-lg md:leading-8">
              {majorProjects[1].tagline}
            </p>
            <div className="mt-8 space-y-4 border-t border-b border-border py-6">
              <div className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-4 font-mono text-[0.72rem] tracking-[0.16em]">
                <span className="uppercase text-accent">Stack</span>
                <span className="text-muted">{majorProjects[1].tech.join(' // ')}</span>
              </div>
              <div className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-4 font-mono text-[0.72rem] tracking-[0.16em]">
                <span className="uppercase text-accent">Performance</span>
                <span className="text-muted">under 1.8% battery usage per hour // delta coordinates routing</span>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/projects/${majorProjects[1].slug}`}
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-accent bg-accent px-5 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-paper transition-transform duration-200 ease-smooth hover:scale-[1.02]"
              >
                Inspect brief
                <ArrowUpRightIcon />
              </Link>
              <a
                href={majorProjects[1].links?.[0]?.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-border px-5 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink transition-colors duration-200 ease-smooth hover:border-ink/40"
              >
                <PlayStoreIcon />
                Live app
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Minor Projects */}
      <section ref={minorRef} className="relative overflow-hidden border-b border-border bg-paper bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:40px_40px]">
        <div ref={minorConstraintsRef} className="relative mx-auto w-full max-w-[var(--page-max)] px-5 py-16 md:px-8 md:py-24 md:min-h-[750px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-border md:border-none pb-8 md:pb-0 pointer-events-none relative z-10">
            <h2 className="max-w-[32rem] font-display text-4xl font-bold tracking-display md:text-5xl bg-paper/80 backdrop-blur-sm p-2 -ml-2 rounded-lg">
              More projects.
            </h2>
            <div className="mt-4 md:mt-0 bg-paper/80 backdrop-blur-sm p-2 rounded-lg">
              <p 
                className="text-lg text-accent tracking-wide normal-case"
                style={{ fontFamily: "'Brush Script MT', 'Apple Chancery', 'Comic Sans MS', cursive" }}
              >
                interactive — drag cards to explore
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:mt-0 md:block relative z-20">
            {minorProjects.map((project, index) => {
              const pos = scatterPositions[index % scatterPositions.length];
              return (
                <div 
                  key={project.slug}
                  data-minor-item 
                  className={isMobile ? "w-full" : "absolute"} 
                  style={isMobile ? {} : { left: pos.left, top: pos.top }}
                >
                  <motion.div
                    drag={!isMobile}
                    dragConstraints={minorConstraintsRef}
                    dragElastic={0.1}
                    whileDrag={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 50 }}
                    style={{ 
                      rotate: isMobile ? 0 : pos.rotate, 
                      width: isMobile ? '100%' : '340px' 
                    }}
                    className="group border border-border bg-card p-6 flex flex-col justify-between min-h-[300px] transition-colors duration-200 hover:border-accent/50 md:cursor-grab md:active:cursor-grabbing select-none shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                  >
                    <div className="pointer-events-none">
                      <div className="flex justify-between items-center font-mono text-[0.65rem] tracking-[0.2em] text-accent uppercase">
                        <span>[SLOT 0{index + 3}]</span>
                        <span>{project.category ?? 'MODULE'}</span>
                      </div>
                      <h3 className="mt-6 font-display text-3xl font-bold tracking-display group-hover:text-accent transition-colors duration-200">{project.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted">{project.tagline}</p>
                    </div>

                    <div className="mt-8">
                      <div className="flex flex-wrap gap-2 text-[0.65rem] font-mono uppercase tracking-[0.16em] text-muted border-t border-border/60 pt-4 mb-5 pointer-events-none">
                        {project.tech.map((tag) => (
                          <span key={tag} className="border border-border/80 px-2 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="inline-flex w-fit items-center gap-2 rounded border border-border/60 bg-paper/50 px-4 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink transition-colors hover:border-accent hover:text-accent md:cursor-pointer"
                      >
                        OPEN PROJECT
                        <ArrowUpRightIcon />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing / Contact CTA */}
      <section ref={closingRef} className="relative flex min-h-[80vh] items-center">
        <div className="mx-auto grid w-full max-w-[var(--page-max)] gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-end md:px-8 md:py-24">
          <div className="flex flex-col gap-8">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-accent">
              [COMMUNICATIONS ENCLAVE]
            </div>
            <h2 data-closing-copy className="max-w-[32rem] font-display text-5xl font-bold leading-[0.95] tracking-display md:text-7xl">
              Ready when the content is.
            </h2>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center rounded-xl border border-accent bg-accent px-6 py-4 font-mono text-[0.75rem] uppercase tracking-[0.2em] text-paper transition-transform duration-200 ease-smooth hover:scale-[1.02]"
            >
              Initialize inquiry
              <ArrowUpRightIcon />
            </Link>
          </div>

          <div className="grid gap-8 border-t border-border pt-8 md:border-t-0 md:pt-0 font-mono text-[0.72rem] uppercase tracking-[0.18em]">
            <div className="grid gap-2 border-b border-border/60 pb-4">
              <span className="text-accent">DIRECT DIRECTORY</span>
              <span className="text-base text-ink lowercase tracking-normal font-sans font-medium">hello@trevalt.com</span>
            </div>

            <div className="grid gap-2 border-b border-border/60 pb-4">
              <span className="text-accent">TELEMETRY REGISTRY</span>
              <span className="text-sm text-muted leading-6">
                01 NewAgeIT // 02 GeoWav // 03 ParkEase // 04 Aether // 05 NoteStack
              </span>
            </div>

            <div className="grid gap-2">
              <span className="text-accent">STUDIO METRICS</span>
              <span className="text-muted">
                CORES: 3 // EST. 2026 // PIPELINES: INTEGRATED
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
