import { useEffect, useState } from 'react';
import { MyCombinedItem } from '@/types/profile/profileType';
import { myCombineItems } from '@/utils/combineItems';
import PostCard from './common/PostCard';
import CommentCard from './common/CommentCard';
import MyActivitiesPagination from './common/MyActivitiesPagination';
import { useMyComments, useMyPosts } from '@/hooks/myactivities/useMyPosts';
import { useAuth } from '@/context/auth.context';
import { toast, ToastContainer } from 'react-toastify';
import ConfirmModal from '@/components/modal/ConfirmModal';
import Check from '@/assets/images/common/Check';

type MyPostsListProps = {
  onTotalsChange?: (postCount: number, commentCount: number) => void;
  selectedCategory: 'all' | 'qna' | 'forum' | 'archive';
  selectedForumCategory: string | null;
  selectedType: 'all' | 'post' | 'comment';
};

const MyPostsList = ({ onTotalsChange, selectedCategory, selectedForumCategory, selectedType }: MyPostsListProps) => {
  const { userData } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Map<string, { category: string; type: string }>>(new Map());
  const [combinedItems, setCombinedItems] = useState<MyCombinedItem[]>([]);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedItems(new Map());
  }, [selectedCategory, selectedForumCategory, selectedType]);

  useEffect(() => {
    setSelectedItems(new Map());
    setSelectAll(false);
  }, [currentPage]);

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

  useEffect(() => {
    if (!postLoading && !commentLoading && posts && comments) {
      const combined = myCombineItems(posts, comments);
      combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setCombinedItems(combined);

      const totalPosts = posts.archivePosts.length + posts.forumPosts.length + posts.qnaPosts.length;
      const totalComments =
        comments.archive.comments.length + comments.forum.comments.length + comments.qna.comments.length;

      if (onTotalsChange) {
        onTotalsChange(totalPosts, totalComments);
      }
    }
  }, [postLoading, commentLoading, posts, comments, onTotalsChange]);

  if (postLoading || commentLoading) return <div>Loading...</div>;
  if (postError || commentError) return <div>Error: {postError?.message || commentError?.message}</div>;

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

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(e.target.checked);
    setSelectedItems((prev) => {
      const newMap = new Map(prev);
      paginatedItems.forEach((item) => {
        if (!newMap.has(item.id)) {
          newMap.set(item.id, { category: item.category, type: item.type });
        }
      });
      return newMap;
    });
  };

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
        const response = await fetch('/api/profile/myposts', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ postsToDelete })
        });
        if (!response.ok) throw new Error('게시글 삭제 요청 실패');
      }

      if (commentsToDelete.length > 0) {
        const response = await fetch('/api/profile/mycomments', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ commentsToDelete })
        });
        if (!response.ok) throw new Error('댓글 삭제 요청 실패');
      }

      // 업데이트된 combinedItems 생성
      const updatedCombinedItems = combinedItems.filter((item) => !selectedItems.has(item.id));

      // 상태 업데이트
      setCombinedItems(updatedCombinedItems);
      setSelectedItems(new Map());
      setSelectAll(false);

      toast.success('삭제가 완료 되었습니다.');
    } catch (error) {
      // console.error('삭제 처리 중 오류 발생:', error);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="flex mb-[40px] items-center">
        <label className="flex items-center">
          <input type="checkbox" checked={selectAll} onChange={handleSelectAll} hidden />
          {selectedItems.size === 0 ? (
            <span className="mr-4 flex border border-neutral-200 text-neutral-500 rounded p-[8px_16px] h-[40px] mt-6">
              <Check stroke="#757575" />
              전체선택
            </span>
          ) : (
            <span className="mr-4 flex border border-main-400 text-main-400 bg-sub-50  rounded p-[8px_16px] h-[40px] mt-6">
              <Check stroke="#423edf" />
              전체선택
            </span>
          )}
        </label>
        {selectedItems.size === 0 ? (
          <button
            onClick={() => toast.error('삭제할 게시물을 선택해주세요')}
            className="border border-neutral-200 text-neutral-500 rounded p-[8px_16px] h-[40px] mt-6"
          >
            삭제
          </button>
        ) : (
          <button
            onClick={() => setConfirmModalOpen(true)}
            className="border border-neutral-200 text-neutral-500 rounded p-[8px_16px] h-[40px] mt-6"
          >
            {selectedItems.size} 삭제
          </button>
        )}
      </div>
      <ToastContainer />
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
                created_at={item.created_at}
                category={item.category}
                likesCount={item.likesCount}
                commentsCount={item.commentsCount}
                forum_category={item.forum_category}
                nickname={userData?.nickname || ''}
                isSelected={selectedItems.has(item.id)}
                onCheckboxChange={(id) => handleCheckboxChange(id, item.category, 'post')}
              />
            ) : (
              <CommentCard
                id={item.id}
                post_id={item.post_id}
                title={item.title}
                tags={item.tags}
                comment={item.comment}
                time={new Date(item.created_at)}
                category={item.category}
                nickname={userData?.nickname || ''}
                profile_image={userData?.profile_image || ''}
                forum_category={item.forum_category}
                likesCount={item.likesCount}
                commentsCount={item.commentsCount}
                created_at={item.created_at}
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
