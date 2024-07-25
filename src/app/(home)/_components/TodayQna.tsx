'use client';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';

const TodayQna = () => {
  const { data: todayQna } = useQuery<Tables<'qna_posts'>[]>({
    queryKey: ['todayQna'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/auth/main-page/today-qna');
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  });
  console.log(todayQna);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-7 ">방금 올라온 질문이에요! 지식을 공유하러 가볼까요?🎓</h1>

      <Swiper navigation={true} modules={[Navigation]} slidesPerView={4} spaceBetween={10} className="mySwiper">
        {todayQna?.map((post) => (
          <SwiperSlide key={post.id}>
            <Link href={`/qna/${post.id}`}>
              <div className=" flex flex-col justify-between border rounded-2xl h-60 px-4 py-8">
                <div></div>
                <div className="h-6 mb-4">
                  <h1 className="text-sm font-semibold">Q. {[post.title]}</h1>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TodayQna;
