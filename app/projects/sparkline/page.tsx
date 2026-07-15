'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';
import { ArrowUpRightIcon, GitHubIcon } from '@/components/icons';
import { projects } from '@/lib/projects';
import { ZoomableImage } from '@/components/zoomable-image';

const project = projects.find((p) => p.slug === 'sparkline');

export default function SparklinePage() {
  if (!project) return null;

  const screenshots = [
    '/projects/sparkline/01.png', // The only image provided
  ];

  return (
    <SiteShell>
      <div className="min-h-screen pb-32">

        {/* HERO SECTION */}
        <section className="relative w-full max-w-[var(--page-max)] mx-auto px-5 pt-12 pb-24 md:px-8 md:pt-16 md:pb-32 border-b border-border">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {project.thumbnail && (
                <div className="relative h-16 w-16 mb-6 overflow-hidden rounded-2xl border border-border bg-card flex items-center justify-center shadow-lg">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} logo`}
                    fill
                    sizes="64px"
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
              className="relative rounded-[2rem] overflow-hidden border border-border shadow-2xl bg-card"
            >
              <ZoomableImage
                src={screenshots[0]}
                alt={`${project.title} UI Preview`}
                className="w-full h-auto block"
              />
            </motion.div>
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
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink mt-16 mb-6">Local Development</h2>
            <ol className="space-y-6 text-muted text-lg">
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">01.</span>
                <div className="w-full">
                  Install dependencies:
                  <pre className="mt-4 bg-[#080706] border border-border rounded-xl p-6 font-mono text-[0.85rem] text-ink overflow-x-auto">
                    <code>npm install</code>
                  </pre>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">02.</span>
                <div className="w-full">
                  Run the frontend (Vite):
                  <pre className="mt-4 bg-[#080706] border border-border rounded-xl p-6 font-mono text-[0.85rem] text-ink overflow-x-auto">
                    <code>npm run dev</code>
                  </pre>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">03.</span>
                <div className="w-full">
                  Run the backend (Express API on port 3000):
                  <pre className="mt-4 bg-[#080706] border border-border rounded-xl p-6 font-mono text-[0.85rem] text-ink overflow-x-auto">
                    <code>npm run dev:server</code>
                  </pre>
                </div>
              </li>
            </ol>

            {/* ENVIRONMENT VARIABLES */}
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink mt-16 mb-6">Environment Variables</h2>
            <p className="text-muted text-lg mb-6">
              Create <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">server/.env</code> from <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">server/.env.example</code> and set:
            </p>
            <ul className="space-y-4 text-muted text-lg">
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div><code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">PORT</code>, <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">HOST</code></div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div><code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">DB_HOST</code>, <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">DB_PORT</code>, <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">DB_NAME</code>, <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">DB_USER</code>, <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">DB_PASSWORD</code></div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div><code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">DB_AUTO_CREATE=false</code> for Hostinger/managed DBs.</div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div><code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">FRONTEND_URL</code>, <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">APP_BASE_URL</code></div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div><code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">SMTP_*</code> values for password reset emails.</div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div><code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">OWNER_NAME</code>, <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">OWNER_EMAIL</code>, <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">OWNER_PASSWORD</code></div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div><code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">SEED_DEFAULT_ADMIN=false</code> to avoid demo users.</div>
              </li>
            </ul>

            {/* PRODUCTION BUILD */}
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink mt-16 mb-6">Production Build</h2>
            <ol className="space-y-6 text-muted text-lg">
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">01.</span>
                <div className="w-full">
                  Build the frontend:
                  <pre className="mt-4 bg-[#080706] border border-border rounded-xl p-6 font-mono text-[0.85rem] text-ink overflow-x-auto">
                    <code>npm run build</code>
                  </pre>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">02.</span>
                <div className="w-full">
                  Start the production server:
                  <pre className="mt-4 bg-[#080706] border border-border rounded-xl p-6 font-mono text-[0.85rem] text-ink overflow-x-auto">
                    <code>npm start</code>
                  </pre>
                </div>
              </li>
            </ol>
            <p className="mt-6 text-muted text-lg">In production, the backend serves the built frontend from <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">/dist</code> and exposes the API from <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">/api</code>.</p>


            {/* UTILITIES */}
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink mt-16 mb-6">Reset Demo Data</h2>
            <p className="text-muted text-lg mb-6">
              To wipe inquiry/admin/demo activity while keeping categories, products, specifications, and the owner account:
            </p>
            <pre className="mt-4 bg-[#080706] border border-border rounded-xl p-6 font-mono text-[0.85rem] text-ink overflow-x-auto">
              <code>npm run reset:data</code>
            </pre>
            <p className="mt-6 text-muted text-lg">This clears quote enquiries, brochure leads, gallery items, audit logs, admin tasks, sessions, password reset tokens, spare-parts inventory, and all non-owner users.</p>

            {/* HOSTINGER */}
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink mt-16 mb-6">Hostinger Deployment</h2>
            <p className="text-muted text-lg mb-6">This repo is prepared to run as a single Node.js app on Hostinger. Import the Git repository <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">https://github.com/dev19072004/Sparkline.git</code> via the control panel.</p>
            <ul className="space-y-4 text-muted text-lg">
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div>Branch: <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">main</code> | Node version: <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">22.x</code></div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div>Build command: <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">npm run build</code> | Output dir: <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">dist</code></div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div>Entry file: <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">server/src/server.js</code></div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div>Static media in <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">/public</code> is served by the backend, along with <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">robots.txt</code>.</div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">{"//"}</span>
                <div><code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">sitemap.xml</code> is generated dynamically from the live database.</div>
              </li>
            </ul>

            {/* SEO */}
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink mt-16 mb-6">Google Indexing Checklist</h2>
            <ol className="space-y-6 text-muted text-lg">
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">01.</span>
                <div>Open Google Search Console and add the <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">sparklineindia.com</code> domain property.</div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">02.</span>
                <div>Verify ownership using the DNS record Google gives you.</div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">03.</span>
                <div>Submit <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">https://sparklineindia.com/sitemap.xml</code>.</div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">04.</span>
                <div>Request indexing for the homepage and a few key category and product pages.</div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-mono text-accent text-sm mt-1">05.</span>
                <div>Keep <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">robots.txt</code> accessible at <code className="text-ink bg-paper px-2 py-1 border border-border/50 rounded text-sm">https://sparklineindia.com/robots.txt</code>.</div>
              </li>
            </ol>

          </div>
        </section>

      </div>
    </SiteShell>
  );
}
