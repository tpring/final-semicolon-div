import { Treply } from '@/types/posts/qnaDetailTypes';
import NotFound from '@/app/not-found';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from '@/app/(home)/loading';
import { Dispatch, SetStateAction, useState } from 'react';
import AnswerReplyForm from './AnswerReplyForm';
import AnswerReply from './AnswerReply';

type AnswerCommentsProps = {
  commentId: string;
  replyCount: number;
  setReplyCount: Dispatch<SetStateAction<number>>;
};

const AnswerReplies = ({ commentId, replyCount, setReplyCount }: AnswerCommentsProps) => {
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

  const handleBtnClick = async (pageParam: number) => {
    if (page < pageParam && !qnaReplyList?.pageParams.includes(pageParam)) {
      for (let i = page; i < pageParam; i++) {
        await fetchNextPage();
      }
      setPage(pageParam);
      return;
    }
    setPage(pageParam);
  };

  return (
    <div>
      <AnswerReplyForm commentId={commentId} setReplyCount={setReplyCount} />
      {qnaReplyList?.pages[page].map((reply: Treply) => {
        return <AnswerReply key={reply.id} reply={reply} setReplyCount={setReplyCount} />;
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
