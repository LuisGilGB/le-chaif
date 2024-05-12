import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Cocineta',
  description: 'Your recipe assistant',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={clsx('w-dvw h-dvh', fontSans.className)}>{children}</body>
  </html>
);

export default RootLayout;
