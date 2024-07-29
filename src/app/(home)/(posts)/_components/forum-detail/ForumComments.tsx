'use client';
import { useQuery } from '@tanstack/react-query';

const ForumComments = ({ params }: { params: { id: string } }) => {
  const { data: comments } = useQuery({
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
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h2>{comment.user.nickname}</h2>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ForumComments;
