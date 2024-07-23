'use client';

import useActiveTabStore from '@/store/useActiveTabStore';
import Image from 'next/image';
import Link from 'next/link'; // next/link 임포트
import { useState } from 'react';

// 임시 User 타입
type User = {
  id: string;
  profile_image: string;
  email: string;
  nickname: string;
  github_url?: string;
  info: string;
  like: string;
  bookmark: string;
};

const ProfileContent = () => {
  const setActiveTab = useActiveTabStore((state) => state.setActiveTab);

  const [user, setUser] = useState<User>({
    id: '618962ac-e431-4ccd-9ca1-dc916435f8da',
    profile_image:
      'https://jtorewqfshytdtgldztv.supabase.co/storage/v1/object/sign/profile_image/18_20240511012529.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlX2ltYWdlX2ltYWdlLzE4XzIwMjQwNTExMDEyNTI5LnBuZyIsImlhdCI6MTcyMTYyNTQ3NiwiZXhwIjoyMDM2OTg1NDc2fQ.nKa_eNvxhs2qasseDYM8pO6mUZKPfrbnQr0TPBiSUPs',
    email: 'admin@admin.com',
    nickname: 'admin',
    github_url: '',
    info: 'Short info about the user.',
    like: '10',
    bookmark: '30'
  });

  const handleLikeClick = () => {
    setActiveTab('likes');
  };

  const handleBookmarkClick = () => {
    setActiveTab('bookmarks');
  };

  return (
    <div className="w-[740px] h-[566px] p-4 border rounded-lg shadow-lg">
      <div className="flex flex-col justify-center items-center mb-4">
        <Image
          src={user.profile_image}
          alt="프로필 이미지"
          width={80}
          height={80}
          className="rounded-full bg-red-300"
        />
        <div>
          <p className="text-lg font-semibold">{user.nickname}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="">깃허브 링크</p>
          <p className="">자기소개</p>
        </div>
        <div>
          {user.github_url ? (
            <a href={user.github_url} className="text-blue-500">
              연결됨
            </a>
          ) : (
            <p className="text-gray-500">비연동</p>
          )}
          <p className="text-gray-600">{user.info}</p>
        </div>
      </div>
      <div className="flex justify-around mt-8">
        <Link href="/profile/activities">
          <div className="text-center cursor-pointer" onClick={handleLikeClick}>
            <p className="text-gray-600">좋아요</p>
            <p>{user.like}</p>
          </div>
        </Link>
        <Link href="/profile/activities">
          <div className="text-center cursor-pointer" onClick={handleBookmarkClick}>
            <p className="text-gray-600">북마크</p>
            <p>{user.bookmark}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileContent;
