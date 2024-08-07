'use client';
import Link from 'next/link';
import qna from '/public/images/mainPageImages/postList/qna.webp';
import forum from '/public/images/mainPageImages/postList/forum.webp';
import library from '/public/images/mainPageImages/postList/library.webp';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import CarouselLeftHover from '@/assets/images/common/CarouselLeftHover';
import CarouselLeft from '@/assets/images/common/CarouselLeft';
import CarouselRightHover from '@/assets/images/common/CarouselRightHover';
import CarouselRight from '@/assets/images/common/CarouselRight';

const PostsLink = () => {
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

  return (
    <div className=" relative flex justify-between items-center gap-5 mt-5">
      <Swiper
        onSwiper={setSwiperInstance}
        slidesPerView={1}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <Link
            href={'/qna'}
            className="bg-slate-200 w-full h-[234px] flex flex-col justify-end p-5 rounded-2xl gap-1 text-white  "
            style={{ backgroundImage: `url(${qna.src})` }}
          ></Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <Link
            href={'/forum'}
            className="bg-slate-200 w-full h-[234px] flex flex-col justify-end p-5 rounded-2xl gap-1 text-white "
            style={{ backgroundImage: `url(${forum.src})` }}
          ></Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <Link
            href={'/archive'}
            className="bg-slate-200 w-full h-[234px] flex flex-col justify-end p-5 rounded-2xl gap-1 text-white "
            style={{ backgroundImage: `url(${library.src})` }}
          ></Link>
        </SwiperSlide>
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
  );
};

export default PostsLink;
