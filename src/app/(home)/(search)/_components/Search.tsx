'use client';

import { useEffect, useState } from 'react';
import SearchPostCard from './SearchPostCard';
import SearchFilter from './SearchFilter';
import { useSearchParams } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

type Post = {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  created_at: string;
  category: 'archive' | 'forum' | 'qna';
  forum_category?: string;
  likescount: string;
  commentsCount: string;

  user: {
    id: string;
    nickname: string;
    profile_image?: string;
  };
  tag?: { tag: string }[];
};

type SearchData = {
  archive: Post[];
  forum: Post[];
  qna: Post[];
};

const Search = () => {
  const [data, setData] = useState<SearchData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'qna' | 'forum' | 'archive'>('all');
  const [selectedForumCategory, setSelectedForumCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'time' | 'like' | 'comment'>('time');

  const searchParams = useSearchParams();
  const searchType = searchParams.get('searchType');
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    const fetchData = async () => {
      if (searchType && keyword) {
        try {
          const response = await fetch(`/api/search?searchType=${searchType}&keyword=${keyword}`);
          const data = await response.json();
          setData(data);
        } catch (error) {
          // console.error('Error fetching search data:', error);
        }
      }
    };

    fetchData();
  }, [searchType, keyword]);

  if (!data) return <div>Loading...</div>;

  const combined: Post[] = [...data.archive, ...data.forum, ...data.qna];

  const sortedItems = combined.sort((a, b) => {
    if (selectedType === 'time') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (selectedType === 'like') {
      return parseInt(b.likescount, 10) - parseInt(a.likescount, 10);
    }
    if (selectedType === 'comment') {
      return parseInt(b.commentsCount, 10) - parseInt(a.commentsCount, 10);
    }
    return 0;
  });

  const categoryFilteredItems =
    selectedCategory === 'all'
      ? sortedItems
      : selectedCategory === 'forum'
        ? sortedItems.filter(
            (item) =>
              item.category === 'forum' &&
              (selectedForumCategory === '전체' ||
                !selectedForumCategory ||
                item.forum_category === selectedForumCategory)
          )
        : sortedItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-[1204px]">
      <div className="flex flex-col ">
        <span className="mb-[88px]">
          {searchType === 'title' ? (
            <span className="text-neutral-900 text-h3 font-bold">{keyword}</span>
          ) : (
            <span className="text-neutral-900 text-h3 font-bold">#{keyword}</span>
          )}
          <span className="text-neutral-700 text-h3 font-normal"> 검색결과</span>
        </span>
        <div>
          {selectedCategory === 'all' ? (
            <div>
              <span className=" text-subtitle1 font-medium text-neutral-700"> 전체 게시글 </span>
              <span className="text-subtitle1 font-bold text-neutral-800">
                {' '}
                ({data.archive.length + data.forum.length + data.qna.length}){' '}
              </span>
            </div>
          ) : selectedCategory === 'archive' ? (
            <div>
              <span className=" text-subtitle1 font-medium text-neutral-700"> 아카이브 게시글 </span>
              <span className="text-subtitle1 font-bold text-neutral-800"> ({data.archive.length}) </span>
            </div>
          ) : selectedCategory === 'forum' ? (
            <div>
              <span className=" text-subtitle1 font-medium text-neutral-700"> 포럼 게시글 </span>
              <span className="text-subtitle1 font-bold text-neutral-800"> ({data.forum.length}) </span>
            </div>
          ) : (
            <div>
              <span className=" text-subtitle1 font-medium text-neutral-700"> Q&A 게시글 </span>
              <span className="text-subtitle1 font-bold text-neutral-800"> ({data.qna.length}) </span>
            </div>
          )}
        </div>
        <div className="relative">
          <SearchFilter
            selectedCategory={selectedCategory}
            selectedForumCategory={selectedForumCategory}
            selectedType={selectedType}
            onCategoryChange={setSelectedCategory}
            onForumCategoryChange={setSelectedForumCategory}
            onTypeChange={setSelectedType}
          />
        </div>
      </div>
      <div>
        {categoryFilteredItems.length === 0 ? (
          <div> {keyword} 검색 결과가 없습니다.</div>
        ) : (
          <div className="grid grid-cols-2 gap-y-9 gap-x-5 ">
            {categoryFilteredItems.map((post) => (
              <SearchPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Search;
