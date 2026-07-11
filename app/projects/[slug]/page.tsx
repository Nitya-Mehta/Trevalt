import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/site-shell';
import { ProjectDetail } from '@/components/project-detail';
import { getProject, projects } from '@/lib/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <SiteShell>
      <ProjectDetail project={project} />
    </SiteShell>
  );
}
