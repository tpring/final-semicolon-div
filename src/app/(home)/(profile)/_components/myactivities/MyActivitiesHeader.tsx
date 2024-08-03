type MyActivitiesHeaderProps = {
  setActiveTab: (tab: string) => void;
  activeTab: string;
};

const MyActivitiesHeader = ({ setActiveTab, activeTab }: MyActivitiesHeaderProps) => {
  return (
    <header>
      <nav>
        <ul className=" h-[50px] flex justify-between items-center text-center ">
          <li
            className={`h-[50px] w-[283px] center-alignment ${activeTab === 'posts' ? 'text-main-400 border border-sub-50 bg-sub-50 rounded-t-2xl' : 'text-neutral-300'}`}
            onClick={() => setActiveTab('posts')}
          >
            내가 쓴 글
          </li>
          <li
            className={` h-[50px] w-[283px] center-alignment ${activeTab === 'likes' ? 'text-main-400 border border-sub-50 bg-sub-50 rounded-t-2xl' : 'text-neutral-300'}`}
            onClick={() => setActiveTab('likes')}
          >
            좋아요 한 글
          </li>
          <li
            className={` h-[50px] w-[283px] center-alignment ${activeTab === 'bookmarks' ? 'text-main-400 border border-sub-50 bg-sub-50 rounded-t-2xl' : 'text-neutral-300'}`}
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
