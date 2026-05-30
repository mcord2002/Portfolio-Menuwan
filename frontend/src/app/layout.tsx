import type { Metadata } from 'next';
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Menuwan Kalhara | Full Stack Developer',
  description:
    'Professional portfolio of Menuwan Kalhara — IT Undergraduate at SLIIT and Full Stack Developer specializing in Next.js, NestJS, and modern web technologies.',
  keywords: [
    'Menuwan Kalhara',
    'Full Stack Developer',
    'SLIIT',
    'Next.js',
    'Portfolio',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <div className="noise-overlay fixed inset-0 z-[1]" aria-hidden />
        {children}
      </body>
    </html>
  );
}
