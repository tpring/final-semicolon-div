import { timeForToday } from '@/components/timeForToday';
import { Treply } from '@/types/posts/qnaDetailTypes';
import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import ReplyForm from './ReplyForm';
import NotFound from '@/app/not-found';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from '@/app/(home)/loading';
import { useState } from 'react';

type AnswerCommentsProps = {
  commentId: string;
  replyCount: number;
};

const AnswerReplies = ({ commentId, replyCount }: AnswerCommentsProps) => {
  const pageParamList = [];
  for (let i = 0; replyCount - i * 5 > 0; i++) {
    pageParamList.push(i + 1);
  }
  const [page, setPage] = useState<number>(0);

  const getReplyList = async ({ queryKey, pageParam }: { queryKey: string[]; pageParam: number }) => {
    const [, id] = queryKey;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/qna-reply/${id}?page=${pageParam}`
    );
    const { data, message } = await response.json();
    if (message) {
      return <NotFound />;
    }
    return data;
  };

  const {
    fetchNextPage,
    data: qnaReplyList,
    isPending,
    isError
  } = useInfiniteQuery({
    queryKey: ['qnaReply', commentId],
    initialPageParam: 0,
    queryFn: getReplyList,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      return nextPage <= Math.ceil(replyCount / 5) ? nextPage : undefined;
    }
  });

  if (isPending) {
    return <Loading />;
  }
  //배열 5개씩 자르기!
  const handleBtnClick = async (pageParam: number) => {
    if (page < pageParam && !qnaReplyList?.pageParams.includes(pageParam)) {
      await fetchNextPage();
      setPage(pageParam);
      return;
    }
    setPage(pageParam);
  };

  return (
    <div>
      <ReplyForm />
      {qnaReplyList?.pages[page].map((reply: Treply) => {
        return (
          <div key={reply.id} className={`relative left-0 border-b`}>
            <div className="flex h-[86px] mt-6 mx-5 items-center gap-[16px] ">
              <span className="py-6">
                <Image src={reply.users.profile_image} alt="profile" width={48} height={48} />
              </span>
              <div>
                <div>{reply.users.nickname}</div>
                <div>{timeForToday(reply.updated_at!)}</div>
              </div>
            </div>
            <div className="flex flex-col h-[86px] mb-6 mx-5  gap-[16px]">
              <MDEditor.Markdown source={reply.reply} />
              <div>{reply.created_at.slice(0, 10)}</div>
            </div>
          </div>
        );
      })}
      <div className=" flex pt-6 gap-4 w-full justify-end">
        {pageParamList.map((pageParam) => {
          return (
            <button
              className={`text-subtitle1 ${page === pageParam - 1 ? 'text-main-400 bg-main-50' : 'bg-neutral-50 text-neutral-500'}  w-8 h-8 rounded-md`}
              key={'replyPage' + pageParam}
              onClick={() => {
                handleBtnClick(pageParam - 1);
              }}
            >
              {pageParam}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerReplies;
