'use client';

import { useAuth } from '@/context/auth.context';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ProfileSidebar = () => {
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { userData, logOut } = useAuth();

  useEffect(() => {
    if (userData) {
      setNickname(userData.nickname || '');
      setProfileImage(userData.profile_image || '');
    }
  }, [userData]);

  const handleLogout = async () => {
    const result = await logOut();
    if (result.status === 200) {
      router.push('/');
    } else {
      toast.success(result.message || '로그아웃에 실패했습니다.');
    }
  };

  if (!userData) {
    router.push('/');
  }

  return (
    <div className="fixed w-[18%] max-w-[286px] h-[80%] border-r border-l border-neutral-50 shadow-custom bg-white p-[56px_24px]">
      <div className="h-[334px] center-alignment">
        <div className=" w-[120px] h-[120px] border mb-[26px] border-neutral-50 rounded-full overflow-hidden">
          <Image
            src={profileImage}
            alt="프로필 이미지"
            width={120}
            height={120}
            className="w-full h-full object-cover bg-white"
            priority
          />
        </div>
        <p className="text-lg font-semibold">{nickname}</p>
      </div>
      <nav>
        <ul>
          <li className="mb-[40px]">
            <Link
              href="/profile"
              className={pathname === '/profile' ? 'text-h5 font-bold text-main-400' : 'text-h5 font-bold text-sub-100'}
            >
              프로필
            </Link>
          </li>
          <li className="mb-[24px] ">
            <Link
              href="/profile/activities"
              className={
                pathname === '/profile/activities'
                  ? 'text-h5 font-bold text-main-400'
                  : 'text-h5 font-bold text-sub-100'
              }
            >
              내 활동
            </Link>
          </li>
          {/* <li className="mb-[40px]">
            <Link
              href="/profile/settings"
              className={
                pathname === '/profile/settings' ? 'text-h5 font-bold text-main-400' : 'text-h5 font-bold text-sub-100'
              }
            >
              설정
            </Link>
          </li> */}

          <p className="mb-[40px] border-b border-neutral-100 " />
          <li className="">
            <button className="text-h5 font-bold text-sub-100 hover:text-main-400" onClick={handleLogout}>
              로그아웃
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileSidebar;
