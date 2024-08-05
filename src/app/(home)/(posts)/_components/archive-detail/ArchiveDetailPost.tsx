'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { timeForToday } from '@/utils/timeForToday';
import { useParams, useRouter } from 'next/navigation';
import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import { archiveDetailType } from '@/types/posts/archiveDetailTypes';
import { useAuth } from '@/context/auth.context';
import LikeButton from '@/components/common/LikeButton';
import BookmarkButton from '@/components/common/BookmarkButton';
import Share from '@/assets/images/common/Share';
import KebabButton from '@/assets/images/common/KebabButton';
import { handleRinkCopy } from '@/utils/handleRinkCopy';

const ArchiveDetailPost = ({ archiveDetail }: { archiveDetail: archiveDetailType[] }) => {
  const params = useParams();
  const router = useRouter();
  const { me } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // 게시글 데이터 가져오기
  const { data, error, isLoading } = useQuery<archiveDetailType[]>({
    queryKey: ['archiveDetail', params.id],
    queryFn: async () => {
      const response = await fetch(`/api/posts/archive-detail/${params.id}`);
      if (!response.ok) {
        throw new Error('데이터를 가져오는데 실패했습니다.');
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [data];
    }
  });

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
      // console.error(error);
      alert('게시글 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  });

  const handleKebabClick = () => {
    setIsMenuOpen((prev) => !prev);
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

  if (error || !data || data.length === 0) {
    return <div>게시글을 불러오는데 실패했습니다: {error?.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((post) => (
        <div key={post.id} className="w-full flex flex-col gap-2 p-4 border-b-[1px] ">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
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
                    <span>{post.updated_at !== post.created_at && '(수정됨)'}</span>
                  </p>
                </div>
              </div>
            </div>
            {me?.id === post.user.id && (
              <div className="relative">
                <button onClick={handleKebabClick} className="p-4">
                  <KebabButton />
                </button>
                {isMenuOpen ? (
                  <div className="w-[105px] right-0 absolute flex flex-col justify-center items-center bg-white shadow-lg border rounded-lg">
                    <button className="h-[44px]" onClick={() => handleEditClick(post.id)}>
                      게시글 수정
                    </button>
                    <button className="h-[44px]" onClick={() => handleDeleteClick(post.id)}>
                      게시글 삭제
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-h4 font-bold">{post.title}</p>
            <MDEditor.Markdown source={post.content} className="text-body1 font-regular" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-body1 text-neutral-400">{post.created_at.slice(0, 10).replace(/-/g, '.')}</p>
            <div className="flex gap-5">
              <LikeButton id={post.id} type="archive" />
              <BookmarkButton id={post.id} type="archive" />
              <button
                type="button"
                onClick={() => handleRinkCopy(`${process.env.NEXT_PUBLIC_BASE_URL}/archive/${post.id}`)}
              >
                <Share />
              </button>
              <div className="text-main-400 text-subtitle1 font-medium">{post.comment[0].count}개의 댓글</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchiveDetailPost;
