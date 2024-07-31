'use client';

import { useEffect, useState } from 'react';
import SearchPostCard from './SearchPostCard';
import SearchFilter from './SearchFilter';

type Post = {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  created_at: string;
  category: 'archive' | 'forum' | 'qna';
  forum_category?: string;
  user: {
    id: string;
    nickname: string;
    profile_image?: string;
  };
  tag?: { tag: string }[];
  likecount: { count: string }[];
  commentsCount: string;
};

type SearchData = {
  archive: Post[];
  forum: Post[];
  qna: Post[];
};

const Search = () => {
  const [data, setData] = useState<SearchData | null>(null);

  const forumCategories = ['일상', '커리어', '자기개발', '토론', '코드 리뷰'];
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'qna' | 'forum' | 'archive'>('all');
  const [selectedForumCategory, setSelectedForumCategory] = useState<string | null>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const searchType = searchParams.get('searchType');
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    if (searchType && keyword) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/search?searchType=${searchType}&keyword=${keyword}`);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching search data:', error);
        }
      };
      fetchData();
    }
  }, [searchType, keyword]);

  if (!data) return <div>Loading...</div>;

  const combined: Post[] = [...data.archive, ...data.forum, ...data.qna];


  combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const categoryFilteredItems = combined.filter((item) => {
    if (selectedCategory === 'all') return true;
    if (item.category !== selectedCategory) return false;
    if (selectedCategory === 'forum' && selectedForumCategory !== '전체' && selectedForumCategory !== null) {
      return item.forum_category === selectedForumCategory;
    }
    return true;
  });

  return (
    <div>
      <div className="flex flex-col">
        <p>{keyword} 검색 결과</p>
        <p>전체 {combined.length}</p>
        <SearchFilter
          selectedForumCategory={selectedForumCategory}
          onCategoryChange={setSelectedCategory}
          onForumCategoryChange={setSelectedForumCategory}
          forumCategories={forumCategories}
        />
        {categoryFilteredItems.length === 0 ? (
          <div>검색 결과가 없습니다.</div>
        ) : (
          <div>
            {categoryFilteredItems.map((post) => (
              <SearchPostCard key={post.id} post={post} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Search;
