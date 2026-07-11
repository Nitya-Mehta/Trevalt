import type { Metadata } from 'next';
import './globals.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/fraunces/900.css';

export const metadata: Metadata = {
  title: 'Trevalt',
  description: 'Trevalt website built as a static frontend.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
