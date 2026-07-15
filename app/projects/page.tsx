import Link from 'next/link';
import Image from 'next/image';
import { SiteShell } from '@/components/site-shell';
import { projects } from '@/lib/projects';
import { Metadata } from 'next';
import { ArrowUpRightIcon } from '@/components/icons';

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
      <div className="w-full border-b border-border">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:divide-x divide-border border-b border-border">
          <div className="md:col-span-8 p-6 md:p-10 flex items-center">
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl tracking-display uppercase">
              Works
            </h1>
          </div>
          <div className="md:col-span-4 p-8 md:p-12 flex flex-col justify-end border-t border-border md:border-t-0">
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted max-w-[200px] leading-relaxed">
              A curated collection of high-performance web platforms, custom AI pipelines, and robust native applications.
            </p>
          </div>
        </div>

        {/* Unified Projects Index */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x divide-border">
          <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-between border-b border-border lg:border-b-0">
            <h2 className="font-display text-lg md:text-xl uppercase tracking-display font-bold text-muted">Directory</h2>
            <span className="font-mono text-[0.55rem] uppercase tracking-widest text-muted/50 mt-8">
              Index
            </span>
          </div>
          
          <div className="lg:col-span-10 flex flex-col divide-y divide-border">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 px-4 md:px-8 transition-colors hover:bg-white/[0.015] gap-4 sm:gap-0"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-[0.65rem] text-muted">0{index + 1}</span>
                  <div className="flex items-center gap-4">
                    {project.thumbnail && (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-border bg-[#080706] opacity-60 transition-opacity group-hover:opacity-100 hidden sm:block">
                        <Image
                          src={project.thumbnail}
                          alt={`${project.title} icon`}
                          fill
                          sizes="48px"
                          className="object-contain p-2"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center items-start">
                      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase tracking-display font-bold transition-colors group-hover:text-accent leading-none">
                        {project.title}
                      </h3>
                      {project.developer && (
                        <span className="font-mono text-[0.55rem] text-muted/60 uppercase tracking-widest mt-2">
                          <span className="text-accent/50 mr-1">//</span> ENG: {project.developer}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 sm:mt-0 flex flex-wrap items-center gap-4 sm:justify-end">
                    <span className="font-mono text-[0.6rem] uppercase tracking-widest text-accent flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> LIVE
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="font-mono text-[0.55rem] uppercase tracking-widest text-muted/60 border border-border/30 rounded-full px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
