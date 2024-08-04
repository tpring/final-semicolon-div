'use client';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import qnaImage from '@/assets/images/main-page_image/qnaicom/qnaImage.svg';
import Link from 'next/link';
import Image from 'next/image';
import Cap from '@/assets/images/main-page_image/qnaicom/Cap';

const TodayQna = () => {
  //실시간 Q&A가져오기
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

  return (
    <div>
      <div className="flex justify-start gap-1">
        <p className="text-h4 font-bold mb-5 text-neutral-900">방금 올라온 질문이에요! 지식을 공유하러 가볼까요?</p>
        <Cap />
      </div>
      <Swiper navigation={true} modules={[Navigation]} slidesPerView={3} spaceBetween={10} className="mySwiper">
        {todayQna?.map((post) => (
          <SwiperSlide key={post.id}>
            <Link href={`/qna/${post.id}`}>
              <div className=" flex flex-col gap-2  rounded-2xl h-[211px] p-4 bg-indigo-50">
                <div className="flex flex-col justify-start gap-4 items-start">
                  <Image src={qnaImage} alt="iconList" width={67} height={64} />
                  <p className="text-subtitle1 font-medium text-neutral-300">오늘의 질문</p>
                  <p className="text-body1 font-medium text-neutral-900">{[post.title]}</p>
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
