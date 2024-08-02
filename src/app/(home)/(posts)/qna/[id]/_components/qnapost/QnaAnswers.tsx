import QnaAnswer from './QnaAnswer';
import { useInfiniteQuery } from '@tanstack/react-query';
import NotFound from '@/app/not-found';
import Loading from '@/app/(home)/loading';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { TqnaCommentsWithReplyCount } from '@/types/posts/qnaDetailTypes';
import { useQnaDetailStore } from '@/store/qnaDetailStore';

type QnaAnswersProps = {
  qnaCommentsCount: number;
  questioner: string;
};

const QnaAnswers = ({ qnaCommentsCount, questioner }: QnaAnswersProps) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const { postId, seletedComment } = useQnaDetailStore();

  const getCommentList = async ({ queryKey, pageParam }: { queryKey: string[]; pageParam: number }) => {
    const [, id] = queryKey;
    const response = await fetch(`/api/posts/qna-detail/comment/${id}?page=${pageParam}&selected=${seletedComment}`);
    const { data, message } = await response.json();
    if (message) {
      return <NotFound />;
    }
    return data;
  };

  const {
    fetchNextPage,
    data: qnaCommentList,
    isPending,
    isError
  } = useInfiniteQuery({
    queryKey: ['qnaComments', postId],
    initialPageParam: 0,
    queryFn: getCommentList,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      return nextPage <= Math.ceil(qnaCommentsCount / 3) ? nextPage : undefined;
    },
    select: ({ pages }) => pages.flat()
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isPending) {
    return <Loading />;
  } else if (!qnaCommentList) {
    return;
  }

  const selectedCommentIndex = qnaCommentList.findIndex((comment) => comment.id === seletedComment);
  [qnaCommentList[0], qnaCommentList[selectedCommentIndex]] = [qnaCommentList[selectedCommentIndex], qnaCommentList[0]];

  return (
    <div>
      <div></div>
      {(qnaCommentList as TqnaCommentsWithReplyCount[]).map((qnaComment, index) => {
        return index === 0 ? (
          <QnaAnswer
            key={qnaComment.id}
            qnaComment={qnaComment}
            questioner={questioner}
            index={index}
            qnaCommentsCount={qnaCommentsCount}
          />
        ) : (
          <QnaAnswer key={qnaComment.id} qnaComment={qnaComment} questioner={questioner} />
        );
      })}
      <div className="h-[80px]" ref={ref}></div>
    </div>
  );
};

export default QnaAnswers;
