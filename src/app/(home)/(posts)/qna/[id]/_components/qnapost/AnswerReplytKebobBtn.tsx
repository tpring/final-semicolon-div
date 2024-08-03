import { revalidate } from '@/actions/revalidate';
import KebabButton from '@/assets/images/common/KebabButton';

import { useQnaDetailStore } from '@/store/qnaDetailStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

type ReplytKebobBtnProps = {
  commentId: string;
  replyId: string;
  setReplyCount: Dispatch<SetStateAction<number>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

const AnswerReplytKebobBtn = ({ commentId, replyId, setReplyCount, setIsEdit }: ReplytKebobBtnProps) => {
  const [openKebab, setOpenKebab] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleDeleteReply: MouseEventHandler<HTMLLIElement> = async () => {
    if (!replyId) return;
    const data = await deleteMutate({ replyId });
    toast.success('댓글 삭제 완료', { autoClose: 1500, hideProgressBar: true });
    setOpenKebab(false);
    setReplyCount((prev) => prev - 1);
    await revalidate('/', 'layout');
    return;
  };

  const deleteReply = async ({ replyId }: { replyId: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/qna-reply/${replyId}`, {
      method: 'DELETE'
    });
    const { data, message } = await response.json();
    if (message) {
      return toast.error(message);
    }
    return data;
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qnaReply', commentId] });
    }
  });

  return (
    <>
      <div className="mr-[10px] relative">
        <button
          className="w-10 h-10 flex items-center text-center content-center px-4"
          onClick={() => {
            setOpenKebab((prev) => !prev);
          }}
        >
          <KebabButton />
        </button>
        <ul
          className={`${openKebab ? 'border border-neutral-100 bg-white' : 'hidden'} rounded-lg flex flex-col absolute w-[105px] h-[88px] right-0 text-center hover:border-main-400 text-body2`}
        >
          <li
            className={`h-[44px] content-center ${openKebab ? '' : 'hidden'} hover:bg-main-100 hover:text-main-400 rounded-t-lg `}
            onClick={() => {
              setIsEdit(true);
              setOpenKebab(false);
            }}
          >
            댓글 수정
          </li>
          <li
            className={`h-[44px]  content-center ${openKebab ? '' : 'hidden'}  hover:bg-main-100 hover:text-main-400 rounded-b-lg`}
            onClick={handleDeleteReply}
          >
            댓글 삭제
          </li>
        </ul>
      </div>
    </>
  );
};

export default AnswerReplytKebobBtn;
