import { Metadata } from 'next';
import { HomepageClient } from '@/components/homepage-client';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = {
  title: 'Trevalt | Web Dev, AI/ML & Android',
  description: 'Trevalt builds robust Android applications, custom AI/ML pipelines, and high-performance web platforms. Partner with a software engineering studio.',
  openGraph: {
    title: 'Trevalt | Web Dev, AI/ML & Android',
    description: 'Trevalt builds robust Android applications, custom AI/ML pipelines, and high-performance web platforms. Partner with a software engineering studio.',
  }
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Trevalt",
    "image": "https://trevalt.vercel.app/images/og-image.jpg",
    "description": "Software engineering studio specializing in high-performance web development, AI, ML, and robust Android applications.",
    "url": "https://trevalt.vercel.app",
    "founders": [
      {
        "@type": "Person",
        "name": "Nitya Mehta"
      },
      {
        "@type": "Person",
        "name": "Aarav Halvadiya"
      },
      {
        "@type": "Person",
        "name": "Devanshu Verma"
      }
    ],
    "knowsAbout": [
      "Web Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Android App Development",
      "Next.js",
      "React"
    ]
  };

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomepageClient />
    </SiteShell>
  );
}
