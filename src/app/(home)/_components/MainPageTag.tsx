'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { tagList } from './_tag-list/TagList';
import Link from 'next/link';
import Image from 'next/image';
import Pc from '@/assets/images/main-page_image/Pc';
import { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import CarouselLeftHover from '@/assets/images/common/CarouselLeftHover';
import CarouselLeft from '@/assets/images/common/CarouselLeft';
import CarouselRightHover from '@/assets/images/common/CarouselRightHover';
import CarouselRight from '@/assets/images/common/CarouselRight';

const MainPageTag = () => {
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
    <div className="flex flex-col">
      <div className="flex justify-start mb-5">
        <h1 className="text-h4 font-bold mb-5 text-neutral-900 ">태그로 간편하게 검색해 보세요!</h1>
        <Pc />
      </div>
      <div className="relative">
        <Swiper
          onSwiper={setSwiperInstance}
          loop={true}
          modules={[Navigation]}
          slidesPerView={4}
          spaceBetween={20}
          className="mySwiper"
        >
          {tagList.map((tag, index) => (
            <SwiperSlide key={index}>
              <div className="h-[286px] ">
                <Link href={`/search?searchType=tag&keyword=${tag.tagName}`}>
                  <div className="bg-sub-50 h-[184px] rounded-t-2xl flex justify-center items-center ">
                    <Image src={tag.img} alt="tagList" width={122} height={122} />
                  </div>
                  <div className="bg-sub-100 h-[102px] rounded-b-2xl flex flex-col justify-center gap-2 pl-4">
                    <p className="text-h5 font-bold text-neutral-900">#{tag.tagName}</p>
                    <p className="text-body1 font-regular text-neutral-800">전체 게시글</p>
                  </div>
                </Link>
              </div>
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

export default MainPageTag;
