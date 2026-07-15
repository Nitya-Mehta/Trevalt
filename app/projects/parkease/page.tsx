'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';
import { ArrowUpRightIcon, GitHubIcon } from '@/components/icons';
import { projects } from '@/lib/projects';

const project = projects.find((p) => p.slug === 'parkease');

export default function ParkEasePage() {
  if (!project) return null;

  const screenshots = [
    '/projects/parkease/01.png',
    '/projects/parkease/02.png',
    '/projects/parkease/03.png',
    '/projects/parkease/04.png'
  ];

  return (
    <SiteShell>
      <div className="min-h-screen pb-32">

        {/* HERO SECTION */}
        <section className="relative w-full max-w-[var(--page-max)] mx-auto px-5 py-24 md:px-8 md:py-32 border-b border-border">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-accent">
                  [ {project.category || 'CASE STUDY'} ]
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-display font-bold text-ink">
                {project.title}
              </h1>

              <p className="mt-8 text-lg text-muted leading-relaxed">
                {project.story || project.description}
              </p>

              <div className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted flex items-center gap-2 border-l-2 border-accent pl-4">
                BUILT BY: <span className="text-ink font-bold">{project.developer}</span>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="font-mono text-[0.65rem] uppercase tracking-widest text-muted border border-border/50 rounded-full px-3 py-1 bg-card">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                {project.links?.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    className={`px-8 py-3.5 rounded-full font-bold tracking-wide flex items-center gap-2 text-sm transition-colors ${link.label.toLowerCase().includes('live')
                        ? 'bg-accent hover:bg-accent/80 text-white'
                        : 'bg-card hover:bg-white/5 text-ink border border-border'
                      }`}
                  >
                    {link.label} {link.label.toLowerCase().includes('github') ? <GitHubIcon /> : <ArrowUpRightIcon />}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Primary Image Thumbnail */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-border shadow-2xl bg-card"
            >
              {/* Using standard img tags to gracefully handle missing files during dev */}
              <img
                src={screenshots[0]}
                alt={`${project.title} UI Preview`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* SMALLER IMAGE SHOWCASE GRID */}
        <section className="w-full max-w-[var(--page-max)] mx-auto px-5 md:px-8 py-24 border-b border-border">
          <div className="grid md:grid-cols-3 gap-6">
            {screenshots.slice(1).map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="w-full rounded-2xl overflow-hidden border border-border bg-card shadow-lg relative aspect-[4/3] group"
              >
                <div className="absolute inset-0 bg-accent/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                <img
                  src={src}
                  alt={`${project.title} Screenshot ${index + 2}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
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

            {/* TECH STACK */}
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink mt-16 mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="font-mono text-[0.7rem] uppercase tracking-widest text-muted border border-border/50 rounded bg-paper px-3 py-1">
                  {tech}
                </span>
              ))}
            </div>

            {/* LOCAL SETUP */}
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink mt-16 mb-6">Local Setup</h2>
            <ol className="space-y-6 text-muted text-lg">
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">01.</span>
                <div>Create and activate a virtual environment.</div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">02.</span>
                <div className="w-full">
                  Install dependencies:
                  <pre className="mt-4 bg-[#080706] border border-border rounded-xl p-6 font-mono text-[0.85rem] text-ink overflow-x-auto">
                    <code>pip install -r requirements.txt</code>
                  </pre>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">03.</span>
                <div>Create a <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm mx-1">.env</code> file in the project root with the required environment variables.</div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">04.</span>
                <div className="w-full">
                  Run migrations:
                  <pre className="mt-4 bg-[#080706] border border-border rounded-xl p-6 font-mono text-[0.85rem] text-ink overflow-x-auto">
                    <code>python manage.py migrate</code>
                  </pre>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">05.</span>
                <div className="w-full">
                  Start the development server:
                  <pre className="mt-4 bg-[#080706] border border-border rounded-xl p-6 font-mono text-[0.85rem] text-ink overflow-x-auto">
                    <code>python manage.py runserver</code>
                  </pre>
                </div>
              </li>
            </ol>

            {/* DEPLOYMENT & NOTES */}
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink mt-16 mb-6">Deployment & Notes</h2>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div className="text-muted text-lg">This project is configured for deployment on Vercel with static files collected via WhiteNoise.</div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div className="text-muted text-lg">SQLite is fine for local development, but production should use PostgreSQL.</div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div className="text-muted text-lg">Do not commit <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm mx-1">.env</code>, <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm mx-1">db.sqlite3</code>, or virtual environment folders to GitHub.</div>
              </li>
            </ul>

          </div>
        </section>

      </div>
    </SiteShell>
  );
}
