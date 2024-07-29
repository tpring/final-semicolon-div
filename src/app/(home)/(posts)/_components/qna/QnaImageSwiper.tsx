'use client';

import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const QnaImageSwiper = () => {
  return (
    <div>
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="QnaSwiper"
      >
        <SwiperSlide key={'1'}>
          <div>Slide 1</div>
        </SwiperSlide>
        <SwiperSlide key={'2'}>
          <div>Slide 2</div>
        </SwiperSlide>
        <SwiperSlide key={'3'}>
          <div>Slide 3</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default QnaImageSwiper;
