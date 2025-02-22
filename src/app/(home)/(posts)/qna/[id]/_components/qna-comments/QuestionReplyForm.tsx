import { revalidate } from '@/actions/revalidate';
import Chip from '@/components/common/Chip';
import { useAuth } from '@/context/auth.context';
import { useQnaDetailStore } from '@/store/qnaDetailStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

type QuestionReplyFormProps = {
  setReplyCount: Dispatch<SetStateAction<number>>;
};

const QuestionReplyForm = ({ setReplyCount }: QuestionReplyFormProps) => {
  const { postId } = useQnaDetailStore();
  const { me, userData } = useAuth();
  const [content, setContent] = useState<string>('');
  const handleChangeContent = (value?: string) => {
    setContent(value!);
  };

  const queryClient = useQueryClient();

  const postingQuestionReply = async ({
    user_id,
    post_reply_content
  }: {
    user_id: string;
    post_reply_content: string;
  }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/qna-post-reply/${postId}`, {
      method: 'POST',
      body: JSON.stringify({ user_id, post_reply_content })
    });
    const { data, message } = await response.json();
    if (message) {
      return toast.error(message);
    }
    return data;
  };

  const handlePostingReply = async () => {
    if (!me?.id) return;
    else if (content.length === 0) {
      return toast.error('내용을 입력해주세요!');
    }
    const data = await addQuestionReply({ user_id: me?.id, post_reply_content: content });
    toast.success('댓글 작성 완료', { autoClose: 1500, hideProgressBar: true });
    setContent('');
    setReplyCount((prev) => prev + 1);
    await revalidate('/', 'layout');
    return;
  };

  const { mutate: addQuestionReply } = useMutation({
    mutationFn: postingQuestionReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qnaReply', postId] });
    }
  });

  return (
    <div className="py-6 w-[1156px] h-[296px] flex flex-col border-y">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-12 h-12">
          <Image
            src={userData?.profile_image ?? ''}
            alt="Profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <MDEditor
          value={content}
          onChange={handleChangeContent}
          height={176}
          style={{ width: '1092px' }}
          preview="edit"
          extraCommands={commands.getCommands().filter(() => false)}
          textareaProps={{ maxLength: 1000 }}
        />
      </div>
      <div className="ml-auto flex gap-4 ">
        {content.length === 0 ? (
          <>
            <Chip type="button" intent={'gray_disabled'} size={'medium'} label="취소" />
            <Chip type="button" intent={'primary_disabled'} size={'medium'} label="등록" />
          </>
        ) : (
          <>
            <Chip type="button" intent={'gray'} size={'medium'} label="취소" />
            <Chip type="button" intent={'primary'} size={'medium'} label="등록" onClick={handlePostingReply} />
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionReplyForm;
