import clsx from 'clsx';
import type {Metadata} from 'next';
import {Inter as FontSans} from 'next/font/google';
import './globals.css';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Le Chaif',
  description: 'A chatbot that helps you at your cooking needs providing recipes with the best User Experience.',
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
