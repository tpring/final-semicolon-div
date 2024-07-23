import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanstackQueryProvider } from '@/providers/TanstackQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '<div>',
  description: '프론트엔드 개발자 커뮤니티'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackQueryProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
