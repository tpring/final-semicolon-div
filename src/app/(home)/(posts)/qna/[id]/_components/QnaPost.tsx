'use client';

import BackArrowIcon from '@/assets/images/upsert_image/BackArrowIcon';
import { useAuth } from '@/context/auth.context';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QnaQuestion from './qnapost/QnaQuestion';
import PostingQnaAnswer from './qnapost/PostingQnaAnswer';
import { TqnaData } from '@/types/posts/qnaDetailTypes';
import QnaAnswers from './qnapost/QnaAnswers';
import GoToTop from '@/assets/images/common/GoToTop';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import NotFound from '@/app/not-found';

type QnaPostProps = {
  data: TqnaData;
  postId: string;
};

const QnaPost = ({ data, postId }: QnaPostProps) => {
  const { me } = useAuth();
  const [content, setContent] = useState<string>('');
  const qnaCommentsCount = data.qna_comments[0].count;

  const handleTopBtnClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="mb-8">
        <Link className="mb-4" href={'/qna'}>
          <BackArrowIcon />
        </Link>
      </div>
      <QnaQuestion questionData={data} />
      {me?.id ? <PostingQnaAnswer content={content} setContent={setContent} /> : null}
      <QnaAnswers postId={postId} qnaCommentsCount={qnaCommentsCount} />
      <button className=" fixed right-[168px] bottom-[62px]" onClick={handleTopBtnClick}>
        <GoToTop />
      </button>
    </div>
  );
};

export default QnaPost;
