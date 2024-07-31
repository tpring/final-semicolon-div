'use client';
import { useAuth } from '@/context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const ForumReplyInput = ({ comment_id }: { comment_id: string }) => {
  const { me } = useAuth();
  const params = useParams();
  const queryClient = useQueryClient();
  const replyRef = useRef(null);

  const handleReply = useMutation({
    mutationFn: async (userReply: any) => {
      const response = await fetch(`/api/posts/forum-detail/forum-reply/${params.id}`, {
        method: 'POST',
        body: JSON.stringify({ userReply })
      });
      const result = await response.json();
      console.log(result);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReply'] });
    }
  });

  const onClickReply = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const reply = replyRef.current?.value;
    const commentReply = { user_id: me?.id, comment_id, reply };

    if (!me?.id) {
      toast.error('로그인 후 입력가능합니다.', {
        autoClose: 2000
      });
      return;
    }
    console.log(reply);

    handleReply.mutate(commentReply);
  };

  return (
    <div>
      <input ref={replyRef} />
      <button onClick={onClickReply}>대댓글 입력</button>
    </div>
  );
};

export default ForumReplyInput;
