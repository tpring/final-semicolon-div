import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import NotFound from '@/app/not-found';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from '@/app/(home)/loading';
import { TpostReply } from '@/types/posts/qnaDetailTypes';
import QuestionReplyForm from './QuestionReplyForm';
import { useQnaDetailStore } from '@/store/qnaDetailStore';
import QuestionReply from './QuestionReply';

type AnswerCommentsProps = {
  postReplyCount: number;
  setReplyCount: Dispatch<SetStateAction<number>>;
};

const QuestionReplies = ({ postReplyCount, setReplyCount }: AnswerCommentsProps) => {
  const { postId } = useQnaDetailStore();
  const pageParamList = [];
  for (let i = 0; postReplyCount - i * 5 > 0; i++) {
    pageParamList.push(i + 1);
  }
  const [page, setPage] = useState<number>(0);

  const getReplyList = async ({ queryKey, pageParam }: { queryKey: string[]; pageParam: number }) => {
    const [, id] = queryKey;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/qna-post-reply/${id}?page=${pageParam}`
    );
    const { data, message } = await response.json();
    if (message) {
      return <NotFound />;
    }
    return data;
  };

  useEffect(() => {
    for (let i = 0; postReplyCount - i * 5 > 0; i++) {
      pageParamList.push(i + 1);
    }
    page > pageParamList.length ? setPage(pageParamList.length) : '';
  }, [postReplyCount]);
  const {
    fetchNextPage,
    data: qnaReplyList,
    isPending,
    isError
  } = useInfiniteQuery({
    queryKey: ['qnaReply', postId],
    initialPageParam: 0,
    queryFn: getReplyList,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      return nextPage <= Math.ceil(postReplyCount / 5) ? nextPage : undefined;
    }
  });

  if (isPending) {
    return <Loading />;
  }
  if (isError) {
    return <NotFound />;
  }
  //배열 5개씩 자르기 //한번에 4로 갔을 때 pageParam이 3이고
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
      <QuestionReplyForm setReplyCount={setReplyCount} />
      {qnaReplyList?.pages[page].map((reply: TpostReply) => {
        return <QuestionReply key={reply.id} reply={reply} setReplyCount={setReplyCount} />;
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

export default QuestionReplies;
