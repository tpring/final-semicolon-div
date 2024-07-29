'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useActiveTabStore from '@/store/useActiveTabStore';
import { useAuth } from '@/context/auth.context';

const ProfileContent = () => {
  const { userData, isLoggedIn, me } = useAuth();
  const [likeCount, setLikeCount] = useState<number>(0);
  const [bookmarkCount, setBookmarkCount] = useState<number>(0);
  const setActiveTab = useActiveTabStore((state) => state.setActiveTab);

  useEffect(() => {
    if (me?.id) {
      const fetchActivityCounts = async () => {
        try {
          const response = await fetch(`/api/profile/activities?userId=${me.id}`);
          const data = await response.json();
          if (response.ok) {
            setLikeCount(data.likeCount ?? 0);
            setBookmarkCount(data.bookmarkCount ?? 0);
          } else {
            console.error('Failed to fetch activity counts:', data.error);
          }
        } catch (error) {
          console.error('Error fetching activity counts:', error);
        }
      };
      fetchActivityCounts();
    }
  }, [me]);

  const handleLikeClick = () => {
    setActiveTab('likes');
  };

  const handleBookmarkClick = () => {
    setActiveTab('bookmarks');
  };

  if (!isLoggedIn || !userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-[740px] h-[566px] p-4 border rounded-lg shadow-lg">
      <div className="flex flex-col justify-center items-center mb-4">
        <Image
          src={
            userData.profile_image ||
            'https://jtorewqfshytdtgldztv.supabase.co/storage/v1/object/public/profile_image/free-icon-user-747376.png'
          }
          alt="프로필 이미지"
          width={80}
          height={80}
          className="rounded-full bg-red-300"
          priority
        />

        <div>
          <p className="text-lg font-semibold">{userData.nickname}</p>
        </div>
      </div>
      <div className="flex justify-between p-10">
        <div>
          <p className="my-6">깃허브 링크</p>
          <p className="">자기소개</p>
        </div>
        <div className="mr-[180px]">
          {userData.github_url ? (
            <a href={userData.github_url} className="text-blue-500 my-6">
              연결됨
            </a>
          ) : (
            <p className="text-gray-500 my-6">비연동</p>
          )}
          <p className="text-gray-600">{userData.info}</p>
        </div>
      </div>
      <div className="flex justify-around mt-8">
        <Link href="/profile/activities">
          <div className="text-center cursor-pointer" onClick={handleLikeClick}>
            <p className="text-gray-600">좋아요</p>
            <p>{likeCount}</p>
          </div>
        </Link>
        <Link href="/profile/activities">
          <div className="text-center cursor-pointer" onClick={handleBookmarkClick}>
            <p className="text-gray-600">북마크</p>
            <p>{bookmarkCount}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileContent;
