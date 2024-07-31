import CustomMDEditor from '@/app/(home)/(upsert)/_components/CustomMDEditor';
import { useAuth } from '@/context/auth.context';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import PostingAnswerArea from './PostingAnswerArea';

type PostingQnaAnswerProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
};

const PostingQnaAnswer = ({ content, setContent }: PostingQnaAnswerProps) => {
  const { me: answer } = useAuth();
  const [toggleAnswer, setToggleAnswer] = useState<boolean>(false);
  const handleToggleClick = () => {
    setToggleAnswer((prev) => !prev);
  };
  const handleCancleClick = () => {
    setToggleAnswer((prev) => !prev);
  };
  return (
    <div
      className={`w-[1204px] max-h-[1224px] mb-6 px-6 py-6 border rounded-2xl overflow-auto  ${toggleAnswer ? 'border-main-400' : ''} `}
    >
      <div className={`flex py-6 gap-x-4 w-[1154px] items-center mb-12 ${toggleAnswer ? 'border-b' : ''} `}>
        <div>
          <Image src={''} alt="profile" width={48} height={48} />
        </div>
        <div className="flex flex-col w-[1060px]">
          <h2 className=" text-h5 font-bold h-[27px]">
            <span className="text-main-400 ">{answer?.email ?? ''}</span>님
          </h2>
          <h2 className="text-h4 font-bold h-[32px]">지식을 나눠주세요!</h2>
        </div>
        {toggleAnswer ? null : (
          <button
            className="w-[110px] h-[56px] bg-main-400 text-white text-subtitle1 rounded-lg"
            onClick={handleToggleClick}
          >
            답변하기
          </button>
        )}
      </div>
      {toggleAnswer ? (
        <PostingAnswerArea content={content} setContent={setContent} setToggleAnswer={setToggleAnswer} />
      ) : null}
    </div>
  );
};

export default PostingQnaAnswer;
