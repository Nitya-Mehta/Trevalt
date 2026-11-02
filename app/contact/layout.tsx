import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Trevalt | Software Engineering Studio',
  description: 'Contact Trevalt Studio or email one of the three founders directly.',
  alternates: {
    canonical: 'https://trevalt.vercel.app/contact',
  },
  openGraph: {
    title: 'Contact Trevalt | Software Engineering Studio',
    description: 'Contact Trevalt Studio or email one of the three founders directly.',
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
