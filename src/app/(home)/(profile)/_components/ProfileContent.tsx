'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useActiveTabStore from '@/store/useActiveTabStore';
import { useAuth } from '@/context/auth.context';
import Right from '@/assets/images/common/Right';
import UnfilledBookmark from '@/assets/images/bookmark/UnfilledBookmark';
import UnfilledLike from '@/assets/images/like/UnfilledLike';

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
            console.error('error:', data.error);
          }
        } catch (error) {
          console.error('fetching error:', error);
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
    <div className=" flex items-center mb-4">
      <div className="w-[285px] h-[442px] border border-sub-200 rounded-lg bg-white mr-6">
        <div className="h-[334px] flex flex-col justify-center items-center">
          <div className=" w-[120px] h-[120px] border mb-[20px] border-sub-100 rounded-full overflow-hidden">
            <Image
              src={userData.profile_image!}
              alt="프로필 이미지"
              width={120}
              height={120}
              className="w-full h-full object-cover bg-white"
              priority
            />
          </div>
          <p className="text-lg font-semibold">{userData.nickname}</p>
        </div>
        <div className=" bottom-0 left-0 right-0 flex justify-between  ">
          <Link href="/profile/activities">
            <div className="container" onClick={handleBookmarkClick}>
              <UnfilledBookmark width={29} height={29} stroke="#0F0F0F" />
              <p className="text-gray-600">북마크 {bookmarkCount}</p>
            </div>
          </Link>
          <span className="w-[1px] h-100% bg-neutral-50" />
          <Link href="/profile/activities">
            <div className="container" onClick={handleLikeClick}>
              <UnfilledLike width={29} height={29} stroke="#0F0F0F" />
              <p className="text-gray-600">좋아요 {likeCount}</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-[537px] h-[442px] flex flex-col p-6 border border-sub-200 rounded-lg bg-white">
        <Link href={'/profile/settings'}>
          <div className="text-h5 font-bold flex justify-between p-[24px_0_24px_0]">
            <span> 계정 설정 </span>
            <Right width={8} height={14} />
          </div>
        </Link>
        <span className="w-100%  h-[1px] bg-neutral-50" />
        <div className="text-subtitle font-medium flex justify-between ">
          <p className="my-6">깃허브 링크</p>
          {userData.github_url ? (
            <a href={userData.github_url} className="text-blue-500 my-6">
              연결됨
            </a>
          ) : (
            <p className="text-neutral-600 my-6"> 비연동 </p>
          )}
        </div>
        <div className="p-[24px_0_24px_0]">
          <p className="text-subtitle font-medium mb-[8px]"> 자기소개 </p>

          <p className="text-body1 font-regular text-neutral-700 line-clamp-5 whitespace-pre-wrap">{userData.info}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
