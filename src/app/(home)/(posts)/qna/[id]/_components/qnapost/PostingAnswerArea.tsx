import CustomMDEditor from '@/app/(home)/(upsert)/_components/CustomMDEditor';
import { Dispatch, SetStateAction } from 'react';

type PostingAnswerAreaProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  setToggleAnswer: Dispatch<SetStateAction<boolean>>;
};
const PostingAnswerArea = ({ content, setContent, setToggleAnswer }: PostingAnswerAreaProps) => {
  const handleCancleClick = () => {
    setToggleAnswer((prev) => !prev);
  };
  return (
    <>
      <div>
        <h2 className="h-[27px] text-h5 font-bold mb-4">본문</h2>
        <CustomMDEditor content={content} setContent={setContent} />
      </div>
      <div className="flex gap-6 h-12 w-[228px] ml-auto mt-6">
        <button
          type="button"
          className="text-neutral-500 w-[102px] h-12 bg-neutral-50 rounded-md"
          onClick={handleCancleClick}
        >
          취소하기
        </button>
        <button className="w-[102px] text-main-100 bg-main-50 rounded-md">답변등록</button>
      </div>
    </>
  );
};

export default PostingAnswerArea;
