import { useState, useEffect } from 'react';
import { useLikesComments, useLikesPosts } from '@/hooks/useLikes';
import { CombinedItem } from '@/types/profile/profileType';
import { combineItems } from '@/utils/combineItems';
import FilterControls from './common/FilterControls';
import PostCard from './common/PostCard';
import CommentCard from './common/CommentCard';
import MyActivitiesPagination from './common/MyActivitiesPagination';
import ConfirmModal from '@/components/modal/ConfirmModal';

const LikesList = () => {
  const forumCategories = ['일상', '커리어', '자기개발', '토론', '코드 리뷰'];
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'qna' | 'forum' | 'archive'>('all');
  const [selectedForumCategory, setSelectedForumCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'post' | 'comment'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Map<string, { category: string; type: string }>>(new Map());
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedForumCategory, selectedType]);

  // 데이터 훅
  const {
    data: posts = { archivePosts: [], forumPosts: [], qnaPosts: [] },
    error: postError,
    isLoading: postLoading
  } = useLikesPosts();

  const {
    data: comments = {
      archive: { posts: [], comments: [] },
      forum: { posts: [], comments: [] },
      qna: { posts: [], comments: [] }
    },
    error: commentError,
    isLoading: commentLoading
  } = useLikesComments();

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

  const handleCheckboxChange = (id: string, category: string, type: string) => {
    setSelectedItems((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(id)) {
        newMap.delete(id);
      } else {
        newMap.set(id, { category, type });
      }
      return newMap;
    });
  };

  const handleDelete = async () => {
    try {
      const postsToDelete: { id: string; category: string }[] = [];
      const commentsToDelete: { id: string; category: string }[] = [];

      selectedItems.forEach((value, key) => {
        if (value.type === 'post') {
          postsToDelete.push({ id: key, category: value.category });
        } else if (value.type === 'comment') {
          commentsToDelete.push({ id: key, category: value.category });
        }
      });

      if (postsToDelete.length > 0) {
        const response = await fetch('/api/profile/likesposts', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ postsToDelete })
        });
        if (!response.ok) throw new Error('포스트 삭제 요청 실패');
      }

      if (commentsToDelete.length > 0) {
        const response = await fetch('/api/profile/likescomments', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ commentsToDelete })
        });
        if (!response.ok) throw new Error('댓글 삭제 요청 실패');
      }

      setSelectedItems(new Map());
    } catch (error) {
      console.error('삭제 처리 중 오류 발생:', error);
    }
  };

  return (
    <div className="relative min-h-screen">
      <h2>좋아요 목록</h2>
      <button onClick={() => setConfirmModalOpen(true)} className="border bg-sub-200 text-white rounded">
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
        <div>좋아요를 추가해보세요</div>
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
                onCheckboxChange={(id) => handleCheckboxChange(id, item.category, 'post')}
              />
            ) : (
              <CommentCard
                id={item.id}
                title={item.title}
                tags={item.tags}
                comment={item.comment}
                time={new Date(item.created_at)}
                category={item.category}
                nickname={item.user.nickname}
                profile_image={item.user.profile_image}
                isSelected={selectedItems.has(item.id)}
                onCheckboxChange={(id) => handleCheckboxChange(id, item.category, 'comment')}
              />
            )}
          </div>
        ))
      )}
      <MyActivitiesPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <ConfirmModal
        message={'삭제 할까요?'}
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default LikesList;
