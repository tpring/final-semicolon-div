import CustomMDEditor from '@/components/common/CustomMDEditor';
import { Dispatch, SetStateAction, useState } from 'react';
import { useAuth } from '@/context/auth.context';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQnaDetailStore } from '@/store/qnaDetailStore';
import { revalidatePostTag } from '@/actions/revalidatePostTag';
import { TAG_LIST } from '@/constants/tags';
import SelectTagInput from '@/components/common/SelectTagInput';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { POST_CANCLE_TEXT, POST_APPROVE_TEXT } from '@/constants/upsert';
import Chip from '@/components/common/Chip';

type PostingAnswerAreaProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  setToggleAnswer: Dispatch<SetStateAction<boolean>>;
  setQnaCommentsCount: Dispatch<SetStateAction<number>>;
};
const PostingAnswerArea = ({ content, setContent, setToggleAnswer, setQnaCommentsCount }: PostingAnswerAreaProps) => {
  const { me } = useAuth();
  const { postId } = useQnaDetailStore();
  const [isCancleModalOpen, setIsCancleModalOpen] = useState<boolean>(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [tagList, setTagList] = useState<Array<Ttag>>(TAG_LIST);
  const queryClient = useQueryClient();

  const handleCancleClick = () => {
    setIsCancleModalOpen(true);
  };

  const handleApproveClick = () => {
    setIsApproveModalOpen(true);
  };

  const postingAnswer = async (): Promise<void> => {
    if (!me?.id) return;
    await addMutate({ user_id: me.id, content, tags: tagList.filter((tag) => tag.selected) });
    toast.success('답변 작성 완료!', { autoClose: 1500, hideProgressBar: true });
    setQnaCommentsCount((prev) => prev + 1);
    await revalidatePostTag(`qna-detail-${postId}`);
    return;
  };

  const postingAnswerMutation = async ({
    user_id,
    content,
    tags
  }: {
    user_id: string;
    content: string;
    tags: Ttag[];
  }) => {
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
    }

    return data;
  };

  const { mutate: addMutate } = useMutation({
    mutationFn: postingAnswerMutation,
    onSuccess: () => {
      setToggleAnswer(false);
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['qnaComments', postId] });
    }
  });

  return (
    <>
      <div>
        <ConfirmModal
          isOpen={isCancleModalOpen}
          onClose={() => {
            setIsCancleModalOpen(false);
          }}
          onConfirm={() => {
            setToggleAnswer(false);
            setContent('');
          }}
          message={POST_CANCLE_TEXT}
        />
        <ConfirmModal
          isOpen={isApproveModalOpen}
          onClose={() => {
            setIsApproveModalOpen(false);
          }}
          onConfirm={postingAnswer}
          message={POST_APPROVE_TEXT}
        />
        <h2 className="h-[27px] text-h5 font-bold mb-4">본문</h2>
        <CustomMDEditor content={content} setContent={setContent} />
      </div>
      <div className="h-[182px] mt-12 flex flex-col gap-4">
        <h5 className="text-h5 font-bold text-neutral-900">태그</h5>
        <SelectTagInput tagList={tagList} setTagList={setTagList} />
      </div>
      <div className="flex gap-6 h-12 w-[240px] ml-auto mt-12 ">
        <Chip intent={'gray'} size="medium" label="취소하기" onClick={handleCancleClick} />
        {content.length === 0 ? (
          <Chip intent={'primary_disabled'} size="medium" label="답변등록" />
        ) : (
          <Chip intent={'primary'} size="medium" label="답변등록" onClick={handleApproveClick} />
        )}
      </div>
    </>
  );
};

export default PostingAnswerArea;
