import { useEffect, useState } from 'react';

import { MyCombinedItem } from '@/types/profile/profileType';
import { myCombineItems } from '@/utils/combineItems';
import FilterControls from './common/FilterControls';
import PostCard from './common/PostCard';
import CommentCard from './common/CommentCard';
import MyActivitiesPagination from './common/MyActivitiesPagination';
import { useMyComments, useMyPosts } from '@/hooks/myactivities/useMyPosts';
import { useAuth } from '@/context/auth.context';
import ConfirmModal from '@/components/modal/ConfirmModal';

const MyPostsList = () => {
  const { userData } = useAuth();
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

  const {
    data: posts = { archivePosts: [], forumPosts: [], qnaPosts: [] },
    error: postError,
    isLoading: postLoading
  } = useMyPosts();

  const {
    data: comments = {
      archive: { posts: [], comments: [] },
      forum: { posts: [], comments: [] },
      qna: { posts: [], comments: [] }
    },
    error: commentError,
    isLoading: commentLoading
  } = useMyComments();

  if (postLoading || commentLoading) return <div>Loading...</div>;
  if (postError || commentError) return <div>Error: {postError?.message || commentError?.message}</div>;

  const combinedItems: MyCombinedItem[] = myCombineItems(posts, comments);

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
      // 카테고리별로 삭제할 항목들을 분리
      const postsToDelete: { id: string; category: string }[] = [];
      const commentsToDelete: { id: string; category: string }[] = [];

      // 선택된 항목을 기반으로 posts와 comments를 카테고리별로 분류
      selectedItems.forEach((value, key) => {
        if (value.type === 'post') {
          postsToDelete.push({ id: key, category: value.category });
        } else if (value.type === 'comment') {
          commentsToDelete.push({ id: key, category: value.category });
        }
      });

      // 포스트 삭제 요청
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

      // 댓글 삭제 요청
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
      <h2>내가 쓴 글 목록</h2>
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
        <div>내가 쓴 글을 추가해보세요</div>
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
                nickname={userData?.nickname || ''}
                profile_image={userData?.profile_image || ''}
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
                nickname={userData?.nickname || ''}
                profile_image={userData?.profile_image || ''}
                isSelected={selectedItems.has(item.id)}
                onCheckboxChange={(id) => handleCheckboxChange(id, item.category, 'comment')}
              />
            )}
          </div>
        ))
      )}
      <div className="flex justify-between items-center">
        <MyActivitiesPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
      <ConfirmModal
        message={'삭제 할까요?'}
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default MyPostsList;
