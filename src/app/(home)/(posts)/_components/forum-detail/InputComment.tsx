'use client';

import { useAuth } from '@/context/auth.context';
import { userComment } from '@/types/posts/forumDetailTypes';
import { useMutation } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useState } from 'react';
import { toast } from 'react-toastify';

const InputComments = ({ params }: { params: { id: string } }) => {
  const [comment, setComment] = useState<string>('');
  const { me } = useAuth();

  const handleCommentChange = (value?: string) => {
    setComment(value!);
  };

  const userComment = { user_id: me?.id, post_id: params.id, comment: comment };

  const handleComment = async (comments: userComment) => {
    if (comments.comment === '') {
      toast.error('댓글을 입력해주세요!', {
        autoClose: 2000
      });
      return;
    }
    const response = await fetch(`/api/posts/forum-detail/forum-comments/${params.id}`, {
      method: 'POST',
      body: JSON.stringify({ comments })
    });
    const result = await response.json();
    setComment('');
    toast.success('댓글을 입력되었습니다.', {
      autoClose: 2000
    });
    return result;
  };

  // const handleComment = useMutation({
  //   mutationFn: fetch(`/api/posts/forum-detail/forum-comments/${params.id}`, {
  //         method: 'POST',
  //         body: JSON.stringify({ comments })
  //       });

  //   }
  // })

  return (
    <div className="flex justify-start items-center border p-4 ">
      <div className=" flex flex-col justify-end items-end w-full gap-2">
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
        <div className="flex gap-4">
          <button
            className="bg-slate-200 py-2 px-4"
            onClick={() => {
              setComment('');
            }}
          >
            취소
          </button>
          <button className="bg-slate-200 py-2 px-4" onClick={() => handleComment(userComment)}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputComments;
