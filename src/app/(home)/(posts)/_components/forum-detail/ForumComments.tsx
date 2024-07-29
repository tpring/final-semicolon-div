'use client';
import { forumCommentsType } from '@/types/posts/forumDetailTypes';
import { useQuery } from '@tanstack/react-query';

const ForumComments = ({ params }: { params: { id: string } }) => {
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
  console.log(comments);
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
