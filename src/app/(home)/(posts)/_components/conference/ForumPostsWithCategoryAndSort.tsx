'use client';

import useFetchForumPosts from '@/hooks/conference/useFetchForumPosts';
import { useState } from 'react';
import dayjs from 'dayjs';
import { ForumCategory, SortOption } from '@/types/posts/forum';

const ForumPostsWithCategoryAndSort = () => {
  const { data: posts, isPending, error } = useFetchForumPosts();
  const [activeCategory, setActiveCategory] = useState<ForumCategory>('전체');
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  const categories: ForumCategory[] = ['전체', '일상', '커리어', '자기개발', '토론', '코드리뷰'];
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'latest', label: '최신순' },
    { value: 'mostComments', label: '댓글순' },
    { value: 'mostLikes', label: '좋아요순' }
  ];

  const filterAndSortPosts = (category: string, sortMethod: string) => {
    if (!posts) return [];
    let filteredPosts = category === '전체' ? posts : posts.filter((post) => post.forum_category === category);

    switch (sortMethod) {
      case 'latest':
        return filteredPosts.sort((a, b) => dayjs(b.created_at).unix() - dayjs(a.created_at).unix());
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

  return (
    <div>
      <div className="category-and-sort">
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={activeCategory === category ? 'active' : ''}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="sort-dropdown">
          <select value={sortBy} onChange={handleSortChange}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="category-items">
        {isPending && <div>로딩중...</div>}
        {error && <div>에러 발생</div>}
        {!isPending && !error && posts && (
          <ul>
            {filterAndSortPosts(activeCategory, sortBy).map((post) => (
              <li key={post.id}>
                <div>
                  <h1>{post.title}</h1>
                  <p>댓글:{post.forum_comment[0]?.count || 0}</p>
                  <p>좋아요:{post.forum_like[0]?.count || 0}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ForumPostsWithCategoryAndSort;
