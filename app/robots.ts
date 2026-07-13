import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/dashboard/', '/login/', '/setup/', '/forgot-password/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://trevalt.vercel.app'}/sitemap.xml`,
  };
}
