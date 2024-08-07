import { useAuth } from '@/context/auth.context';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import PostingAnswerArea from './PostingAnswerArea';

type PostingQnaAnswerProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  setQnaCommentsCount: Dispatch<SetStateAction<number>>;
};

const PostingQnaAnswer = ({ content, setContent, setQnaCommentsCount }: PostingQnaAnswerProps) => {
  const { userData: answer } = useAuth();
  const [toggleAnswer, setToggleAnswer] = useState<boolean>(false);

  const handleToggleClick = () => {
    setToggleAnswer((prev) => !prev);
  };

  return (
    <div
      className={`w-[1204px] max-h-[1224px] mb-6 px-6 py-6 border rounded-2xl overflow-y-auto overflow-x-hidden ${toggleAnswer ? 'border-main-400' : ''} `}
    >
      <div className={`flex py-6 gap-x-4 w-[1154px] items-center mb-12 ${toggleAnswer ? 'border-b' : ''} `}>
        <div className="relative w-12 h-12">
          <Image
            src={answer?.profile_image ?? ''}
            alt="Profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col w-[1060px] ">
          <span className="text-main-400 text-subtitle1 font-medium">
            {answer?.nickname ?? ''}
            <span className="text-neutral-900">님</span>
          </span>
          <h2 className="text-h4 font-bold h-[32px]">지식을 나눠주세요!</h2>
        </div>
        {toggleAnswer ? null : (
          <button
            className="w-[110px] h-[56px] bg-main-400 text-white text-subtitle1 rounded-lg hover:bg-main-500"
            onClick={handleToggleClick}
          >
            답변하기
          </button>
        )}
      </div>
      {toggleAnswer ? (
        <PostingAnswerArea
          content={content}
          setContent={setContent}
          setToggleAnswer={setToggleAnswer}
          setQnaCommentsCount={setQnaCommentsCount}
        />
      ) : null}
    </div>
  );
};

export default PostingQnaAnswer;
