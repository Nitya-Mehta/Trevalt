'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';
import { ArrowUpRightIcon, GitHubIcon } from '@/components/icons';
import { projects } from '@/lib/projects';
import { ZoomableImage } from '@/components/zoomable-image';

const project = projects.find((p) => p.slug === 'geowav');

export default function GeoWavPage() {
  if (!project) return null;

  const screenshots = project.screenshots || [];

  return (
    <SiteShell>
      <div className="min-h-screen pb-32">

        {/* HERO SECTION */}
        <section className="relative w-full max-w-[var(--page-max)] mx-auto px-5 pt-12 pb-24 md:px-8 md:pt-16 md:pb-32 border-b border-border">
          <div className="flex flex-col gap-16 items-center text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              {project.thumbnail && (
                <div className="relative h-20 w-20 mb-8 overflow-hidden rounded-[1.5rem] border border-border bg-card flex items-center justify-center shadow-[0_0_30px_-10px_var(--accent)]">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} logo`}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </div>
              )}
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-accent">
                  [ {project.category || 'CASE STUDY'} ]
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-display font-bold text-ink">
                {project.title}
              </h1>

              <p className="mt-8 text-lg text-muted leading-relaxed max-w-3xl">
                {project.story || project.description}
              </p>

              <div className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted flex items-center gap-2 border-b-2 border-accent pb-2">
                BUILT BY: <span className="text-ink font-bold">{project.developer}</span>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl">
                {project.tech.map((tech) => (
                  <span key={tech} className="font-mono text-[0.65rem] uppercase tracking-widest text-muted border border-border/50 rounded-full px-3 py-1 bg-card">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-4">
                {project.links?.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    className={`px-8 py-3.5 rounded-full font-bold tracking-wide flex items-center gap-2 text-sm transition-colors ${link.label.toLowerCase().includes('play') || link.label.toLowerCase().includes('live')
                        ? 'bg-accent hover:bg-accent/80 text-white'
                        : 'bg-card hover:bg-white/5 text-ink border border-border'
                      }`}
                  >
                    {link.label} {link.label.toLowerCase().includes('github') ? <GitHubIcon /> : <ArrowUpRightIcon />}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FULL BLEED HORIZONTAL SCROLL */}
        <section className="w-full border-b border-border pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-8 hide-scrollbar px-4 md:px-8"
            style={{ scrollBehavior: 'smooth' }}
          >
            {screenshots.map((src, idx) => (
              <div key={idx} className="relative flex-none w-[60vw] sm:w-[35vw] md:w-[25vw] lg:w-[18vw] xl:w-[15vw] snap-center rounded-[2rem] overflow-hidden shadow-2xl bg-black">
                <ZoomableImage
                  src={src}
                  alt={`${project.title} UI Preview ${idx + 1}`}
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </motion.div>
        </section>

        {/* README STYLE DOCUMENTATION */}
        <section className="w-full max-w-[var(--page-max)] mx-auto px-5 md:px-8 py-24">
          <div className="max-w-[48rem]">

            {/* FEATURES */}
            {project.features && project.features.length > 0 && (
              <>
                <h2 className="font-display text-3xl font-bold tracking-tight text-ink mb-8">Features</h2>
                <ul className="space-y-4">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex gap-4 items-start">
                      <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                      <div>
                        <span className="text-ink font-semibold text-lg">{feature.split(/—| - /)[0].trim()}</span>
                        {feature.split(/—| - /).length > 1 && (
                          <span className="text-muted text-sm block mt-1">
                            {feature.split(/—| - /).slice(1).join(' - ').trim()}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {/* ARCHITECTURE */}
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink mt-16 mb-8">Architecture</h2>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <span className="text-ink font-semibold text-lg">MVVM & Clean Architecture</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <span className="text-ink font-semibold text-lg">Repository Pattern</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <span className="text-ink font-semibold text-lg">StateFlow & Kotlin Flow</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <span className="text-ink font-semibold text-lg">Dependency Injection with Hilt</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <span className="text-ink font-semibold text-lg">Reactive UI with Jetpack Compose</span>
              </li>
            </ul>

            {/* PERFORMANCE OPTIMIZATIONS */}
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink mt-16 mb-8">Performance Optimizations</h2>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">01.</span>
                <span className="text-ink font-semibold text-lg">Animated marker interpolation & stable camera updates</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">02.</span>
                <span className="text-ink font-semibold text-lg">Marker bitmap caching & smart location handling</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">03.</span>
                <span className="text-ink font-semibold text-lg">Optimized Firebase synchronization</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">04.</span>
                <span className="text-ink font-semibold text-lg">Efficient StateFlow UI updates to reduce recompositions</span>
              </li>
            </ul>

            {/* ROADMAP */}
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink mt-16 mb-8">Roadmap</h2>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <span className="text-ink font-semibold text-lg">Offline-first support & battery improvements</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <span className="text-ink font-semibold text-lg">Enhanced place intelligence & richer movement insights</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
