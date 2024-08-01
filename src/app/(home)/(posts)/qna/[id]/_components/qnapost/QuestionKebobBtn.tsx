import Kebab from '@/assets/images/common/kebab';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type KebobBtnProps = {
  postId: string;
};

const QuestionKebobBtn = ({ postId }: KebobBtnProps) => {
  const router = useRouter();
  const [openKebab, setOpenKebab] = useState<boolean>(false);

  return (
    <>
      <div className="mr-[10px] relative">
        <button
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
