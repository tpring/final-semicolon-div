'use client';
<<<<<<< HEAD
import { Database, Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const TodayQna = () => {
=======
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import qnaIcon1 from '@/assets/images/main-page_image/qnaicom/qnaicon_1.svg';
import qnaIcon2 from '@/assets/images/main-page_image/qnaicom/qnaicon_2.svg';
import qnaIcon3 from '@/assets/images/main-page_image/qnaicom/qnaicon_3.svg';
import qnaIcon4 from '@/assets/images/main-page_image/qnaicom/qnaicon_4.svg';
import Link from 'next/link';
import Image from 'next/image';

const TodayQna = () => {
  const iconList = [qnaIcon1, qnaIcon2, qnaIcon3, qnaIcon4, qnaIcon1, qnaIcon2, qnaIcon3, qnaIcon4];
  //실시간 Q&A가져오기
>>>>>>> 48d452041d997f4df3543820bc9346ed7936e1dd
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
<<<<<<< HEAD
  console.log(todayQna);

  return (
    <div>
      <h1>방금 올라온 질문이에요! 지식을 공유하러 가볼까요?</h1>
      <div className="flex flex-nowrap gap-5">{todayQna?.map((post) => <h1 key={post.id}>{[post.title]}</h1>)}</div>
=======

  return (
    <div>
      <h1 className="text-xl font-semibold mb-7 ">방금 올라온 질문이에요! 지식을 공유하러 가볼까요?🎓</h1>

      <Swiper navigation={true} modules={[Navigation]} slidesPerView={4} spaceBetween={10} className="mySwiper">
        {todayQna?.map((post, index) => (
          <SwiperSlide key={post.id}>
            <Link href={`/qna/${post.id}`}>
              <div className=" flex flex-col justify-around items-start gap-2  rounded-2xl h-60 px-4 bg-indigo-50">
                <div className="flex flex-col">
                  <Image src={iconList[index]} alt="iconList" width={140} height={140} className="ml-[50px] mt-2" />
                  <h3 className="text-gray-500">Q&A</h3>
                </div>
                <div className="h-6 mb-4">
                  <h1 className="text-sm font-semibold text-left">Q. {[post.title]}</h1>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
>>>>>>> 48d452041d997f4df3543820bc9346ed7936e1dd
    </div>
  );
};

export default TodayQna;
