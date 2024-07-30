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
          const response = await fetch('/api/profile/profileauth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: me.id })
          });

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
    <div className="w-[740px] h-[566px] flex  justify-center items-center mb-4">
      <div className="w-[285px] h-[442px] marker:flex flex-col justify-center items-center  p-4 border rounded-lg shadow-lg">
        <Image
          src={userData.profile_image || ''}
          alt="프로필 이미지"
          width={80}
          height={80}
          className="rounded-full"
          priority
        />
        <p className="text-lg font-semibold">{userData.nickname}</p>
        <div className="flex justify-around mt-8">
          <Link href="/profile/activities">
            <div className="text-center cursor-pointer" onClick={handleBookmarkClick}>
              <p>💌(임시)</p>
              <p className="text-gray-600">북마크 {bookmarkCount}</p>
            </div>
          </Link>
          <Link href="/profile/activities">
            <div className="text-center cursor-pointer" onClick={handleLikeClick}>
              <p>♡(임시)</p>
              <p className="text-gray-600">좋아요{likeCount}</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-[537px] h-[442px] flex flex-col p-4 border rounded-lg shadow-lg">
        <Link href={'/profile/settings'}>
          <div className="flex justify-between">
            <span>계정 설정</span>
            <span> › </span>
          </div>{' '}
        </Link>
        <div className="flex justify-between ">
          <p className="my-6">깃허브 링크</p>
          {userData.github_url ? (
            <a href={userData.github_url} className="text-blue-500 my-6">
              연결됨
            </a>
          ) : (
            <p className="text-gray-500 my-6">비연동</p>
          )}
        </div>
        <div className="mr-[180px]">
          <p className="">자기소개</p>

          <p className="text-gray-600">{userData.info}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
