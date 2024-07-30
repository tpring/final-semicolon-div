import CustomMDEditor from '@/app/(home)/(upsert)/_components/CustomMDEditor';
import { useAuth } from '@/context/auth.context';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type PostingQnaAnswerProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
};

const PostingQnaAnswer = ({ content, setContent }: PostingQnaAnswerProps) => {
  const { me: answer } = useAuth();
  return (
    <div className="w-[1204px] max-h-[1224px] mb-6 px-6 py-6 border rounded-2xl overflow-auto border-main-400">
      <div className="flex py-6 gap-x-4 w-[1154px] items-center mb-12 border-b">
        <div>{/* <Image src={answer?.profile_image} alt="profile" width={48} height={48} /> */}</div>
        <div className="flex flex-col w-[1060px]">
          <h2 className=" text-h5 font-bold h-[27px]">
            <span className="text-main-400 ">{answer?.email ?? ''}</span>님
          </h2>
          <h2 className="text-h4 font-bold h-[32px]">지식을 나눠주세요!</h2>
        </div>
      </div>
      <div>
        <h2 className="h-[27px] text-h5 font-bold mb-4">본문</h2>
        <CustomMDEditor content={content} setContent={setContent} />
      </div>
      <div className="flex gap-6 h-12 w-[228px] ml-auto mt-6">
        <button type="button" className="text-neutral-500 w-[102px] h-12 bg-neutral-50 rounded-md">
          취소하기
        </button>
        <button className="w-[102px] text-main-100 bg-main-50 rounded-md">답변등록</button>
      </div>
    </div>
  );
};

export default PostingQnaAnswer;
