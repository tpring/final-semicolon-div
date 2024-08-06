'use client';

import Logo from '@/assets/images/header/Logo';
import SearchButton from '@/assets/images/header/SearchButton';
import { useAuth } from '@/context/auth.context';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const Header = () => {
  const { isLoggedIn, userData } = useAuth();
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    return pathname === path ? 'text-main-500' : 'text-neutral-900';
  };

  return (
    <header className="bg-white w-full mt-5">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8 ml-40">
          <div className="mt-3">
            <Link href={'/'}>
              <Logo />
            </Link>
          </div>
          <NavLinks getLinkClasses={getLinkClasses} />
        </div>
        <SearchBar />
        <UserMenu isLoggedIn={isLoggedIn} userData={userData} />
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
