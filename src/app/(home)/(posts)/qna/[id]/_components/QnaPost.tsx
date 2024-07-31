'use client';

import BackArrowIcon from '@/assets/images/upsert_image/BackArrowIcon';
import { useAuth } from '@/context/auth.context';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QnaQuestion from './qnapost/QnaQuestion';
import PostingQnaAnswer from './qnapost/PostingQnaAnswer';
import { qnaData } from '@/types/posts/qnaDetailTypes';
import QnaAnswers from './qnapost/QnaAnswers';
import GoToTop from '@/assets/images/common/GoToTop';

type QnaPostProps = {
  data: [qnaData];
};

const QnaPost = ({ data }: QnaPostProps) => {
  const { me } = useAuth();
  const [questionData] = data;
  const qnaAnswers = questionData.qna_comments;
  const [content, setContent] = useState<string>('');

  const handleTopBtnClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {}, [data]);
  return (
    <div>
      <div className="mb-8">
        <Link className="mb-4" href={'/qna'}>
          <BackArrowIcon />
        </Link>
      </div>
      <QnaQuestion questionData={questionData} />
      {me?.id ? <PostingQnaAnswer content={content} setContent={setContent} /> : null}
      <QnaAnswers qnaAnswers={qnaAnswers} />
      <button className=" fixed right-[168px] bottom-[62px]" onClick={handleTopBtnClick}>
        <GoToTop />
      </button>
    </div>
  );
};

export default QnaPost;
