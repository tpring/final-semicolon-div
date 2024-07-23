'use client';

import React, { useState } from 'react';
import useActiveTabStore from '@/store/useActiveTabStore';
import MyPostsList from './myactivities/MyPostsList';
import LikesList from './myactivities/LikesList';
import BookmarksList from './myactivities/BookmarksList';
import MyActivitiesHeader from './myactivities/MyActivitiesHeader';

//임시
type PostType = 'all' | 'QnA' | 'archiving' | 'forum';

const MyActivities = () => {
  const activeTab = useActiveTabStore((state) => state.activeTab);
  const setActiveTab = useActiveTabStore((state) => state.setActiveTab);
  const [filter, setFilter] = useState<PostType>('all');

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as PostType);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'posts':
        return <MyPostsList filter={filter} />;
      case 'likes':
        return <LikesList filter={filter} />;
      case 'bookmarks':
        return <BookmarksList filter={filter} />;
    }
  };

  return (
    <div>
      <MyActivitiesHeader setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab && (
        <div>
          <select id="filter" value={filter} onChange={handleFilterChange} className="p-2 border rounded">
            <option value="all">전체</option>
            <option value="QnA">QnA</option>
            <option value="archiving">아카이빙</option>
            <option value="forum">포럼</option>
          </select>
          {renderActiveTab()}
        </div>
      )}
    </div>
  );
};

export default MyActivities;
