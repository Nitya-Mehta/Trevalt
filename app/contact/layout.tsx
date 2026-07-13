import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Trevalt | Software Engineering Studio',
  description: 'Get in touch with Trevalt to start building your next high-performance web platform, custom AI/ML pipeline, or robust Android application. We respond within 24 hours.',
  alternates: {
    canonical: 'https://trevalt.vercel.app/contact',
  },
  openGraph: {
    title: 'Contact Trevalt | Software Engineering Studio',
    description: 'Get in touch with Trevalt to start building your next high-performance web platform, custom AI/ML pipeline, or robust Android application.',
    url: 'https://trevalt.vercel.app/contact',
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
