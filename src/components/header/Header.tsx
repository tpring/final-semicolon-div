'use client';

import Logo from '@/assets/images/Logo';
import SearchButton from '@/assets/images/SearchButton';
import { useAuth } from '@/context/auth.context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isLoggedIn, logOut, me } = useAuth();
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    return pathname === path ? 'text-purple-500' : 'text-gray-700';
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = async () => {
    const result = await logOut();
    if (result.status === 200) {
      toast.success('로그아웃되었습니다.');
    }
  };

  return (
    <header className="bg-white max-w-[1920px] min-w-[375px]">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href={'/'}>
            <Logo />
          </Link>
          <div className="flex space-x-4">
            <Link href={'/'}>
              <h1 className={`hidden lg:inline border-0 rounded-md p-1 ${getLinkClasses('/')}`}>홈</h1>
            </Link>
            <Link href={'/forum'}>
              <h1 className={`hidden lg:inline border-0 rounded-md p-1 ${getLinkClasses('/conference')}`}>포럼</h1>
            </Link>
            <Link href={'/qna'}>
              <h1 className={`hidden lg:inline border-0 rounded-md p-1 ${getLinkClasses('/qna')}`}>Q&A</h1>
            </Link>
            <Link href={'/archiving'}>
              <h1 className={`hidden lg:inline border-0 rounded-md p-1 ${getLinkClasses('/archiving')}`}>아카이브</h1>
            </Link>
            <Link href={'/notification'}>
              <h1 className={`hidden lg:inline border-0 rounded-md p-1 ${getLinkClasses('/notification')}`}>공지</h1>
            </Link>
          </div>
        </div>
        <div className="flex space-x-2 items-center">
          {isSearchOpen && (
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="hidden sm:inline ml-2 border-2 border-purple-500 focus:outline-purple-800 rounded-md p-2 w-64"
            />
          )}
          <button onClick={toggleSearch} className="focus:outline-none">
            <SearchButton />
          </button>
          {isLoggedIn ? (
            <>
              <Link href={'/profile'}>
                <h1 className="hidden md:inline border-0 rounded-md p-1">마이페이지</h1>
              </Link>
              <button onClick={handleLogout}>
                <h1 className="md:hidden bg-purple-500 border-0 rounded-md p-1 ml-2 text-white">로그아웃</h1>
              </button>
              <button onClick={handleLogout}>
                <h1 className="hidden md:inline bg-purple-500 border-0 rounded-md p-1 text-white">로그아웃</h1>
              </button>
            </>
          ) : (
            <>
              {' '}
              <Link href={'/login'}>
                <h1 className={`md:hidden bg-purple-500 border-0 rounded-md p-1 ml-2 text-white `}>로그인</h1>
              </Link>
              <Link href={'/login'}>
                <h1 className={`hidden md:inline border-0 rounded-md p-1 `}>로그인</h1>
              </Link>
              <Link href={'/signup'}>
                <h1 className={`hidden md:inline bg-purple-500 border-0 rounded-md p-1 text-white `}>회원가입</h1>
              </Link>
            </>
          )}
        </div>
      </div>
      {isSearchOpen && (
        <div className="fixed top-14 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="sm:hidden ml-2 border-2 border-purple-500 focus:border-purple-800 rounded-md p-2 w-64"
          />
        </div>
      )}
      <ToastContainer />
    </header>
  );
};

export default Header;
