'use client';

import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BestForumType } from '@/types/mainpage';
import { timeForToday } from '@/utils/timeForToday';
import { handleRinkCopy } from '@/utils/handleRinkCopy';
import Image from 'next/image';
import Share from '@/assets/images/common/Share';
import CommentBubble from '@/assets/images/common/CommentBubble';
import FilledLike from '@/assets/images/like/FilledLike';
import Star from '@/assets/images/main-page_image/Star';
import MDEditor from '@uiw/react-md-editor';
import { cutText, removeImageAndCodeBlocks } from '@/components/common/MarkdownCut';
import { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import CarouselLeftHover from '@/assets/images/common/CarouselLeftHover';
import CarouselLeft from '@/assets/images/common/CarouselLeft';
import CarouselRightHover from '@/assets/images/common/CarouselRightHover';
import CarouselRight from '@/assets/images/common/CarouselRight';
import LikeButton from '@/components/common/LikeButton';

const BestForum = () => {
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

  const { data: forumList } = useQuery<BestForumType[]>({
    queryKey: ['bestForum'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/auth/main-page/best-forum');
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  });

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-start items-center mb-5">
        <h1 className="text-h4 font-bold ">오늘의 인기 포럼이에요</h1>
        <Star />
      </div>
      <div className=" relative">
        <Swiper
          onSwiper={setSwiperInstance}
          loop={true}
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={20}
          className="mySwiper"
        >
          {forumList?.map((forum) => (
            <SwiperSlide key={forum.id}>
              <div className="w-90% border rounded-xl ml-1 px-4 ">
                <div className="flex justify-start items-center gap-4  border-b-[1px]">
                  <Image
                    src={forum.users.profile_image}
                    alt="userImage"
                    width={48}
                    height={48}
                    className=" w-[48px] h-[48px] rounded-full"
                  />
                  <div className=" flex flex-col justify-start gap-1 py-4">
                    <h2>{forum.users.nickname}</h2>
                    <div className="flex justify-start items-center gap-1">
                      <p className="text-body font-regular text-neutral-300">{forum.forum_category}</p>
                      <span className="text-body font-regular text-neutral-300">▪</span>
                      <p className="text-body font-regular text-neutral-300">
                        {timeForToday(forum.updated_at ? forum.updated_at : forum.created_at)}
                        <span className="text-xs">{forum.updated_at !== forum.created_at && '(수정됨)'}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <Link href={`/forum/${forum.id}`}>
                  <div className=" flex flex-col gap-1 h-80 mt-4 ">
                    {forum.thumbnail ? (
                      <Image src={forum.thumbnail} alt="forumThumbnail" width={210} height={210} />
                    ) : null}
                    <h1 className="text-h5 font-bold ">{forum.title}</h1>
                    {forum.thumbnail ? (
                      <p
                        className="text-body2 font-regular normal whitespace-pre-wrap break-words overflow-hidden  "
                        data-color-mode="light"
                      >
                        <MDEditor.Markdown source={cutText(removeImageAndCodeBlocks(forum.content), 100)} />
                      </p>
                    ) : (
                      <p
                        className="text-body2 font-regular normal whitespace-pre-wrap break-words overflow-hidden   "
                        data-color-mode="light"
                      >
                        <MDEditor.Markdown source={cutText(removeImageAndCodeBlocks(forum.content), 200)} />
                      </p>
                    )}
                  </div>
                  <p className=" text-right text-body font-regular text-neutral-400 mt-4">
                    {forum.created_at.slice(0, 10).replace(/-/g, '.')}
                  </p>
                </Link>
                <div className="flex justify-between items-center py-2 text-sm">
                  <div className="flex justify-start items-center gap-4">
                    <LikeButton id={forum.id} type="forum" />
                    <button onClick={() => handleRinkCopy(`${process.env.NEXT_PUBLIC_BASE_URL}/forum/${forum.id}`)}>
                      <Share />
                    </button>
                  </div>
                  <div className=" flex justify-start items-center gap-1">
                    <CommentBubble />
                    <p className="text-subtitle1 font-medium text-neutral-400">{forum.comments[0].count}</p>
                  </div>
                </div>
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

export default BestForum;
