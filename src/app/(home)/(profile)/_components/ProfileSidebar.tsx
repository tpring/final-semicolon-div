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
    <nav className="fixed w-[286px] h-screen bg-[#eeeeee] p-8">
      <ul>
        <li className="my-14">
          <Link href="/profile" className={pathname === '/profile' ? 'text-black' : 'text-gray-500'}>
            프로필
          </Link>
        </li>
        <li className="my-14">
          <Link
            href="/profile/activities"
            className={pathname === '/profile/activities' ? 'text-black' : 'text-gray-500'}
          >
            내 활동
          </Link>
        </li>
        <li className="my-14">
          <Link href="/profile/settings" className={pathname === '/profile/settings' ? 'text-black' : 'text-gray-500'}>
            설정
          </Link>
        </li>
        <li>
          <button className="text-gray-500" onClick={handleLogout}>
            로그아웃
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileSidebar;
