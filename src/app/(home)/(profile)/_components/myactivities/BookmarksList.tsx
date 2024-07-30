import { useState } from 'react';
import PostCard from './common/PostCard';
import CommentCard from './common/CommentCard';
import { useBookmarksComments, useBookmarksPosts } from '@/hooks/useBookmarks';
import { CombinedItem } from '@/types/profile/profileType';
import { combineItems } from '@/utils/combineItems';
import FilterControls from './common/FilterControls';
import MyActivitiesPagination from './common/MyActivitiesPagination';

const BookmarksList = () => {
  const forumCategories = ['일상', '커리어', '자기개발', '토론', '코드 리뷰'];
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'qna' | 'forum' | 'archive'>('all');
  const [selectedForumCategory, setSelectedForumCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'post' | 'comment'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const {
    data: posts = { archivePosts: [], forumPosts: [], qnaPosts: [] },
    error: postError,
    isLoading: postLoading
  } = useBookmarksPosts();

  const {
    data: comments = {
      archive: { posts: [], comments: [] },
      forum: { posts: [], comments: [] },
      qna: { posts: [], comments: [] }
    },
    error: commentError,
    isLoading: commentLoading
  } = useBookmarksComments();

  if (postLoading || commentLoading) return <div>Loading...</div>;
  if (postError || commentError) return <div>Error: {postError?.message || commentError?.message}</div>;

  const combinedItems: CombinedItem[] = combineItems(posts, comments);

  combinedItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const categoryFilteredItems =
    selectedCategory === 'all'
      ? combinedItems
      : selectedCategory === 'forum'
        ? combinedItems.filter(
            (item) =>
              item.category === 'forum' &&
              (selectedForumCategory === '전체' ||
                !selectedForumCategory ||
                item.forum_category === selectedForumCategory)
          )
        : combinedItems.filter((item) => item.category === selectedCategory);

  const typeFilteredItems =
    selectedType === 'all' ? categoryFilteredItems : categoryFilteredItems.filter((item) => item.type === selectedType);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(typeFilteredItems.length / itemsPerPage);
  const paginatedItems = typeFilteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDelete = async () => {
    try {
      const idsToDelete = Array.from(selectedItems);
      const response = await fetch('/api/bookmarks/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: idsToDelete })
      });

      if (!response.ok) throw new Error('삭제 실패');
    } catch (error) {
      console.error('Error deleting bookmarks:', error);
    }
  };

  return (
    <div className="relative min-h-screen">
      <h2>북마크 목록</h2>
      <button onClick={handleDelete} className="border bg-sub-200 text-white rounded">
        선택한 항목 삭제
      </button>
      <FilterControls
        selectedCategory={selectedCategory}
        selectedForumCategory={selectedForumCategory}
        selectedType={selectedType}
        onCategoryChange={setSelectedCategory}
        onForumCategoryChange={setSelectedForumCategory}
        onTypeChange={setSelectedType}
        forumCategories={forumCategories}
      />
      {paginatedItems.length === 0 ? (
        <div>북마크를 추가해보세요</div>
      ) : (
        paginatedItems.map((item) => (
          <div key={item.id} className="mb-6">
            {item.type === 'post' ? (
              <PostCard
                id={item.id}
                title={item.title}
                content={item.content}
                thumbnail={item.thumbnail}
                tags={item.tags}
                time={item.created_at}
                category={item.category}
                forum_category={item.forum_category}
                nickname={item.user.nickname}
                profile_image={item.user.profile_image}
                isSelected={selectedItems.has(item.id)}
                onCheckboxChange={handleCheckboxChange}
              />
            ) : (
              <CommentCard
                id={item.id}
                title={item.title}
                comment={item.comment}
                tags={item.tags}
                time={new Date(item.created_at)}
                category={item.category}
                nickname={item.user.nickname}
                profile_image={item.user.profile_image}
                isSelected={selectedItems.has(item.id)}
                onCheckboxChange={handleCheckboxChange}
              />
            )}
          </div>
        ))
      )}
      <div className="flex justify-between items-center">
        <MyActivitiesPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
};

export default BookmarksList;
