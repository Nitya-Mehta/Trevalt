import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Trevalt | Nitya Mehta, Aarav Halvadiya, Devanshu Verma',
  description: 'Meet the founders of Trevalt: Nitya Mehta (AI/ML & Full-Stack), Aarav Halvadiya (Android Development), and Devanshu Verma (Full-Stack). An elite engineering unit.',
  openGraph: {
    title: 'About Trevalt | Nitya Mehta, Aarav Halvadiya, Devanshu Verma',
    description: 'Meet the founders of Trevalt: Nitya Mehta (AI/ML & Full-Stack), Aarav Halvadiya (Android Development), and Devanshu Verma (Full-Stack). An elite engineering unit.',
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
