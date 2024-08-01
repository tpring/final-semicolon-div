'use client';

import useFetchForumPosts from '@/hooks/forum/useFetchForumPosts';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ForumCategory, Post, SortOption } from '@/types/posts/forumTypes';
import PostCard from './PostCard';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import Down from '@/assets/images/common/Down';
import SortDropdown from '@/components/common/SortDropdownGrey';
import CategoryTabs from './CategoryTabs';
import WriteButton from '@/assets/images/forum/WriteButton';

const ForumPostsWithCategoryAndSort = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, error } = useFetchForumPosts();
  const [activeCategory, setActiveCategory] = useState<ForumCategory>('전체');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [ref, inView] = useInView();

  const categories: ForumCategory[] = ['전체', '일상', '커리어', '자기개발', '토론', '코드리뷰'];
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'latest', label: '최신순' },
    { value: 'mostComments', label: '댓글순' },
    { value: 'mostLikes', label: '좋아요순' }
  ];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const filterAndSortPosts = (posts: Post[], category: ForumCategory, sortMethod: SortOption): Post[] => {
    let filteredPosts = category === '전체' ? posts : posts.filter((post) => post.forum_category === category);

    switch (sortMethod) {
      case 'latest':
        return filteredPosts.sort((a, b) => dayjs(b.updated_at).unix() - dayjs(a.updated_at).unix());
      case 'mostComments':
        return filteredPosts.sort((a, b) => (b.forum_comment[0]?.count || 0) - (a.forum_comment[0]?.count || 0));
      case 'mostLikes':
        return filteredPosts.sort((a, b) => (b.forum_like[0]?.count || 0) - (a.forum_like[0]?.count || 0));
      default:
        return filteredPosts;
    }
  };

  const handleCategoryClick = (category: ForumCategory) => {
    setActiveCategory(category);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortOption);
  };

  const allPosts = data?.pages.flatMap((page) => page.data) || [];
  const filteredAndSortedPost = filterAndSortPosts(allPosts, activeCategory, sortBy);

  return (
    <div>
      <div className="category-and-sort flex items-center justify-between max-w-[844px] mx-auto">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          handleCategoryClick={handleCategoryClick}
        />
        <SortDropdown sortBy={sortBy} handleSortChange={handleSortChange} sortOptions={sortOptions} />
      </div>
      <div className="mt-8 mb-8 max-w-[844px] mx-auto border-b-2 border-b-neutral-50">
        <Link href="/posting">
          <WriteButton />
        </Link>
      </div>
      <div className="category-items max-w-[844px] mx-auto">
        {isPending && <div>로딩중...</div>}
        {error && <div>에러 발생</div>}
        {!isPending && !error && filteredAndSortedPost.length === 0 && <div>게시글이 없습니다.</div>}
        {!isPending && !error && filteredAndSortedPost.length > 0 && (
          <div className="posts-card">
            {filteredAndSortedPost.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
        {isFetchingNextPage && <div>추가 게시물 로딩중...</div>}
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default ForumPostsWithCategoryAndSort;
