'use client';

import { useQuery } from '@tanstack/react-query';
import { timeForToday } from '@/utils/timeForToday';
import { useParams, useRouter } from 'next/navigation';
import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import { archiveDetailType } from '@/types/posts/archiveDetailTypes';
import Left from '@/assets/images/common/Left';

const ArchiveDetailPost = () => {
  const params = useParams();
  const { data: archiveDetail, error } = useQuery<archiveDetailType[]>({
    queryKey: ['archiveDetail'],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/posts/archive-detail/${params.id}`);
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  });
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex flex-col gap-4">
      <button onClick={handleBackClick} className="mb-4 px-4 py-2 text-white rounded-md w-16">
        <Left />
      </button>
      {archiveDetail?.map((post) => (
        <div key={post.id} className="w-full flex flex-col gap-2 p-4 border-b-[1px] ">
          <div className="flex  justify-start items-center gap-2  ">
            <Image
              src={post.user.profile_image}
              alt="archiveUserImage"
              width={100}
              height={100}
              className="rounded-full  h w-10 h-10 "
            />
            <div>
              <h3>{post.user.nickname}</h3>
              <div className=" flex justify-start items-center gap-3">
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

export default ArchiveDetailPost;
