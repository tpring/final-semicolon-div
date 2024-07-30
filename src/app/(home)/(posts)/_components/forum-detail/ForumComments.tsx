'use client';
import { useAuth } from '@/context/auth.context';
import { forumCommentsType } from '@/types/posts/forumDetailTypes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';

const ForumComments = () => {
  const { me } = useAuth();
  const params = useParams();
  const queryClient = useQueryClient();
  // const [retouch, setRetouch] = useState<boolean>(false);
  const commentRetouchRef = useRef<HTMLInputElement>(null);

  //댓글 가져오기
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
  const commentRetouch = useMutation({
    mutationFn: async ({
      id,
      user_id,
      retouchComment
    }: {
      id: string;
      user_id: string;
      retouchComment: string | undefined;
    }) => {
      const response = await fetch(`/api/posts/forum-detail/forum-comments/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ id, user_id, retouchComment })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumComments'] });
    }
  });

  const commentRetouchHandle = async (id, user_id) => {
    const retouchComment = commentRetouchRef.current?.value;
    commentRetouch.mutate({ id, user_id, retouchComment });
    if (retouchComment) {
      commentRetouchRef.current.value = '';
    }
  };

  // 댓글 삭제
  const commentDelete = useMutation({
    mutationFn: async ({ id, user_id }: { id: string; user_id: string }) => {
      const response = await fetch(`/api/posts/forum-detail/forum-comments/${params.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id, user_id })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumComments'] });
    }
  });

  const handleDelete = async (id, user_id) => {
    commentDelete.mutate({ id, user_id });
  };

  return (
    <div className=" flex flex-col mt-4 gap-4">
      {comments?.map((comment) => (
        <div key={comment.id} className="w-full border">
          <img src={comment.user.profile_image} className="rounded-full w-10 h-10" />
          <h2>{comment.user.nickname}</h2>
          <p>{comment.comment}</p>
          {me?.id === comment.user_id ? (
            <div>
              <input type="text" ref={commentRetouchRef} />
              <button onClick={() => handleDelete(comment.id, comment.user_id)}>삭제</button>
              <button onClick={() => commentRetouchHandle(comment.id, comment.user_id)}>수정</button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ForumComments;
