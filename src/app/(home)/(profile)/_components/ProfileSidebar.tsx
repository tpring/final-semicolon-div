'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const ProfileSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="w-[286px] h-screen bg-[#eeeeee] p-8 overflow-y-hidden">
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
          <button className="text-gray-500">로그아웃</button>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileSidebar;
