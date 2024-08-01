import CustomMDEditor from '@/app/(home)/(upsert)/_components/CustomMDEditor';
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import PostingAnswerModal from './PostingAnswerModal';
import { useAuth } from '@/context/auth.context';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type PostingAnswerAreaProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  setToggleAnswer: Dispatch<SetStateAction<boolean>>;
  postId: string;
};
const PostingAnswerArea = ({ content, setContent, setToggleAnswer, postId }: PostingAnswerAreaProps) => {
  const router = useRouter();
  const { me } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleCancleClick = () => {
    setIsModalOpen(true);
  };

  const handlePostingAnswer: MouseEventHandler = async (event) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/comment/${postId}`, {
      method: 'POST',
      body: JSON.stringify({ user_id: me?.id, comment: content })
    });
    const { data, message } = await response.json();
    if (message) {
      toast.error(message, { autoClose: 1500, hideProgressBar: true });
    }
    toast.success('답변 작성 완료!', { autoClose: 1500, hideProgressBar: true });
    router.push(`/qna/${postId}`);
    return;
  };

  if (isModalOpen) {
    document.body.style.overflow = 'hidden';
  }

  return (
    <>
      <div>
        {isModalOpen ? (
          <PostingAnswerModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setContent={setContent}
            setToggleAnswer={setToggleAnswer}
          />
        ) : null}

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
        <button className="w-[102px] text-main-100 bg-main-50 rounded-md" onClick={handlePostingAnswer}>
          답변등록
        </button>
      </div>
    </>
  );
};

export default PostingAnswerArea;
