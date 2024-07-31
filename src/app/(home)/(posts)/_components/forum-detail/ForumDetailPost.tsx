'use client';

import { useQuery } from '@tanstack/react-query';
import { forumDetailType } from '@/types/posts/forumDetailTypes';
import { timeForToday } from '@/utils/timeForToday';
import { useParams } from 'next/navigation';
import MDEditor from '@uiw/react-md-editor';

const ForumDetailPost = () => {
  const params = useParams();
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
    <div className="flex flex-col gap-4">
      {forumDetail?.map((post) => (
        <div key={post.id} className="w-full flex flex-col gap-2 p-4 border-b-[1px] ">
          <div className="flex  justify-start items-center gap-2  ">
            <img src={post.user.profile_image} className="rounded-full w-10 h-10 " />
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
            <MDEditor.Markdown source={post.content} />
          </div>
          <p>{post.created_at.slice(0, 16).replace(/-/g, '.').replace(/T/g, ' ')}</p>
        </div>
      ))}
    </div>
  );
};

export default ForumDetailPost;
