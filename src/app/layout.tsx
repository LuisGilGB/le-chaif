import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
    <body className={clsx('w-dvw h-dvh', inter.className)}>{children}</body>
  </html>
);

export default RootLayout;
