'use client';

import { useAuth } from '@/context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const InputComments = () => {
  const [comment, setComment] = useState<string>('');
  const params = useParams<{ id: string }>();
  const { me } = useAuth();
  const queryClient = useQueryClient();

  const handleCommentChange = (value?: string) => {
    setComment(value!);
  };

  //댓글 입력 후 Query다시 가져오기
  const handleComment = useMutation({
    mutationFn: async (userComment: any) => {
      const response = await fetch(`/api/posts/forum-detail/forum-comments/${params.id}`, {
        method: 'POST',
        body: JSON.stringify({ userComment })
      });
      const result = await response.json();
      console.log(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumComments'] });
      if (comment) {
        setComment('');
      }
    }
  });

  //submit 실행시 유효성 검사 & mutation으로 값을 전달
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
    <div className="flex justify-start items-center border rounded-xl p-4 ">
      <form className=" flex flex-col justify-end items-end w-full gap-2" onSubmit={handleSubmit}>
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
        <div className=" flex justify-end items-end gap-2">
          <button
            type="button"
            className="bg-slate-200 py-2 px-4"
            onClick={() => {
              setComment('');
            }}
          >
            취소
          </button>
          <button className="bg-slate-200 py-2 px-4">등록</button>
        </div>
      </form>
    </div>
  );
};

export default InputComments;
