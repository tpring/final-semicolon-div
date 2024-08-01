'use client';

import { useAuth } from '@/context/auth.context';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ProfileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logOut } = useAuth();

  const handleLogout = async () => {
    const result = await logOut();
    if (result.status === 200) {
      router.push('/');
    } else {
      toast.success(result.message || '로그아웃에 실패했습니다.');
    }
  };

  return (
    <nav className="fixed w-[18%] max-w-[286px] h-[80%] bg-sub-50 p-[56px_24px_56px_24px]">
      <ul>
        <li className="mb-[64px]">
          <Link
            href="/profile"
            className={pathname === '/profile' ? 'text-h5 font-bold text-main-400' : 'text-h5 font-bold text-sub-100'}
          >
            프로필
          </Link>
        </li>
        <li className="mb-[64px]">
          <Link
            href="/profile/activities"
            className={
              pathname === '/profile/activities' ? 'text-h5 font-bold text-main-400' : 'text-h5 font-bold text-sub-100'
            }
          >
            내 활동
          </Link>
        </li>
        <li className="mb-[40px]">
          <Link
            href="/profile/settings"
            className={
              pathname === '/profile/settings' ? 'text-h5 font-bold text-main-400' : 'text-h5 font-bold text-sub-100'
            }
          >
            설정
          </Link>
        </li>

        <p className="w-full h-[1px] mb-[64px] bg-sub-100 opacity-50 " />
        <li className="my-14">
          <button className="text-h5 font-bold text-sub-100 hover:text-main-400" onClick={handleLogout}>
            로그아웃
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileSidebar;
