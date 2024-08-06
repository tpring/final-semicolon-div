'use client';

import GradCap from '@/assets/images/qna/GradCap';
import { cutText, removeImageAndCodeBlocks } from '@/utils/markdownCut';
import useFetchQnaPosts from '@/hooks/qna/useFetchQnaPosts';
import MDEditor from '@uiw/react-md-editor';
import Link from 'next/link';

const truncateTitle = (title: string, maxLength: number) => {
  return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
};

const PopularQnaPosts = () => {
  const {
    data: popularPosts,
    error: popularError,
    isPending: isPendingPopular,
    isError: isErrorPopular,
    page: popularPage,
    totalPages: popularTotalPages,
    goToPage: goToPopularPage
  } = useFetchQnaPosts('popular');

  if (isPendingPopular) {
    return <div>Loading...</div>;
  }

  if (isErrorPopular) {
    return <div>Error: {popularError?.message}</div>;
  }

  const pageSize = 6;
  const startIndex = popularPage * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="flex justify-start items-center relative gap-1.5 mb-4">
        <p className="flex items-center text-2xl font-bold text-left text-neutral-900 ">
          인기 Q&A
          <div className="ml-1">
            <GradCap />
          </div>
        </p>
      </div>
      {popularPosts && popularPosts.length > 0 ? (
        <ul className="grid grid-cols-2">
          {popularPosts.map((post, index) => (
            <Link key={post.id} href={`/qna/${post.id}`}>
              <li
                key={post.id}
                className={`border-t border-b border-neutral-50 p-4 flex flex-col min-h-[158px] ${
                  index % 2 === 0 ? 'border-r' : 'border-l'
                }`}
              >
                <div className="flex justify-start items-center mb-2">
                  <p className="text-xl font-bold text-left text-main-500">{startIndex + index + 1}</p>
                  <p className="ml-2 text-xl font-bold text-left text-neutral-900">{truncateTitle(post.title, 30)}</p>
                </div>
                <div className="text-lg font-medium text-left text-neutral-300 mb-5" data-color-mode="light">
                  <MDEditor.Markdown source={cutText(removeImageAndCodeBlocks(post.content), 30)} />
                </div>
                <div className="mt-auto">
                  <div className="flex justify-start items-center gap-2 ">
                    <div className="flex items-center gap-1">
                      <p className="text-body1 text-left text-main-500">좋아요</p>
                      <p className="text-body1 text-left text-main-500">{post.qna_like?.[0]?.count || 0}</p>
                    </div>
                    <div className="w-0.5 h-[18px] bg-neutral-200" />
                    <div className="flex items-center gap-1">
                      <p className="text-lg text-left text-neutral-300">답변수</p>
                      <p className="text-lg text-left text-neutral-300">{post.qna_comment?.[0]?.count || 0}</p>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <div>게시물이 없습니다.</div>
      )}
      <div className="flex justify-center items-center gap-4 mt-4">
        {Array.from({ length: popularTotalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPopularPage(index)}
            disabled={index === popularPage}
            className={`w-[33px] h-[32px] flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 px-3 py-1 rounded-md ${
              index === popularPage ? 'bg-main-50' : 'bg-neutral-100 border border-neutral-100'
            }`}
          >
            <p
              className={`flex-grow-0 flex-shrink-0 text-body1 font-medium text-left ${
                index === popularPage ? 'text-main-500' : 'text-neutral-500'
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

export default PopularQnaPosts;
