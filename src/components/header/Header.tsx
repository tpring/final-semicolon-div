'use client';

import Logo from '@/assets/images/Logo';
import SearchButton from '@/assets/images/SearchButton';
import { useAuth } from '@/context/auth.context';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <div className="flex space-x-8 mt-10">
            <Link href={'/'}>
              <h1 className={`hidden lg:inline border-0 rounded-md p-2 font-bold mt-4 ${getLinkClasses('/')}`}>메인</h1>
            </Link>
            <Link href={'/forum'}>
              <h1 className={`hidden lg:inline border-0 rounded-md p-1 font-bold ${getLinkClasses('/conference')}`}>
                포럼
              </h1>
            </Link>
            <Link href={'/qna'}>
              <h1 className={`hidden lg:inline border-0 rounded-md p-1 font-bold ${getLinkClasses('/qna')}`}>Q&A</h1>
            </Link>
            <Link href={'/archiving'}>
              <h1 className={`hidden lg:inline border-0 rounded-md p-1 font-bold ${getLinkClasses('/archiving')}`}>
                아카이브
              </h1>
            </Link>
          </div>
        </div>
        <div className="absolute inset-x-0 mx-auto flex justify-center items-center border-2 border-blue-500 rounded-md p-2 w-64 mt-10">
          <SearchButton />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="hidden sm:inline pr-3 w-full font-bold focus:outline-none"
          />
        </div>
        <div className="flex space-x-2 items-center mr-40 mt-10">
          {isLoggedIn ? (
            <>
              <Link href={'/profile'}>
                {userData && userData.profile_image && (
                  <div className="relative w-10 h-10">
                    <Image
                      src={userData.profile_image}
                      alt="Profile"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                )}
              </Link>
              <Link href={'/posting'}>
                <h1 className="md:hidden bg-blue-500 border-0 rounded-md px-4 py-2 ml-2 font-bold text-white ">
                  글쓰기
                </h1>
              </Link>
              <Link href={'/posting'}>
                <h1 className="hidden md:inline bg-blue-500 border-0 rounded-md px-4 py-2 font-bold text-white">
                  글쓰기
                </h1>
              </Link>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link href={'/login'}>
                <h1 className={`md:hidden  border-0 rounded-md p-1 ml-2 font-bold `}>로그인</h1>
              </Link>
              <Link href={'/login'}>
                <h1 className={`hidden md:inline border-0 rounded-md p-1 font-bold`}>로그인</h1>
              </Link>
              <h1>|</h1>
              <Link href={'/signup'}>
                <h1 className={`hidden md:inline  border-0 rounded-md p-1 font-bold `}>회원가입</h1>
              </Link>
              <Link href={'/login'}>
                <h1 className={`hidden md:inline bg-blue-500 text-white border-0 rounded-md p-2 font-bold `}>글쓰기</h1>
              </Link>
            </>
          )}
        </div>
      </div>

      <ToastContainer />
    </header>
  );
};

export default Header;
