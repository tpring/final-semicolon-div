'use client';

import useActiveTabStore from '@/store/useActiveTabStore';
import MyPostsList from './myactivities/MyPostsList';
import LikesList from './myactivities/LikesList';
import MyActivitiesHeader from './myactivities/MyActivitiesHeader';
import BookmarksList from './myactivities/BookmarksList';
import { useAuth } from '@/context/auth.context';
import Image from 'next/image';
import { useState } from 'react';
import FilterControls from './myactivities/common/FilterControls';

const MyActivities = () => {
  const [postCount, setPostCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'qna' | 'forum' | 'archive'>('all');
  const [selectedForumCategory, setSelectedForumCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'post' | 'comment'>('all');

  const activeTab = useActiveTabStore((state) => state.activeTab);
  const setActiveTab = useActiveTabStore((state) => state.setActiveTab);
  const { userData } = useAuth();

  const handleTotalsChange = (postCount: number, commentCount: number) => {
    setPostCount(postCount);
    setCommentCount(commentCount);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <MyPostsList
            onTotalsChange={handleTotalsChange}
            selectedCategory={selectedCategory}
            selectedForumCategory={selectedForumCategory}
            selectedType={selectedType}
          />
        );
      case 'likes':
        return (
          <LikesList
            selectedCategory={selectedCategory}
            selectedForumCategory={selectedForumCategory}
            selectedType={selectedType}
          />
        );
      case 'bookmarks':
        return (
          <BookmarksList
            selectedCategory={selectedCategory}
            selectedForumCategory={selectedForumCategory}
            selectedType={selectedType}
          />
        );
    }
  };

  return (
    <div>
      <div className="border w-[850px] mb-[57px] border-sub-100 rounded-2xl p-[0_24px]">
        <div className="flex flex_clo items-center my-3">
          <div className="relative w-12 h-12 border border-neutral-50 rounded-full overflow-hidden bg-white cursor-pointer">
            {userData?.profile_image && (
              <Image
                src={userData.profile_image}
                alt="프로필 이미지"
                fill
                priority
                className="rounded-full object-cover"
                sizes="48px"
              />
            )}
          </div>
          <span className="text-neutral-800 text-h5 font-bold ml-4">{userData?.nickname}</span>
        </div>
        <div className="my-3">
          <span className="text-body1 text-neutral-700 font-regular">총 게시글 </span>
          <span className="text-body1 text-main-400 font-regular"> {postCount} </span>
          <span className="text-body1 text-neutral-700 font-regular">개 </span>
          <span className="border-r-2 border-neutral-100 mx-[8px]" />
          <span className="text-body1 text-neutral-700 font-regular"> 총 댓글 </span>
          <span className="text-body1 text-main-400 font-regular"> {commentCount}</span>
          <span className="text-body1 text-neutral-700 font-regular"> 개 </span>
        </div>
      </div>
      <MyActivitiesHeader setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="relative min-h-screen">
        <FilterControls
          selectedCategory={selectedCategory}
          selectedForumCategory={selectedForumCategory}
          selectedType={selectedType}
          onCategoryChange={setSelectedCategory}
          onForumCategoryChange={setSelectedForumCategory}
          onTypeChange={setSelectedType}
          forumCategories={['일상', '커리어', '자기개발', '토론', '코드 리뷰']}
        />
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default MyActivities;
