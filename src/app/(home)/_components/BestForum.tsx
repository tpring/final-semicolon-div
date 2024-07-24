'use client';
import { Database, Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const BestForum = () => {
  const { data: forumList } = useQuery<Tables<'forum_posts'>[]>({
    queryKey: ['bestForum'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/auth/main-page/best-forum');
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  });

  return (
    <div>
      <h1>베스트 포럼</h1>
      {forumList?.map((forum) => (
        <div key={forum.id} className=" border rounded-xl ">
          <div className="flex justify-start items-center">
            {/* <img src={forum.users.profile_image} /> */}
            <h2>{forum.users.nickname}</h2>
            <p>{forum.forum_category}</p>
            <p>{forum.created_at}</p>
          </div>
          <div className=" flex flex-col h-60 ">
            <h1>{forum.title}</h1>
            <p>{forum.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestForum;
