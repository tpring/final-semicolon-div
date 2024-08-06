'use client';

import { revalidate } from '@/actions/revalidate';
import { useAuth } from '@/context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const InputComments = () => {
  const params = useParams<{ id: string }>();
  const { me, userData } = useAuth();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState<string>('');

  const handleCommentChange = (value?: string) => {
    setComment(value!);
  };

  //댓글 입력
  const handleComment = useMutation({
    mutationFn: async (userComment: any) => {
      const response = await fetch(`/api/posts/forum-detail/forum-comments/${params.id}`, {
        method: 'POST',
        body: JSON.stringify({ userComment })
      });
      const result = await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumComments'] });
      if (comment) {
        setComment('');
        revalidate(`/forum/${params.id}`, 'page');
      }
    }
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const forumComment = { user_id: me?.id, post_id: params.id, comment };

    if (!me?.id) {
      toast.error('로그인 후 입력가능합니다.', {
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

    handleComment.mutate(forumComment);
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
            className="bg-neutral-50  text-neutral-100 px-5 py-3 rounded-lg"
            onClick={() => {
              setComment('');
            }}
          >
            취소
          </button>
          <button className="bg-main-100  text-main-50 px-5 py-3 rounded-lg">등록</button>
        </div>
      </form>
    </div>
  );
};

export default InputComments;
