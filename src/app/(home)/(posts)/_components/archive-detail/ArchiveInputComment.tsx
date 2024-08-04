'use client';

import { useAuth } from '@/context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ArchiveInputComments = () => {
  const params = useParams<{ id: string }>();
  const { me } = useAuth();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState<string>('');

  const handleCommentChange = (value?: string) => {
    setComment(value || '');
  };

  const handleComment = useMutation({
    mutationFn: async (userComment: any) => {
      const response = await fetch(`/api/posts/archive-detail/archive-comments/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userComment })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to post comment');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveComments', params.id] });
      setComment('');
      toast.success('댓글이 등록되었습니다.', {
        autoClose: 2000
      });
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message}`, {
        autoClose: 2000
      });
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
    if (comment.trim() === '') {
      toast.error('댓글을 입력해주세요!', {
        autoClose: 2000
      });
      return;
    }

    handleComment.mutate(archiveComment);
  };

  return (
    <div className="flex justify-start items-center border rounded-xl p-4 ">
      <form className="flex flex-col justify-end items-end w-full gap-2" onSubmit={handleSubmit}>
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
        <div className="flex justify-end items-end gap-2">
          <button
            type="button"
            className="w-[71px] h-[48px] bg-neutral-100 py-2 px-4 rounded-lg"
            onClick={() => {
              setComment('');
            }}
          >
            취소
          </button>
          <button type="submit" className="w-[71px] h-[48px] bg-main-100 py-2 px-4 rounded-lg">
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArchiveInputComments;
