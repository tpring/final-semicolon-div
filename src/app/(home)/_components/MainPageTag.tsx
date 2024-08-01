'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { tagList } from './_tag-list/TagList';
import Link from 'next/link';
import Image from 'next/image';
import Pc from '@/assets/images/main-page_image/Pc';

const MainPageTag = () => {
  return (
    <div>
      <div className="flex justify-start mb-5">
        <h1 className="text-h4 font-bold mb-5 text-neutral-900 ">태그로 간편하게 검색해 보세요!</h1>
        <Pc />
      </div>
      <Swiper navigation={true} modules={[Navigation]} slidesPerView={4} spaceBetween={10} className="mySwiper">
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
    </div>
  );
};

export default MainPageTag;
