import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/fraunces/900.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://trevalt.vercel.app'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Trevalt | Web Dev, AI/ML & Android',
    template: '%s | Trevalt',
  },
  description: 'Trevalt is a software engineering studio specializing in high-performance web development, artificial intelligence (AI), machine learning (ML), and robust Android applications. Founded by Nitya Mehta, Aarav Halvadiya, and Devanshu Verma.',
  keywords: [
    'Trevalt',
    'Web Development Agency',
    'AI Solutions',
    'Custom AI pipelines',
    'Machine Learning Consulting',
    'Android App Development',
    'Mobile App Developers',
    'React Developers',
    'Next.js Agency',
    'Full-Stack Engineers',
    'Software Engineering Studio',
    'Nitya Mehta',
    'Aarav Halvadiya',
    'Devanshu Verma',
    'Custom Software Development',
    'SaaS Development',
    'B2B Software',
    'Tech Startup Agency',
    'Enterprise Web Apps',
    'LLM Integration',
    'Generative AI Development'
  ],
  authors: [
    { name: 'Nitya Mehta' },
    { name: 'Aarav Halvadiya' },
    { name: 'Devanshu Verma' }
  ],
  creator: 'Trevalt',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trevalt.vercel.app',
    title: 'Trevalt | Web Dev, AI/ML & Android',
    description: 'Software engineering studio specializing in high-performance web development, AI, ML, and robust Android applications.',
    siteName: 'Trevalt',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Trevalt Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trevalt | Web Dev, AI/ML & Android',
    description: 'Software engineering studio specializing in high-performance web development, AI, ML, and robust Android applications.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Trevalt",
              "url": "https://trevalt.vercel.app",
              "logo": "https://trevalt.vercel.app/icon.png",
              "founders": [
                { "@type": "Person", "name": "Nitya Mehta" },
                { "@type": "Person", "name": "Aarav Halvadiya" },
                { "@type": "Person", "name": "Devanshu Verma" }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "nityachintan@gmail.com",
                "contactType": "customer support"
              }
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
