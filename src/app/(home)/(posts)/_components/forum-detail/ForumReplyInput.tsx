'use client';

import { useAuth } from '@/context/auth.context';
import { CommentReply } from '@/types/posts/forumDetailTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type commentReplyProps = {
  comment_id: string;
  toggle: (id: string, count: number) => void;
  count: number;
};

const ForumReplyInput = ({ comment_id, toggle, count }: commentReplyProps) => {
  const { me, userData } = useAuth();
  const params = useParams();
  const queryClient = useQueryClient();
  const [reply, setReply] = useState('');

  //대댓글 입력
  const handleReply = useMutation({
    mutationFn: async (userReply: CommentReply) => {
      const response = await fetch(`/api/posts/forum-detail/forum-reply/${params.id}`, {
        method: 'POST',
        body: JSON.stringify(userReply)
      });
      const data = await response.json();
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReply'] });
      queryClient.invalidateQueries({ queryKey: ['forumComments'] });
    }
  });

  const changReply = (value?: string) => {
    setReply(value!);
  };
  const onClickReply = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const commentReply = { user_id: me?.id, comment_id, reply };

    if (!me?.id) {
      toast.error('로그인 후 입력가능합니다.', {
        autoClose: 2000
      });
      return;
    }
    if (!reply) {
      toast.error('댓글을 입력해주세요..', {
        autoClose: 2000
      });
      return;
    }
    setReply('');
    handleReply.mutate(commentReply);
  };

  return (
    <div className=" border-l-4 border-[#C7DCF5] border-b-[1px] p-6">
      {me ? (
        <div>
          <p>댓글 {count}</p>
          <div className="flex justify-center items-center gap-6" data-color-mode="light">
            <Image
              src={userData?.profile_image ?? ''}
              alt="user profile image"
              width={48}
              height={48}
              className=" rounded-full"
            />
            <MDEditor
              value={reply}
              onChange={changReply}
              preview="edit"
              extraCommands={commands.getCommands().filter(() => false)}
              commands={commands.getCommands().filter((command) => {
                return command.name !== 'image';
              })}
              textareaProps={{ maxLength: 500 }}
              className="w-full "
            />
          </div>
          <div className="flex justify-end items-end gap-4 mt-4">
            <button
              onClick={() => toggle(comment_id, count)}
              disabled={!reply}
              className={`${reply ? 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-500' : 'bg-neutral-50 text-neutral-100'}  px-5 py-3 rounded-lg text-subtitle1 font-bold`}
            >
              취소
            </button>
            <button
              onClick={onClickReply}
              className={`${reply ? 'bg-main-400 text-white hover:bg-main-500 hover:text-white' : 'bg-main-100 text-main-50'}  px-5 py-3 rounded-lg text-subtitle1 font-bold`}
            >
              등록
            </button>
          </div>
        </div>
      ) : (
        <p className=" text-center">로그인 후 이용이 가능합니다.</p>
      )}
    </div>
  );
};

export default ForumReplyInput;
