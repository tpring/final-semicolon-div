import { UserMenuProps } from '@/types/header/headerTypes';
import Image from 'next/image';
import Link from 'next/link';

const UserMenu = ({ isLoggedIn, userData, handleLogout }: UserMenuProps) => {
  return (
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
            <h1 className="md:hidden bg-blue-500 border-0 rounded-md px-4 py-2 ml-2 font-bold text-white ">글쓰기</h1>
          </Link>
          <Link href={'/posting'}>
            <h1 className="hidden md:inline bg-blue-500 border-0 rounded-md px-4 py-2 font-bold text-white">글쓰기</h1>
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
  );
};

export default UserMenu;
