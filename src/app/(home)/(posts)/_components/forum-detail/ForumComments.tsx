'use client';
import { useAuth } from '@/context/auth.context';
import { forumCommentsType } from '@/types/posts/forumDetailTypes';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const ForumComments = ({ params }: { params: { id: string } }) => {
  const { me } = useAuth();
  // const [comments, setComments] = useState<forumCommentsType[]>([]);
  // const commentRetouch = { comment: retouch, user_id: me?.id, post_id: params.id };

  //댓글 가져오기
  // useEffect(() => {
  //   const getComments = async () => {
  //     try {
  //       const response = await fetch(`/api/posts/forum-detail/forum-comments/${params.id}`);
  //       const data = await response.json();
  //       setComments(data);
  //       return data;
  //     } catch (error) {}
  //   };
  //   getComments();
  // }, []);

  const { data: comments } = useQuery<forumCommentsType[]>({
    queryKey: ['forumComments'],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/posts/forum-detail/forum-comments/${params.id}`);
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  });

  //댓글 수정
  // const commentRetouchHandle = async (RetouchData) => {
  //   const response = await fetch(`/api/posts/forum-detail/forum-comments/${params.id}`, {
  //     method: 'PATCH',
  //     body: JSON.stringify({ RetouchData })
  //   });
  //   const data = await response.json();
  //   return data;
  // };

  return (
    <div className=" flex flex-col mt-4 gap-4">
      {comments?.map((comment) => (
        <div key={comment.id} className="w-full border">
          <h2>{comment.user.nickname}</h2>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ForumComments;
