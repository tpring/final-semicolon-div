import { revalidatePostTag } from '@/actions/revalidatePostTag';
import KebabButton from '@/assets/images/common/KebabButton';
import { useAuth } from '@/context/auth.context';
import { useQnaDetailStore } from '@/store/qnaDetailStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

type KebobBtnProps = {
  commentId: string;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  setQnaCommentsCount: Dispatch<SetStateAction<number>>;
};

const AnswerKebobBtn = ({ commentId, isEdit, setIsEdit, setQnaCommentsCount }: KebobBtnProps) => {
  const { postId } = useQnaDetailStore();
  const { me } = useAuth();
  const [openKebab, setOpenKebab] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleEditComment: MouseEventHandler<HTMLLIElement> = async () => {
    isEdit ? setIsEdit(false) : setIsEdit(true);
    setOpenKebab(false);
  };

  const handleDeleteComment: MouseEventHandler<HTMLLIElement> = async () => {
    if (!me?.id) return;
    const data = await deleteMutate({ commentId });
    toast.success('답변 삭제 완료', { autoClose: 1500, hideProgressBar: true });
    setQnaCommentsCount((prev) => prev - 1);
    await revalidatePostTag(`qna-detail-${postId}`);
    return;
  };

  const deleteComment = async ({ commentId }: { commentId: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/comment/${commentId}`, {
      method: 'DELETE'
    });
    const { data, message } = await response.json();
    if (message) {
      return toast.error(message);
    }
    return data;
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qnaComments', postId] });
    }
  });

  return (
    <>
      <div className="mr-[10px] relative">
        <button
          onClick={() => {
            setOpenKebab((prev) => !prev);
          }}
        >
          <KebabButton />
        </button>
        <ul
          className={`${openKebab ? 'border border-neutral-100 bg-white' : 'hidden'} rounded-lg flex flex-col absolute w-[105px] h-[88px] right-0 text-center z-40 hover:border-main-400 text-body2`}
        >
          <li
            className={`h-[44px] content-center ${openKebab ? '' : 'hidden'} hover:bg-main-100 hover:text-main-400 rounded-t-lg cursor-pointer `}
            onClick={handleEditComment}
          >
            {isEdit ? '수정 취소' : '게시글 수정'}
          </li>
          <li
            className={`h-[44px]  content-center ${openKebab ? '' : 'hidden'}  hover:bg-main-100 hover:text-main-400 rounded-b-lg cursor-pointer`}
            onClick={handleDeleteComment}
          >
            게시글 삭제
          </li>
        </ul>
      </div>
    </>
  );
};

export default AnswerKebobBtn;
