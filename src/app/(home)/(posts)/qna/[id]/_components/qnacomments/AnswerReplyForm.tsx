import { useAuth } from '@/context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

type AnswerRepliesFormProps = {
  commentId: string;
};

const AnswerReplyForm = ({ commentId }: AnswerRepliesFormProps) => {
  const { me, userData } = useAuth();
  const [content, setContent] = useState<string>('');
  const handleChangeContent = (value?: string) => {
    setContent(value!);
  };
  const queryClient = useQueryClient();

  const postingAnswerReply = async ({ user_id, reply }: { user_id: string; reply: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/qna-reply/${commentId}`, {
      method: 'POST',
      body: JSON.stringify({ user_id, reply })
    });
    const { data, message } = await response.json();
    if (message) {
      return toast.error(message);
    }
    return data;
  };

  const handlePostingReply = async () => {
    if (!me?.id) return;
    const data = await addAnswerReply({ user_id: me?.id, reply: content });
    toast.success('댓글 작성 완료', { autoClose: 1500, hideProgressBar: true });
    setContent('');
    return;
  };

  const { mutate: addAnswerReply } = useMutation({
    mutationFn: postingAnswerReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qnaReply', commentId] });
    }
  });

  return (
    <div className="py-6 px-9 w-[1152px] h-[296px] flex flex-col border-y">
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
          style={{ width: '1052px' }}
          preview="edit"
          extraCommands={commands.getCommands().filter(() => false)}
          textareaProps={{ maxLength: 1000 }}
        />
      </div>
      <div className="ml-auto flex gap-4">
        <button type="button" className="w-[71px] h-[48px] bg-neutral-50 rounded-md text-neutral-100">
          취소
        </button>
        <button className="w-[71px] h-[48px] bg-main-100 rounded-md text-main-50" onClick={handlePostingReply}>
          등록
        </button>
      </div>
    </div>
  );
};

export default AnswerReplyForm;
