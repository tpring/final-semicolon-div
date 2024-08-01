'use client';
import Link from 'next/link';
import mainPageQna from '@/assets/images/main-page_image/posts-list/qna.svg';
import mainPageForum from '@/assets/images/main-page_image/posts-list/forum.svg';
import mainPageLibrary from '@/assets/images/main-page_image/posts-list/library.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

const PostsLink = () => {
  return (
    <div className="flex justify-between items-center gap-5 mt-5">
      <Swiper
        slidesPerView={1}
        spaceBetween={500}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <Link
            href={'/qna'}
            className="bg-slate-200 w-full h-[234px] flex flex-col justify-end p-5 rounded-2xl gap-1 text-white  "
            style={{ backgroundImage: `url(${mainPageQna.src})` }}
          ></Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <Link
            href={'/forum'}
            className="bg-slate-200 w-full h-[234px] flex flex-col justify-end p-5 rounded-2xl gap-1 text-white "
            style={{ backgroundImage: `url(${mainPageForum.src})` }}
          ></Link>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <Link
            href={'/archive'}
            className="bg-slate-200 w-full h-[234px] flex flex-col justify-end p-5 rounded-2xl gap-1 text-white "
            style={{ backgroundImage: `url(${mainPageLibrary.src})` }}
          ></Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PostsLink;
