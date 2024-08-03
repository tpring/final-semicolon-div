'use client';
import { useAuth } from '@/context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ArchiveReplyInput = ({ comment_id, toggle }: { comment_id: string; toggle: (id: string) => void }) => {
  const { me, userData } = useAuth();
  const params = useParams();
  const queryClient = useQueryClient();
  const [reply, setReply] = useState('');

  const handleReply = useMutation({
    mutationFn: async (userReply: any) => {
      const response = await fetch(`/api/posts/archive-detail/archive-reply/${params.id}`, {
        method: 'POST',
        body: JSON.stringify(userReply)
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReply'] });
    }
  });

  const changReply = (value: string | undefined) => {
    setReply(value ?? '');
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
    <div className=" border-l-4 border-b-[1px] p-6">
      <div className="flex justify-center items-center gap-6">
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
        <button onClick={() => toggle(comment_id)} className="py-3 px-6 bg-neutral-100  rounded-lg ">
          취소
        </button>
        <button onClick={onClickReply} className="py-3 px-6 bg-main-100  rounded-lg ">
          등록
        </button>
      </div>
    </div>
  );
};

export default ArchiveReplyInput;
