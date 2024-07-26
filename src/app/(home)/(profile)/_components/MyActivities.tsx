'use client';

import useActiveTabStore from '@/store/useActiveTabStore';
import MyPostsList from './myactivities/MyPostsList';
import LikesList from './myactivities/LikesList';
import MyActivitiesHeader from './myactivities/MyActivitiesHeader';
import BookmarksList from './myactivities/BookmarksList';

const MyActivities = () => {
  const activeTab = useActiveTabStore((state) => state.activeTab);
  const setActiveTab = useActiveTabStore((state) => state.setActiveTab);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'posts':
        return <MyPostsList />;
      case 'likes':
        return <LikesList />;
      case 'bookmarks':
        return <BookmarksList />;
    }
  };

  return (
    <div>
      <MyActivitiesHeader setActiveTab={setActiveTab} activeTab={activeTab} />
      {renderActiveTab()}
    </div>
  );
};

export default MyActivities;
