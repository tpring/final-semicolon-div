'use client';

import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import qnaBanner_1 from '@/assets/images/qna/qnaBanner_1.svg';
import { useEffect, useState } from 'react';
import CarouselLeftHover from '@/assets/images/common/CarouselLeftHover';
import CarouselLeft from '@/assets/images/common/CarouselLeft';
import CarouselRightHover from '@/assets/images/common/CarouselRightHover';
import CarouselRight from '@/assets/images/common/CarouselRight';

const QnaImageSwiper = () => {
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
    <div className="relative first-letter:rounded-[40px] mb-20">
      <Swiper
        // navigation={true}
        onSwiper={setSwiperInstance}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="QnaSwiper"
      >
        <SwiperSlide key={'1'}>
          <Image src={qnaBanner_1} alt="Qna Banner 1" objectFit="cover" width={1204} height={288} />
        </SwiperSlide>
        <SwiperSlide key={'2'}>
          <Image src={qnaBanner_1} alt="Qna Banner 1" objectFit="cover" width={1204} height={288} />
        </SwiperSlide>
        <SwiperSlide key={'3'}>
          <Image src={qnaBanner_1} alt="Qna Banner 1" objectFit="cover" width={1204} height={288} />
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

export default QnaImageSwiper;
