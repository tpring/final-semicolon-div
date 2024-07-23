import React from 'react';

type MyActivitiesHeaderProps = {
  setActiveTab: (tab: string) => void;
  activeTab: string;
};

const MyActivitiesHeader: React.FC<MyActivitiesHeaderProps> = ({ setActiveTab, activeTab }) => {
  return (
    <header>
      <nav className="w-full bg-[#E3E3E3] p-5 overflow-y-hidden">
        <ul className="flex justify-between mx-[50px]">
          <li
            className={`${activeTab === 'posts' ? 'text-black  ' : 'text-gray-500'}`}
            onClick={() => setActiveTab('posts')}
          >
            내가 쓴 글
          </li>
          <li
            className={`${activeTab === 'likes' ? 'text-black ' : 'text-gray-500'}`}
            onClick={() => setActiveTab('likes')}
          >
            좋아요 한 글
          </li>
          <li
            className={`${activeTab === 'bookmarks' ? 'text-black ' : 'text-gray-500'}`}
            onClick={() => setActiveTab('bookmarks')}
          >
            북마크
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MyActivitiesHeader;
