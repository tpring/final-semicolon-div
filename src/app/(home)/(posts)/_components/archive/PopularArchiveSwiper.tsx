'use client';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { usePopularArchivePosts } from '@/hooks/archive/useFetchArchivePosts';
import { Post } from '@/types/posts/archiveTypes';
import Image from 'next/image';

const PopularArchiveSwiper = () => {
  const { data, error, isLoading } = usePopularArchivePosts();

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
        navigation={true}
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        className="ArchiveSwiper"
      >
        {data.data.map((post: Post) => (
          <SwiperSlide key={post.id}>
            <div>
              {post.thumbnail && (
                <Image src={post.thumbnail} alt="Post Thumbnail" width={388} height={280} objectFit="cover" />
              )}
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div>
                {post.archive_tags && post.archive_tags.length > 0 ? (
                  post.archive_tags.map((tag) => <span key={tag.id}>{tag.tag}</span>)
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularArchiveSwiper;
