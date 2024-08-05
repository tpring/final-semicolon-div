'use client';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import qnaImage from '@/assets/images/main-page_image/qnaicom/qnaImage.svg';
import Link from 'next/link';
import Image from 'next/image';
import Cap from '@/assets/images/main-page_image/qnaicom/Cap';
import { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import CarouselLeftHover from '@/assets/images/common/CarouselLeftHover';
import CarouselLeft from '@/assets/images/common/CarouselLeft';
import CarouselRightHover from '@/assets/images/common/CarouselRightHover';
import CarouselRight from '@/assets/images/common/CarouselRight';

const TodayQna = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isHoveringPrev, setIsHoveringPrev] = useState(false);
  const [isHoveringNext, setIsHoveringNext] = useState(false);

  useEffect(() => {
    if (swiperInstance) {
      const handleSlideChange = () => {
        setIsBeginning(swiperInstance.isBeginning);
        setIsEnd(swiperInstance.isEnd);
        setIsHoveringPrev(false);
        setIsHoveringNext(false);
      };

      swiperInstance.on('slideChange', handleSlideChange);
      handleSlideChange();

      return () => {
        swiperInstance.off('slideChange', handleSlideChange);
      };
    }
  }, [swiperInstance]);

  const handlePrevClick = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };

  const handleNextClick = () => {
    if (swiperInstance) swiperInstance.slideNext();
  };

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
      <div className="relative">
        <Swiper
          onSwiper={setSwiperInstance}
          loop={true}
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={20}
          className="mySwiper"
        >
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
        {!isBeginning && (
          <div
            className="absolute top-1/2 transform -translate-y-1/2 left-[-32px] z-50"
            onClick={handlePrevClick}
            onMouseEnter={() => setIsHoveringPrev(true)}
            onMouseLeave={() => setIsHoveringPrev(false)}
          >
            <button className="swiper-button-prev-custom">
              {isHoveringPrev ? <CarouselLeftHover /> : <CarouselLeft />}
            </button>
          </div>
        )}
        {!isEnd && (
          <div
            className="absolute top-1/2 transform -translate-y-1/2 right-[-32px] z-50"
            onClick={handleNextClick}
            onMouseEnter={() => setIsHoveringNext(true)}
            onMouseLeave={() => setIsHoveringNext(false)}
          >
            <button className="swiper-button-prev-custom">
              {isHoveringNext ? <CarouselRightHover /> : <CarouselRight />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayQna;
