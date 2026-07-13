import Link from 'next/link';
import Image from 'next/image';
import { SiteShell } from '@/components/site-shell';
import { projects } from '@/lib/projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects & Case Studies | Trevalt',
  description: "Explore Trevalt's portfolio of high-performance web platforms, custom AI/ML pipelines, and robust Android applications.",
  alternates: {
    canonical: 'https://trevalt.vercel.app/projects',
  },
  openGraph: {
    title: 'Projects & Case Studies | Trevalt',
    description: "Explore Trevalt's portfolio of high-performance web platforms, custom AI/ML pipelines, and robust Android applications.",
    url: 'https://trevalt.vercel.app/projects',
  }
};

export default function ProjectsIndexPage() {
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-[var(--page-max)] px-5 py-12 md:px-8 md:py-16">
        <div className="max-w-[30rem]">
          <h1 className="font-display text-4xl font-bold tracking-display md:text-5xl lg:text-6xl">Projects</h1>
          <p className="mt-4 text-muted">Explore our portfolio of high-performance web platforms, custom AI/ML pipelines, and robust Android applications.</p>
        </div>

        <div className="mt-12 border-b border-border">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="grid gap-6 border-t border-border py-6 transition-colors duration-200 ease-smooth hover:bg-white/[0.02] md:grid-cols-[1.2fr_1fr]"
            >
              <div className="flex items-start gap-4">
                {project.thumbnail ? (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-card">
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} app icon`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div>
                  <h2 className="font-display text-3xl font-bold tracking-display md:text-4xl">{project.title}</h2>
                  <p className="mt-2 max-w-[34rem] text-muted">{project.tagline}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-start gap-2 self-center text-[0.75rem] font-mono uppercase tracking-[0.18em] text-muted">
                {project.tech.map((tag) => (
                  <span key={tag} className="rounded-xl border border-border px-3 py-2">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
