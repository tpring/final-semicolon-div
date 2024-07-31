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

  const { data: reply } = useQuery({
    queryKey: ['commentReply', page],
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
  console.log(reply);
  return (
    <div>{reply?.map((reply: any) => reply.comment_id === comment_id && <div key={reply.id}>{reply.reply}</div>)}</div>
  );
};

export default ForumReply;
