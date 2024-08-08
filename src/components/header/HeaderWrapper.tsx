'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

const HeaderWrapper = () => {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }
  return <Header />;
};

export default HeaderWrapper;
