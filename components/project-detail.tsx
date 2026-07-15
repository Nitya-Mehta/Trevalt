'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mockup } from '@/components/mockups';
import { ArrowUpRightIcon, GitHubIcon, PlayStoreIcon } from '@/components/icons';
import type { Project } from '@/lib/projects';

export function ProjectDetail({ project }: { project: Project }) {
  const screenshots = project.screenshots ?? [];

  return (
    <section className="mx-auto w-full max-w-[var(--page-max)] px-5 pt-6 pb-12 md:px-8 md:pt-10 md:pb-16">
      <div className="max-w-[46rem]">
        {project.thumbnail ? (
          <div className="relative h-20 w-20 mb-6 overflow-hidden rounded-2xl border border-border bg-[#080706] flex items-center justify-center shadow-md">
            <Image
              src={project.thumbnail}
              alt={`${project.title} logo`}
              fill
              className="object-contain p-3"
            />
          </div>
        ) : null}
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-muted">
          {project.category ?? 'Case study'}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-display md:text-5xl lg:text-7xl">{project.title}</h1>
        <p className="mt-5 max-w-[42rem] text-lg text-muted">{project.tagline}</p>
        {project.developer ? (
          <p className="mt-3 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-muted">
            Developer: {project.developer}
          </p>
        ) : null}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12"
      >
        {screenshots.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              <div className="rounded-[2rem] border border-border bg-card p-3">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-paper">
                  <div className="border-b border-white/10 px-4 py-3 text-[0.7rem] font-mono uppercase tracking-[0.2em] text-muted">
                    {project.title} / Screenshots
                  </div>
                  <div className="relative aspect-[9/16] bg-paper">
                    <Image
                      src={screenshots[0]}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-xl border border-border px-3 py-2 text-[0.75rem] font-mono uppercase tracking-[0.18em] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {screenshots.slice(1, 5).map((src, index) => (
                  <div key={src} className="overflow-hidden rounded-[1.5rem] border border-border bg-card">
                    <div className="relative aspect-[9/16] bg-paper">
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${index + 2}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 240px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="border border-border bg-card p-5">
                  <h2 className="font-display text-2xl font-bold tracking-display">Story</h2>
                  <p className="mt-3 text-muted">{project.story ?? project.description}</p>
                </article>
                <article className="border border-border bg-card p-5">
                  <h2 className="font-display text-2xl font-bold tracking-display">Links</h2>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.links?.map((link, index) =>
                      link.label === 'Get it on Google Play' ? (
                        <a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="relative inline-flex w-fit items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-paper shadow-[0_0_15px_-3px_var(--accent)] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:bg-accent hover:shadow-[0_0_25px_-3px_var(--accent)] active:scale-95"
                        >
                          <PlayStoreIcon />
                          {link.label}
                          <ArrowUpRightIcon />
                        </a>
                      ) : (
                        <a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="relative inline-flex w-fit items-center gap-2 overflow-hidden rounded-full border border-border bg-transparent px-6 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-accent/40 hover:bg-accent/5 hover:text-accent active:scale-95"
                        >
                          {link.label === 'GitHub' ? <GitHubIcon /> : null}
                          {link.label}
                          <ArrowUpRightIcon />
                        </a>
                      ),
                    )}
                  </div>
                </article>
              </div>
            </div>
          </div>
        ) : (
          <Mockup type={project.mockupType === 'laptop' ? 'laptop' : 'phone'} label="Project preview" />
        )}
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="border border-border bg-card p-6"
        >
          <h2 className="font-display text-2xl font-bold tracking-display">Features</h2>
          <ul className="mt-4 space-y-3 text-muted">
            {(project.features ?? ['Feature one', 'Feature two', 'Feature three']).map(
              (feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-[0.45rem] h-2 w-2 rounded-full bg-ink/70" />
                  <span>{feature}</span>
                </li>
              ),
            )}
          </ul>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="border border-border bg-card p-6"
        >
          <h2 className="font-display text-2xl font-bold tracking-display">Stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span key={tag} className="rounded-xl border border-border px-3 py-2 text-[0.75rem] font-mono uppercase tracking-[0.18em] text-muted">
                {tag}
              </span>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
