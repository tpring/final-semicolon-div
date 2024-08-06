import CustomMDEditor from '@/app/(home)/(upsert)/_components/CustomMDEditor';
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import PostingAnswerModal from '../confirm-modal/PostingAnswerModal';
import { useAuth } from '@/context/auth.context';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQnaDetailStore } from '@/store/qnaDetailStore';
import { revalidatePostTag } from '@/actions/revalidatePostTag';
import { TAG_LIST } from '@/constants/tags';
import SelectTagInput from '@/components/common/SelectTagInput';
import ConfirmModal from '@/components/modal/ConfirmModal';

type PostingAnswerAreaProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  setToggleAnswer: Dispatch<SetStateAction<boolean>>;
  setQnaCommentsCount: Dispatch<SetStateAction<number>>;
};
const PostingAnswerArea = ({ content, setContent, setToggleAnswer, setQnaCommentsCount }: PostingAnswerAreaProps) => {
  const { me } = useAuth();
  const { postId } = useQnaDetailStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tagList, setTagList] = useState<Array<Ttag>>(TAG_LIST);
  const queryClient = useQueryClient();
  const handleCancleClick = () => {
    setIsModalOpen(true);
  };

  const handlePostingAnswer: MouseEventHandler = async (event) => {
    if (!me?.id) return;
    await addMutate({ user_id: me.id, content, tags: tagList.filter((tag) => tag.selected) });
    toast.success('답변 작성 완료!', { autoClose: 1500, hideProgressBar: true });
    setQnaCommentsCount((prev) => prev + 1);
    await revalidatePostTag(`qna-detail-${postId}`);
    return;
  };

  const postingAnswer = async ({ user_id, content, tags }: { user_id: string; content: string; tags: Ttag[] }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/comment/${postId}`, {
      method: 'POST',
      body: JSON.stringify({ user_id, comment: content })
    });
    const { data, message } = await response.json();
    if (message) {
      return toast.error(message);
    }

    if (data[0]) {
      const tagResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upsert/tags/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ comment_id: data[0]?.id, user_id: me?.id, tags: tags, category: 'comment' })
      });
      const { message } = await tagResponse.json();
      console.log(message);
    }

    return data;
  };

  const { mutate: addMutate } = useMutation({
    mutationFn: postingAnswer,
    onSuccess: () => {
      setToggleAnswer(false);
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['qnaComments', postId] });
    }
  });

  // if (isModalOpen) {
  //   document.body.style.overflow = 'hidden';
  // }

  return (
    <>
      <div>
        {isModalOpen ? (
          // <PostingAnswerModal
          //   isModalOpen={isModalOpen}
          //   setIsModalOpen={setIsModalOpen}
          //   setContent={setContent}
          //   setToggleAnswer={setToggleAnswer}
          // />
          <ConfirmModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
            }}
            onConfirm={() => {
              setIsModalOpen(false);
              setContent('');
            }}
            message="ee"
          />
        ) : null}

        <h2 className="h-[27px] text-h5 font-bold mb-4">본문</h2>
        <CustomMDEditor content={content} setContent={setContent} />
      </div>
      <div className="h-[182px] mt-12 flex flex-col gap-4">
        <h5 className="text-h5 font-bold text-neutral-900">태그</h5>
        <SelectTagInput tagList={tagList} setTagList={setTagList} />
      </div>
      <div className="flex gap-6 h-12 w-[228px] ml-auto mt-12 ">
        <button
          type="button"
          className={` w-[102px] h-12 ${content.length === 0 ? `bg-neutral-50 text-neutral-100` : `bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-500`}  rounded-md `}
          onClick={handleCancleClick}
        >
          취소하기
        </button>
        <button
          className={`w-[102px] bg-main-100 ${content.length === 0 ? `bg-main-100 text-neutral-50 ` : `bg-main-400 text-white hover:text-white hover:bg-main-500`}  text-neutral-50 rounded-md `}
          onClick={handlePostingAnswer}
        >
          답변등록
        </button>
      </div>
    </>
  );
};

export default PostingAnswerArea;
