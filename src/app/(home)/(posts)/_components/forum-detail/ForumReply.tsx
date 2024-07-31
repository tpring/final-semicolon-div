'use client';
import { useAuth } from '@/context/auth.context';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const ForumReply = ({ comment_id }: { comment_id: string }) => {
  const { me } = useAuth();
  const params_id = useParams();
  const [page, setPage] = useState(1);

  const COMMENT_REPLY_PAGE = 5;

  const {
    data: reply,
    isPending,
    error
  } = useQuery({
    queryKey: ['commentReply'],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/posts/forum-detail/forum-reply/${params_id.id}`, {
          params: { _page: page, _limit: COMMENT_REPLY_PAGE }
        });
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  });

  const replyPages = Math.ceil(reply?.count / COMMENT_REPLY_PAGE);
  if (isPending) {
    return <div>왜 그러냐?</div>;
  }
  return (
    <div>
      {reply.getReply.map((reply: any) => reply.comment_id === comment_id && <p key={reply.id}>{reply.reply}</p>)}
    </div>
  );
};

export default ForumReply;
