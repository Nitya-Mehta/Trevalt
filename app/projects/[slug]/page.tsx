import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell';
import { ProjectDetail } from '@/components/project-detail';
import { getProject, projects } from '@/lib/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://trevalt.vercel.app';
  const url = `${baseUrl}/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.tagline,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${project.title} | Trevalt`,
      description: project.tagline,
      url,
      type: 'article',
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);

  if (!project) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://trevalt.vercel.app';
  const url = `${baseUrl}/projects/${project.slug}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: project.title,
      operatingSystem: 'Web, Android',
      applicationCategory: 'WebApplication',
      description: project.description || project.tagline,
      url,
      developer: {
        '@type': 'Organization',
        name: project.developer || 'Trevalt',
      },
      image: project.thumbnail ? `${baseUrl}${project.thumbnail}` : undefined,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${baseUrl}/projects` },
        { '@type': 'ListItem', position: 3, name: project.title, item: url }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteShell>
        <ProjectDetail project={project} />
      </SiteShell>
    </>
  );
}
