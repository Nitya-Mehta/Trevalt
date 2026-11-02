import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteShell } from '@/components/site-shell';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Work | Trevalt',
  description: 'Selected projects by Trevalt.',
  alternates: { canonical: 'https://trevalt.vercel.app/projects' },
};

export default function ProjectsIndexPage() {
  return (
    <SiteShell>
      <section className="minimal-index w-full px-5 md:px-8">
        <h1>Work</h1>
        <ol className="minimal-project-list">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <span className="minimal-project-image">
                  <Image
                    src={project.thumbnail ?? project.screenshots?.[0] ?? '/projects/newageit/logo.png'}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 88px, 150px"
                    unoptimized
                    className="object-contain p-3"
                  />
                </span>
                <span className="minimal-project-number">0{index + 1}</span>
                <span className="minimal-project-name">{project.title}</span>
                <span className="minimal-project-category">{project.category}</span>
                <span className="minimal-project-arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </SiteShell>
  );
}
