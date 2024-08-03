import Kebab from '@/assets/images/common/Kebab';
import { useQnaDetailStore } from '@/store/qnaDetailStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const QuestionKebobBtn = () => {
  const router = useRouter();
  const [openKebab, setOpenKebab] = useState<boolean>(false);
  const { postId } = useQnaDetailStore();

  return (
    <>
      <div className=" relative">
        <button
          className="w-[20px]"
          onClick={() => {
            setOpenKebab((prev) => !prev);
          }}
        >
          <Kebab />
        </button>
        <ul
          className={`${openKebab ? 'border border-neutral-100 bg-white' : 'hidden'} rounded-lg flex flex-col absolute w-[105px] h-[88px] right-0 text-center hover:border-main-400 text-body2`}
        >
          <li
            className={`h-[44px] content-center ${openKebab ? '' : 'hidden'} hover:bg-main-100 hover:text-main-400 rounded-t-lg `}
            onClick={() => {
              router.push(`/edit/${postId}/?category=qna`);
            }}
          >
            게시글 수정
          </li>
          <li
            className={`h-[44px]  content-center ${openKebab ? '' : 'hidden'}  hover:bg-main-100 hover:text-main-400 rounded-b-lg`}
          >
            게시글 삭제
          </li>
        </ul>
      </div>
    </>
  );
};

export default QuestionKebobBtn;
