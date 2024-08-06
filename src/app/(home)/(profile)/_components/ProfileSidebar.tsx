'use client';

import { useAuth } from '@/context/auth.context';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const ProfileSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const profileId = pathname?.split('/')[2];
  const { userData, me, logOut } = useAuth();

  useEffect(() => {
    if (me?.id === profileId) {
      router.push('/profile');
    }
  }, [me, profileId, router]);

  const handleLogout = async () => {
    const result = await logOut();
    if (result.status === 200) {
      router.push('/');
    } else {
      toast.error(result.message || '로그아웃에 실패했습니다.');
    }
  };

  return (
    <>
      <div className="flex-none w-[286px] h-[80%] border-r border-l border-neutral-50 shadow-custom bg-white p-[56px_24px]">
        <div className="center-alignment">
          <div className="mb-[26px] relative w-[120px] h-[120px] border border-neutral-50 rounded-full overflow-hidden bg-white">
            {userData?.profile_image ? (
              <Image
                src={userData.profile_image}
                alt="프로필 이미지"
                fill
                priority
                className="w-full h-full object-cover bg-white"
                sizes="120px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          <p className="text-lg font-semibold mb-[40px]">{userData?.nickname || 'Anonymous'}</p>
        </div>
        <nav>
          <ul>
            <li className="mb-[40px]">
              <Link
                href="/profile"
                className={me?.id === '/profile' ? 'text-h5 font-bold text-main-400' : 'text-h5 font-bold text-sub-100'}
              >
                프로필
              </Link>
            </li>
            <li className="mb-[24px]">
              <Link
                href="/profile/activities"
                className={
                  me?.id === '/profile/activities'
                    ? 'text-h5 font-bold text-main-400'
                    : 'text-h5 font-bold text-sub-100'
                }
              >
                내 활동
              </Link>
            </li>
            <p className="mb-[40px] border-b border-neutral-100" />
            <li>
              <button className="text-h5 font-bold text-sub-100 hover:text-main-400" onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ProfileSidebar;
