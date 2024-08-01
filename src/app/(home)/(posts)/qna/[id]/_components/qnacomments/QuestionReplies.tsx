import { timeForToday } from '@/components/timeForToday';
import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import { useState } from 'react';
import NotFound from '@/app/not-found';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from '@/app/(home)/loading';
import { TpostReply } from '@/types/posts/qnaDetailTypes';
import QuestionReplyForm from './QuestionReplyForm';
import Kebob from '../qnapost/Kebob';
import { useAuth } from '@/context/auth.context';

type AnswerCommentsProps = {
  questionId: string;
  postReplyCount: number;
};

const QuestionReplies = ({ questionId, postReplyCount }: AnswerCommentsProps) => {
  const { me } = useAuth();
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

  const {
    fetchNextPage,
    data: qnaReplyList,
    isPending,
    isError
  } = useInfiniteQuery({
    queryKey: ['qnaReply', questionId],
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
  //배열 5개씩 자르기
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
      <QuestionReplyForm questionId={questionId} />
      {qnaReplyList?.pages[page].map((reply: TpostReply) => {
        return (
          <div key={reply.id} className={`relative left-0 border-b`}>
            <div className="flex h-[86px] mt-6 mx-5 items-center gap-[16px] ">
              <div className="relative w-12 h-12">
                <Image
                  src={reply.users?.profile_image ?? ''}
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div>
                <div>{reply.users.nickname}</div>
                <div>{timeForToday(reply.updated_at!)}</div>
              </div>
              {me?.id === reply.user_id ? (
                <div className="flex ml-auto ">
                  <Kebob />
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="flex flex-col h-[86px] mb-6 mx-5  gap-[16px]">
              <MDEditor.Markdown source={reply.post_reply_content} />
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

export default QuestionReplies;
