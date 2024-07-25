'use client';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';

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
  console.log(forumList);

  //게시글 시간표시 함수 ex)방금전, 20분전, 1시간전 등..
  const timeForToday = (value: string) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  const handleRinkCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {}
  };

  return (
    <div>
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
                    <p className="text-sm text-gray-500">{timeForToday(forum.created_at)}</p>
                  </div>
                </div>
              </div>
              <Link href={`/conference/${forum.id}`}>
                <div className=" flex flex-col gap-1 h-80 mt-4 ">
                  <h1 className="text-lg font-semibold ">{forum.title}</h1>
                  <p className="normal  overflow-hidden ">{forum.content}</p>
                </div>
                <p className="text-sm text-right mt-4">{forum.created_at.slice(0, 10).replace(/-/g, '.')}</p>
              </Link>
              <div className="flex justify-between items-center py-2 text-sm">
                <p>좋아요{forum.like.length}</p>
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
