import clsx from 'clsx';
import type {Metadata} from 'next';
import {Inter as FontSans} from 'next/font/google';
import './globals.css';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Le ChAIf',
  description: 'A chatbot that helps you at your cooking needs providing recipes with the best User Experience.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={clsx('w-dvw h-dvh', fontSans.className)}>
    <header className="sticky top-0 z-10 bg-white dark:bg-sky-900 flex items-center justify-center px-16 py-2
      border-b border-sky-200 dark:border-sky-800 shadow-sm
    ">
      <h1 className="text-xl font-bold text-amber-300 dark:text-amber-700">Le Ch<span className="text-sky-300 dark:text-sky-700">AI</span>f</h1>
    </header>
      {children}
    </body>
  </html>
);

export default RootLayout;
