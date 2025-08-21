import './globals.css';
import type { Metadata } from 'next';
import { Manrope, Titan_One } from 'next/font/google';

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const titanOne = Titan_One({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-titan-one',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ALLIN | Spin Your Way to Fortune',
  description: 'The ultimate casino experience meets the future of digital tokens. Pull the lever and discover what destiny awaits.',
  openGraph: {
    title: 'ALLIN | Spin Your Way to Fortune',
    description: 'The ultimate casino experience meets the future of digital tokens.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALLIN | Spin Your Way to Fortune',
    description: 'The ultimate casino experience meets the future of digital tokens.',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#A90D2D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${titanOne.variable}`}>
      <body className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}