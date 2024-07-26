'use client';

import Logo from '@/assets/images/Logo';
import SearchButton from '@/assets/images/SearchButton';
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
  const { isLoggedIn, logOut, userData } = useAuth();
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    return pathname === path ? 'text-blue-500' : 'text-gray-700';
  };

  const handleLogout = async () => {
    const result = await logOut();
    if (result.status === 200) {
      toast.success('로그아웃되었습니다.');
    }
  };

  return (
    <header className="bg-white w-full mt-12">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8 ml-40">
          <div>
            <Link href={'/'}>
              <Logo />
            </Link>
          </div>
          <NavLinks getLinkClasses={getLinkClasses} />
        </div>
        <SearchBar />
        <UserMenu isLoggedIn={isLoggedIn} userData={userData} handleLogout={handleLogout} />
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
