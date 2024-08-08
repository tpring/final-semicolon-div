import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/providers/Providers';
import 'react-toastify/dist/ReactToastify.css';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
