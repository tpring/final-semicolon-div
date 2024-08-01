import Kebab from '@/assets/images/common/kebab';

import { useState } from 'react';

type KebobBtnProps = {
  commentId?: string;
  replyId?: string;
};

const Kebob = ({ commentId, replyId }: KebobBtnProps) => {
  const [openKebab, setOpenKebab] = useState<boolean>(false);

  return (
    <>
      <div className="mr-[10px] relative">
        <button
          className="w-10 h-10 flex items-center text-center content-center px-4"
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

export default Kebob;
