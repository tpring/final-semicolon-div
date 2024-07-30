'use client';

import BackArrowIcon from '@/assets/images/upsert_image/BackArrowIcon';
import { useAuth } from '@/context/auth.context';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QnaQuestion from './qnapost/QnaQuestion';
import PostingQnaAnswer from './qnapost/PostingQnaAnswer';
import { qnaData } from '@/types/posts/qnaDetailTypes';
import QnaAnswers from './qnapost/QnaAnswers';

type QnaPostProps = {
  data: [qnaData];
};

const QnaPost = ({ data }: QnaPostProps) => {
  const { me } = useAuth();
  const questionData = data[0];
  const qnaAnswers = questionData.qna_comments;
  const [content, setContent] = useState<string>('');
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
      <button className="w-24 h-24 bg-main-400 rounded-[28px] fixed right-[168px] bottom-[62px] text-white">
        버튼
      </button>
    </div>
  );
};

export default QnaPost;
