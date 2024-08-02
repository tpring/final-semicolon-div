'use client';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { usePopularArchivePosts } from '@/hooks/archive/useFetchArchivePosts';
import { Post } from '@/types/posts/archiveTypes';
import Image from 'next/image';
import BookmarkButton from '@/components/common/BookmarkButton';
import { PostCardProps } from '@/types/posts/forumTypes';
import { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import CarouselLeftHover from '@/assets/images/common/CarouselLeftHover';
import CarouselLeft from '@/assets/images/common/CarouselLeft';
import CarouselRightHover from '@/assets/images/common/CarouselRightHover';
import CarouselRight from '@/assets/images/common/CarouselRight';
import Link from 'next/link';

const PopularArchiveSwiper = () => {
  const { data, error, isLoading } = usePopularArchivePosts();
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data || !data.data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <Swiper
        onSwiper={setSwiperInstance}
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={10}
        loop={false}
        className="ArchiveSwiper"
      >
        {data.data.map((post: Post) => (
          <SwiperSlide key={post.id}>
            <Link key={post.id} href={`/archive/${post.id}`}>
              <div className="flex flex-col justify-start items-start relative gap-4 rounded-xl">
                <div className="flex-grow-0 flex-shrink-0 relative rounded-xl">
                  {post.thumbnail && (
                    <Image src={post.thumbnail} alt="Post Thumbnail" width={388} height={280} objectFit="cover" />
                  )}
                  <div className="absolute top-4 right-4">
                    <BookmarkButton id={post.id} type="archive" />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2 px-5 py-2">
                  <h2 className="text-body1 font-bold text-neutral-900">
                    {post.title.length > 20 ? `${post.title.slice(0, 20)}...` : post.title}
                  </h2>
                  <p className="text-base text-body2 font-regular text-neutral-700">
                    {post.user.nickname
                      ? post.user.nickname.length > 20
                        ? `${post.user.nickname.slice(0, 20)}...`
                        : post.user.nickname
                      : 'unknown user'}
                  </p>
                </div>
                <div className="tags flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2 py-2 flex-wrap max-h-[40px] overflow-hidden">
                  {post.archive_tags && post.archive_tags.length > 0 ? (
                    post.archive_tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-neutral-50 px-3 py-1 rounded text-base font-medium text-neutral-700"
                        style={{ maxWidth: '100%' }}
                      >
                        #{tag.tag}
                      </span>
                    ))
                  ) : (
                    <span></span>
                  )}
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
  );
};

export default PopularArchiveSwiper;
