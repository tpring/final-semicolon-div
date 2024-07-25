'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { tagList } from './TagList';

const MainPageTag = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-7 ">태그로 간편하게 검색해 보세요!💻</h1>
      <Swiper navigation={true} modules={[Navigation]} slidesPerView={4} spaceBetween={10} className="mySwiper">
        {tagList.map((tag, index) => (
          <SwiperSlide key={index}>
            <div className=" bg-slate-200 h-20">
              <div>{tag.tagName}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainPageTag;
