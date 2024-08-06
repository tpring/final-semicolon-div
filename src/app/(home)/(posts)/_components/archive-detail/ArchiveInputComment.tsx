'use client';

import { revalidate } from '@/actions/revalidate';
import { useAuth } from '@/context/auth.context';
import { userComment } from '@/types/posts/archiveDetailTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmModal from '@/components/modal/ConfirmModal';

const ArchiveInputComments = () => {
  const params = useParams<{ id: string }>();
  const { me, userData } = useAuth();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const handleCommentChange = (value?: string) => {
    setComment(value ?? '');
  };

  const handleComment = useMutation({
    mutationFn: async (userComment: userComment) => {
      const response = await fetch(`/api/posts/archive-detail/archive-comments/${params.id}`, {
        method: 'POST',
        body: JSON.stringify({ userComment })
      });
      const result = await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveComments'] });
      if (comment) {
        setComment('');
        revalidate('/', 'page');
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const archiveComment = { user_id: me?.id, post_id: params.id, comment };

    if (!me?.id) {
      toast.error('로그인 후 입력 가능합니다.', {
        autoClose: 2000
      });
      return;
    }
    if (comment === '') {
      toast.error('댓글을 입력해주세요!', {
        autoClose: 2000
      });
      return;
    }

    handleComment.mutate(archiveComment);
  };

  const handleCancelClick = () => {
    setShowModal(true);
  };

  const handleConfirmCancel = () => {
    setComment('');
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-start items-center  py-6 px-5  ">
      <form className=" w-full" onSubmit={handleSubmit}>
        <div className=" flex justify-center items-center gap-6" data-color-mode="light">
          <Image
            src={userData?.profile_image ?? ''}
            alt="user profile image"
            width={48}
            height={48}
            className=" rounded-full"
          />
          <MDEditor
            value={comment}
            onChange={handleCommentChange}
            preview="edit"
            extraCommands={commands.getCommands().filter(() => false)}
            commands={commands.getCommands().filter((command) => {
              return command.name !== 'image';
            })}
            textareaProps={{ maxLength: 1000 }}
            className="w-full "
          />
        </div>
        <div className=" flex justify-end items-end gap-6 mt-6">
          <button
            type="button"
            className="bg-neutral-50 hover:bg-neutral-100 hover:text-neutral-600 text-neutral-100 px-5 py-3 rounded-lg"
            onClick={handleCancelClick}
          >
            취소
          </button>
          <button
            className={`px-5 py-3 rounded-lg ${
              comment ? 'bg-main-500 hover:bg-main-600 text-main-50' : 'bg-main-100 text-main-50'
            }`}
            disabled={!comment}
          >
            등록
          </button>
        </div>
      </form>
      {showModal && (
        <ConfirmModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmCancel}
          message={'댓글 작성을 취소 하시겠습니까?'}
        />
      )}
    </div>
  );
};

export default ArchiveInputComments;
