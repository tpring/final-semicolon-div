'use client';

import { timeForToday } from '@/utils/timeForToday';
import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import LikeButton from '@/components/common/LikeButton';
import BookmarkButton from '@/components/common/BookmarkButton';
import { handleRinkCopy } from '@/utils/handleRinkCopy';
import Share from '@/assets/images/common/Share';
import { useAuth } from '@/context/auth.context';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import KebabButton from '@/assets/images/common/KebabButton';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { archiveDetailType } from '@/types/posts/archiveDetailTypes';

const ArchiveDetailPost = ({ archiveDetail }: { archiveDetail: archiveDetailType[] }) => {
  const { me } = useAuth();
  const param = useParams();
  const router = useRouter();
  const [kebobToggle, setKebobToggle] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const handlePostDelete = async () => {
    const response = await fetch(`/api/posts/archive-detail/${param.id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id: me?.id })
    });
    router.push('/');
    return;
  };

  const handlePostRetouch = () => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/edit/${param.id}?category=archive`);
  };

  return (
    <div className="flex flex-col gap-4">
      {archiveDetail?.map((post: archiveDetailType) => (
        <div key={post.id} className="w-full flex flex-col gap-6 border-b-[1px] ">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Image
                src={post.user.profile_image}
                alt="forumUserImage"
                width={50}
                height={50}
                className="rounded-full w-[48px] h-[48px]"
              />
              <div className="flex flex-col gap-2">
                <p className="text-subtitle1 font-medium">{post.user.nickname}</p>
                <div className="flex justify-start items-center gap-2">
                  <p className="text-body2 font-regular text-neutral-300">
                    {timeForToday(post.updated_at ? post.updated_at : post.created_at)}
                    <span>{post.updated_at !== post.created_at && '(수정됨)'}</span>
                  </p>
                </div>
              </div>
            </div>
            {post.user_id === me?.id && (
              <div className="relative">
                <div className="p-4" onClick={() => setKebobToggle(!kebobToggle)}>
                  <KebabButton />
                </div>
                {kebobToggle && (
                  <div className="w-[105px] right-0 absolute flex flex-col justify-center items-center shadow-lg border rounded-lg">
                    <button
                      className="h-[44px] w-full rounded-t-lg hover:bg-main-50 hover:text-main-400"
                      onClick={handlePostRetouch}
                    >
                      게시글 수정
                    </button>
                    <button
                      className="h-[44px] w-full rounded-b-lg hover:bg-main-50 hover:text-main-400"
                      onClick={() => setConfirmModal(true)}
                    >
                      게시글 삭제
                    </button>
                  </div>
                )}
                {confirmModal && (
                  <div>
                    <ConfirmModal
                      isOpen={confirmModal}
                      onClose={() => setConfirmModal(false)}
                      onConfirm={handlePostDelete}
                      message={'게시글을 삭제하시겠습니까?'}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6 whitespace-pre-wrap break-words" data-color-mode="light">
            <p className="text-h4 font-bold">{post.title}</p>
            <MDEditor.Markdown source={post.content} className="text-body1 font-regular" />
          </div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-body1 font-regular text-neutral-400">
              {post.created_at.slice(0, 10).replace(/-/g, '.')}
            </p>
            <div className="flex gap-5">
              <LikeButton id={post.id} type="archive" />
              <BookmarkButton id={post.id} type="archive" />
              <button
                type="button"
                onClick={() => handleRinkCopy(`${process.env.NEXT_PUBLIC_BASE_URL}/archive/${post.id}`)}
              >
                <Share />
              </button>
              <p className="text-subtitle1 font-medium text-main-400">{post.comment[0].count}개의 댓글</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArchiveDetailPost;
