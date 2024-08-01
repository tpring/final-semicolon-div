'use client';

import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import qnaBanner_1 from '@/assets/images/qna/qnaBanner_1.svg';
import ProgressBarOne from '@/assets/images/qna/ProgressBarOne';
import ProgressBarTwo from '@/assets/images/qna/ProgressBarTwo';
import ProgressBarThree from '@/assets/images/qna/ProgressBarThree';

const QnaImageSwiper = () => {
  return (
    <div className="relative first-letter:rounded-[40px] mb-20">
      <Swiper
        // navigation={true}
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
    </div>
  );
};

export default QnaImageSwiper;
