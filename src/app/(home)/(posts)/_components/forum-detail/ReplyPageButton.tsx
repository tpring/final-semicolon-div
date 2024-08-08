'use client';

import { forumReplyType } from '@/types/posts/forumDetailTypes';
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect } from 'react';

type forumReplyPageProps = {
  page: number;
  totalPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<forumReplyType, unknown>, Error>>;
  reply: InfiniteData<forumReplyType> | undefined;
};

const ReplyPageButton = ({ page, setPage, totalPage, fetchNextPage, reply }: forumReplyPageProps) => {
  const pageList = [];
  for (let i = 0; totalPage - i > 0; i++) {
    pageList.push(i + 1);
  }

  useEffect(() => {
    for (let i = 0; totalPage - i > 0; i++) {
      pageList.push(i + 1);
    }
    page > pageList.length ? setPage(pageList.length) : '';
  }, [totalPage]);

  const handleBtnClick = async (pageParam: number) => {
    if (page < pageParam && !reply?.pageParams?.includes(pageParam)) {
      for (let i = page; i < pageParam; i++) {
        await fetchNextPage();
      }
      setPage(pageParam);
      return;
    }
    setPage(pageParam);
  };

  return (
    <div className="flex justify-end items-end gap-2 mt-4">
      {pageList.map((pageList) => {
        return (
          <button
            className={`text-subtitle1 ${page === pageList - 1 ? 'text-main-400 bg-main-50' : 'bg-neutral-50 text-neutral-500'}  w-8 h-8 rounded-md`}
            key={'replyPage' + pageList}
            onClick={() => {
              handleBtnClick(pageList - 1);
            }}
          >
            {pageList}
          </button>
        );
      })}
    </div>
  );
};

export default ReplyPageButton;
