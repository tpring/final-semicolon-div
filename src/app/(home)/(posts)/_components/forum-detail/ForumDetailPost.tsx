'use client';
import { useQuery } from '@tanstack/react-query';
import { timeForToday } from '@/components/public';
import { forumDetailType } from '@/types/posts/forumDetailTypes';
import InputComments from './InputComment';
import ForumComments from './ForumComments';

const ForumDetailPost = ({ params }: { params: { id: string } }) => {
  const { data: forumDetail, error } = useQuery<forumDetailType[]>({
    queryKey: ['forumDetail'],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/posts/forum-detail/${params.id}`);
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  });

  return (
    <div>
      {forumDetail?.map((post) => (
        <div key={post.id} className="w-full">
          <div className="flex  justify-start items-center gap-4 ">
            <img src={post.user.profile_image} className="rounded-full" />
            <div>
              <h3>{post.user.nickname}</h3>
              <div className=" flex justify-start items-center gap-3">
                <p>{post.forum_category}</p>
                <p>
                  {timeForToday(post.updated_at ? post.updated_at : post.created_at)}
                  <span className="text-xs">{post.updated_at && '(수정됨)'}</span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
          <p>{post.created_at.slice(0, 16).replace(/-/g, '.').replace(/T/g, ' ')}</p>
        </div>
      ))}
      <InputComments />
      <ForumComments />
    </div>
  );
};

export default ForumDetailPost;
