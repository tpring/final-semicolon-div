'use client';

import BlueCheck from '@/assets/images/common/BlueCheck';
import CommentBubble from '@/assets/images/common/CommentBubble';
import Dot from '@/assets/images/common/Dot';
import { cutText, removeImageAndCodeBlocks } from '@/components/common/MarkdownCut';
import SortDropdown from '@/components/common/SortDropdownGrey';
import useFetchQnaPosts from '@/hooks/qna/useFetchQnaPosts';
import { Post, SortOption } from '@/types/posts/qnaTypes';
import { timeForToday } from '@/utils/timeForToday';
import MDEditor from '@uiw/react-md-editor';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ResentQnaPosts = () => {
  const [status, setStatus] = useState('waiting');
  const [waitingPage, setWaitingPage] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [sortMethod, setSortMethod] = useState<SortOption>('latest');

  const {
    data: waitingPosts,
    error: waitingError,
    isPending: isPendingWaiting,
    isError: isErrorWaiting,
    totalPages: waitingTotalPages,
    goToPage: goToWaitingPage
  } = useFetchQnaPosts('waiting');

  const {
    data: selectedPosts,
    error: selectedError,
    isPending: isPendingSelected,
    isError: isErrorSelected,
    totalPages: selectedTotalPages,
    goToPage: goToSelectedPage
  } = useFetchQnaPosts('selected');

  // const handleTabClick = (newStatus: string) => {
  //   setStatus(newStatus);
  //   if (newStatus === 'waiting') {
  //     goToWaitingPage(waitingPage);
  //   } else {
  //     goToSelectedPage(selectedPage);
  //   }
  // };

  useEffect(() => {
    if (status === 'waiting') {
      goToWaitingPage(waitingPage);
    } else {
      goToSelectedPage(selectedPage);
    }
  }, [status, waitingPage, selectedPage, goToWaitingPage, goToSelectedPage]);

  const filterAndSortPosts = (posts: Post[], sortMethod: SortOption): Post[] => {
    switch (sortMethod) {
      case 'latest':
        return posts.sort((a, b) => dayjs(b.created_at).unix() - dayjs(a.created_at).unix());
      case 'mostComments':
        return posts.sort((a, b) => (b.qna_comment[0]?.count || 0) - (a.qna_comment[0]?.count || 0));
      case 'mostLikes':
        return posts.sort((a, b) => (b.qna_like[0]?.count || 0) - (a.qna_like[0]?.count || 0));
      default:
        return posts;
    }
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'latest', label: '최신순' },
    { value: 'mostComments', label: '댓글순' },
    { value: 'mostLikes', label: '좋아요순' }
  ];

  if (status === 'waiting' && isPendingWaiting) {
    return <div>Loading...</div>;
  }

  if (status === 'selected' && isPendingSelected) {
    return <div>Loading...</div>;
  }

  if (status === 'waiting' && isErrorWaiting) {
    return <div>Error: {waitingError?.message}</div>;
  }

  if (status === 'selected' && isErrorSelected) {
    return <div>Error: {selectedError?.message}</div>;
  }

  const posts = status === 'waiting' ? waitingPosts : selectedPosts;
  const totalPages = status === 'waiting' ? waitingTotalPages : selectedTotalPages;
  const setPage = status === 'waiting' ? setWaitingPage : setSelectedPage;

  const sortedPosts = posts ? filterAndSortPosts(posts, sortMethod) : [];

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(event.target.value as SortOption);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-start w-full">
        <div className="flex justify-center items-center w-full">
          <button
            onClick={() => setStatus('waiting')}
            className={`flex justify-center items-center flex-grow py-6 ${
              status === 'waiting' ? 'bg-sub-50 text-neutral-800' : 'bg-white text-neutral-300'
            } rounded-tl-3xl rounded-tr-3xl transition-colors duration-300`}
          >
            <p className="text-body1 font-bold"> 채택을 기다리는 질문글</p>
          </button>
          <button
            onClick={() => setStatus('selected')}
            className={`flex justify-center items-center flex-grow py-6 ${
              status === 'selected' ? 'bg-sub-50 text-neutral-800' : 'bg-white text-neutral-300'
            } rounded-tr-3xl rounded-tl-3xl transition-colors duration-300`}
          >
            <p className="text-body1 font-bold"> 채택된 질문글</p>
          </button>
        </div>
        <div
          className={`w-full h-[88px] bg-sub-50 border-t-0 border-r-0 border-b border-l-0 border-[#c7dcf5] flex justify-end items-center pr-6`}
        >
          <label>
            <SortDropdown sortBy={sortMethod} handleSortChange={handleSortChange} sortOptions={sortOptions} />
          </label>
        </div>
      </div>

      {sortedPosts && sortedPosts.length > 0 ? (
        <ul>
          {sortedPosts.map((post: Post) => (
            <li key={post.id} className="border-b border-neutral-100 p-4">
              <Link href={`/qna/${post.id}`} className="block">
                <div className="flex items-center mb-2">
                  <div className="relative w-10 h-10">
                    <Image
                      src={post.user.profile_image}
                      alt={post.user.nickname || 'Unknown User'}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div className="ml-2 flex items-center">
                    <p className="text-body1 font-medium text-neutral-900 mr-1">{post.user.nickname}</p>
                    <Dot />
                    <p className="text-body1 font-regular text-neutral-500 ml-1"> {timeForToday(post.created_at)}</p>
                    <div className="ml-2">{post.selected_comment !== null && <BlueCheck />}</div>
                  </div>
                </div>
                <h2 className="text-h5 font-bold text-neutral-900">{post.title}</h2>
                <div className="mt-2 text-neutral-700 mb-4" data-color-mode="light">
                  <MDEditor.Markdown source={cutText(removeImageAndCodeBlocks(post.content), 300)} />
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4 max-h-[40px] overflow-hidden">
                  {post.qna_tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-neutral-50 px-3 py-1 rounded text-base font-medium text-neutral-700"
                      style={{ maxWidth: '100%' }}
                    >
                      #{tag.tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="text-body1 font-regular text-main-500">좋아요 {post.qna_like[0]?.count || 0}</p>
                    <div className="w-0.5 h-[18px] bg-neutral-200" />
                    <p className="text-body1 font-regular next-neutral-500">답변 {post.qna_comment[0]?.count || 0}</p>
                  </div>
                </div>
                <div className="post-date mt-1 text-sm text-neutral-300">
                  {dayjs(post.created_at).format('YYYY-MM-DD HH:mm')}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>게시물이 없습니다.</div>
      )}
      <div className="flex justify-center items-center gap-4 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            disabled={index === (status === 'waiting' ? waitingPage : selectedPage)}
            className={`w-[33px] h-[32px] flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 px-2 py-1 rounded-md ${
              index === (status === 'waiting' ? waitingPage : selectedPage)
                ? 'bg-main-50'
                : 'bg-neutral-100 border border-neutral-100'
            }`}
          >
            <p
              className={`flex-grow-0 flex-shrink-0 text-body1 font-medium text-center ${
                index === (status === 'waiting' ? waitingPage : selectedPage) ? 'text-main-500' : 'text-neutral-500'
              }`}
            >
              {index + 1}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResentQnaPosts;
