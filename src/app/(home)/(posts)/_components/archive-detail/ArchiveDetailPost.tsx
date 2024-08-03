'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { timeForToday } from '@/utils/timeForToday';
import { useParams, useRouter } from 'next/navigation';
import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import { archiveDetailType } from '@/types/posts/archiveDetailTypes';
import BackArrowIcon from '@/assets/images/upsert_image/BackArrowIcon';
import { useAuth } from '@/context/auth.context';
import LikeButton from '@/components/common/LikeButton';
import BookmarkButton from '@/components/common/BookmarkButton';
import Share from '@/assets/images/common/Share';
import { handleLinkCopy } from '@/components/handleLinkCopy';
import CommentBubble from '@/assets/images/common/CommentBubble';

import KebabButton from '@/assets/images/common/KebabButton';


const ArchiveDetailPost = () => {
  const params = useParams();
  const router = useRouter();
  const { me } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 게시글 데이터 가져오기
  const { data, error, isLoading } = useQuery<archiveDetailType>({
    queryKey: ['archiveDetail', params.id],
    queryFn: async () => {
      const response = await fetch(`/api/posts/archive-detail/${params.id}`);
      if (!response.ok) {
        throw new Error('데이터를 가져오는데 실패했습니다.');
      }
      const data = await response.json();
      return data;
    }
  });

  const archiveDetail = data ? [data] : [];

  // 게시글 삭제 기능
  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await fetch(`/api/posts/archive-detail/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: me?.id })
      });

      if (!response.ok) {
        throw new Error('게시글 삭제에 실패했습니다.');
      }
    },
    onSuccess: () => {
      alert('게시글이 성공적으로 삭제되었습니다.');
      router.back();
    },
    onError: (error: Error) => {
      console.error(error);
      alert('게시글 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  });

  const handleKebabClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleDeleteClick = (postId: string) => {
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      deleteMutation.mutate(postId);
    }
  };

  const handleEditClick = (postId: string) => {
    router.push(`/edit/${postId}?category=archive`);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>게시글을 불러오는데 실패했습니다: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <button onClick={handleBackClick} className="mb-4 px-4 py-2 text-white rounded-md w-16">
        <BackArrowIcon />
      </button>
      {archiveDetail.map((post) => (
        <div key={post.id} className="w-full flex flex-col gap-2 p-4 border-b-[1px] ">
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
              <Image
                src={post.user.profile_image}
                alt="archiveUserImage"
                width={100}
                height={100}
                className="rounded-full w-10 h-10"
              />
              <div>
                <h3>{post.user.nickname}</h3>
                <div className="flex justify-start items-center gap-3">
                  <p>
                    {timeForToday(post.updated_at ? post.updated_at : post.created_at)}
                    <span className="text-xs">{post.updated_at && '(수정됨)'}</span>
                  </p>
                </div>
              </div>
            </div>
            {/* 로그인한 유저와 게시글 작성자가 동일한 경우에만 Kebob 메뉴 표시 */}
            {me?.id === post.user.id && (
              <div className="relative">
                <button onClick={handleKebabClick} className="p-2">
                  <KebabButton />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-md shadow-xl z-10">
                    <button
                      onClick={() => handleEditClick(post.id)}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      게시글 수정
                    </button>
                    <button
                      onClick={() => handleDeleteClick(post.id)}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      게시글 삭제
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <h2>{post.title}</h2>
            <MDEditor.Markdown source={post.content} />
          </div>
          <div>
            <p>{post.created_at.slice(0, 16).replace(/-/g, '.').replace(/T/g, ' ')}</p>
            <LikeButton id={post.id} type="archive" />
            <BookmarkButton id={post.id} type="archive" />
            <div className="flex items-center justify-center">
              <button onClick={() => handleLinkCopy(`${process.env.NEXT_PUBLIC_BASE_URL}/forum/${post.id}`)}>
                <Share />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchiveDetailPost;
