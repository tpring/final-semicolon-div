import type { Metadata } from 'next';
import './globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/context/auth.context';
import TanstackQueryProvider from '@/providers/TanstackQueryProvider';
import { BookmarkProvider } from '@/providers/BookmarkProvider';

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
      <body>
        <TanstackQueryProvider>
          <AuthProvider>
            <BookmarkProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </BookmarkProvider>
          </AuthProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
