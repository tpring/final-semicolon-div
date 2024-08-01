'use client';
import { useAuth } from '@/context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ArchiveReplyInput = ({ comment_id, toggle }: { comment_id: string }) => {
  const { me } = useAuth();
  const params = useParams();
  const queryClient = useQueryClient();
  const [reply, setReply] = useState('');

  const handleReply = useMutation({
    mutationFn: async (userReply: any) => {
      const response = await fetch(`/api/posts/archive-detail/archive-reply/${params.id}`, {
        method: 'POST',
        body: JSON.stringify(userReply)
      });
      console.log(userReply);
      const data = await response.json();
      console.log(data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReply'] });
    }
  });

  const changReply = (value: string) => {
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
    setReply('');
    handleReply.mutate(commentReply);
  };

  return (
    <div>
      <MDEditor
        value={reply}
        onChange={changReply}
        preview="edit"
        extraCommands={commands.getCommands().filter(() => false)}
        commands={commands.getCommands().filter((command) => {
          return command.name !== 'image';
        })}
        textareaProps={{ maxLength: 1000 }}
        className="w-full "
      />
      <div className="flex justify-end items-end gap-4">
        <button onClick={() => toggle(comment_id)}>취소</button>
        <button onClick={onClickReply}>대댓글 입력</button>
      </div>
    </div>
  );
};

export default ArchiveReplyInput;
