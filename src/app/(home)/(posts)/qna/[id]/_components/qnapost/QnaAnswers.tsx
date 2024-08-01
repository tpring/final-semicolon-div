import QnaAnswer from './QnaAnswer';
import { useInfiniteQuery } from '@tanstack/react-query';
import NotFound from '@/app/not-found';
import Loading from '@/app/(home)/loading';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { TqnaCommentsWithReplyCount } from '@/types/posts/qnaDetailTypes';

type QnaAnswersProps = {
  postId: string;
  qnaCommentsCount: number;
};

const QnaAnswers = ({ postId, qnaCommentsCount }: QnaAnswersProps) => {
  const [ref, inView] = useInView({ threshold: 0.5 });

  const getCommentList = async ({ queryKey, pageParam }: { queryKey: string[]; pageParam: number }) => {
    const [, id] = queryKey;
    const response = await fetch(`/api/posts/qna-detail/comment/${id}?page=${pageParam}`);
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

  return (
    <div>
      {(qnaCommentList as TqnaCommentsWithReplyCount[]).map((qnaComment) => {
        return <QnaAnswer key={qnaComment.id} qnaComment={qnaComment} />;
      })}
      <div className="h-[80px]" ref={ref}></div>
    </div>
  );
};

export default QnaAnswers;
