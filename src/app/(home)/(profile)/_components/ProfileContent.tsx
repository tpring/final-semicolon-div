'use client';

import useActiveTabStore from '@/store/useActiveTabStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/profile/profileauth', { method: 'GET' });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data: User = await response.json();
        console.log('Fetched user data:', data); // 확인을 위한 로그
        setUser(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLikeClick = () => {
    setActiveTab('likes');
  };

  const handleBookmarkClick = () => {
    setActiveTab('bookmarks');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="w-[740px] h-[566px] p-4 border rounded-lg shadow-lg">
      <div className="flex flex-col justify-center items-center mb-4">
        <Image
          src={
            user.profile_image ||
            'https://jtorewqfshytdtgldztv.supabase.co/storage/v1/object/public/profile_image/free-icon-user-747376.png'
          }
          alt="프로필 이미지"
          width={80}
          height={80}
          className="rounded-full bg-red-300"
          priority
        />

        <div>
          <p className="text-lg font-semibold">{user.nickname}</p>
        </div>
      </div>
      <div className="flex justify-between p-10">
        <div>
          <p className="my-6">깃허브 링크</p>
          <p className="">자기소개</p>
        </div>
        <div className="mr-[180px]">
          {user.github_url ? (
            <a href={user.github_url} className="text-blue-500 my-6">
              연결됨
            </a>
          ) : (
            <p className="text-gray-500 my-6">비연동</p>
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
