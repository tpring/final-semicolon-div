'use client';
import { useAuth } from '@/context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const ForumReplyInput = ({ comment_id }: { comment_id: string }) => {
  const { me } = useAuth();
  const params = useParams();
  const queryClient = useQueryClient();
  const [reply, setReply] = useState('');

  const handleReply = useMutation({
    mutationFn: async (userReply: any) => {
      const response = await fetch(`/api/posts/forum-detail/forum-reply/${params.id}`, {
        method: 'POST',
        body: JSON.stringify(userReply)
      });
      console.log(userReply);
      const data = await response.json();
      console.log(data);
      return data;
    }
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['commentReply'] });
    // }
  });

  const changReply = (e: any) => {
    setReply(e.target.value);
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
    console.log(comment_id);

    handleReply.mutate(commentReply);
  };

  return (
    <div>
      <input onChange={changReply} />
      <button onClick={onClickReply}>대댓글 입력</button>
    </div>
  );
};

export default ForumReplyInput;
