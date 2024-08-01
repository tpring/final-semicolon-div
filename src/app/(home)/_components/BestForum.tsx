'use client';

import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BestForumType } from '@/types/mainpage';
import { timeForToday } from '@/components/timeForToday';
import { handleLinkCopy } from '@/components/handleLinkCopy';

const BestForum = () => {
  const { data: forumList } = useQuery<BestForumType[]>({
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
      <ToastContainer />
      <h1 className="text-xl font-semibold mb-7 ">오늘의 인기 포럼이에요🌟</h1>
      <Swiper navigation={true} modules={[Navigation]} slidesPerView={3} spaceBetween={10} className="mySwiper">
        {forumList?.map((forum) => (
          <SwiperSlide key={forum.id}>
            <div className="w-90% border rounded-xl ml-1 px-4 ">
              <div className="flex justify-start items-center gap-4  border-b-[1px]">
                <img src={forum.users.profile_image} className="w-10 h-10 rounded-full" />
                <div className=" flex flex-col justify-start gap-1 py-4">
                  <h2>{forum.users.nickname}</h2>
                  <div className="flex justify-start items-center gap-1">
                    <p className="text-sm text-gray-500">{forum.forum_category}</p>
                    <span className="text-sm text-gray-500">▪</span>
                    <p className="text-sm text-gray-500">
                      {timeForToday(forum.updated_at ? forum.updated_at : forum.created_at)}
                      <span className="text-xs">{forum.updated_at && '(수정됨)'}</span>
                    </p>
                  </div>
                </div>
              </div>
              <Link href={`/forum/${forum.id}`}>
                <div className=" flex flex-col gap-1 h-80 mt-4 ">
                  <h1 className="text-lg font-semibold ">{forum.title}</h1>
                  <p className="normal  overflow-hidden ">{forum.content}</p>
                </div>
                <p className="text-sm text-right mt-4">{forum.created_at.slice(0, 10).replace(/-/g, '.')}</p>
              </Link>
              <div className="flex justify-between items-center py-2 text-sm">
                <div className="flex gap-4">
                  <p>
                    좋아요<span className="pl-1">{forum.like.length}</span>
                  </p>
                  <button onClick={() => handleLinkCopy(`${process.env.NEXT_PUBLIC_BASE_URL}/forum/${forum.id}`)}>
                    공유
                  </button>
                </div>
                <p>댓글{forum.comments.length}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestForum;
