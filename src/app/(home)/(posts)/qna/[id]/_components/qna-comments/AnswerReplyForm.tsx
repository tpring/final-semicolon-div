import { revalidate } from '@/actions/revalidate';
import Chip from '@/components/common/Chip';
import { useAuth } from '@/context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

type AnswerRepliesFormProps = {
  commentId: string;
  setReplyCount: Dispatch<SetStateAction<number>>;
};

const AnswerReplyForm = ({ commentId, setReplyCount }: AnswerRepliesFormProps) => {
  const { me, userData } = useAuth();
  const [content, setContent] = useState<string>('');
  const handleChangeContent = (value?: string) => {
    setContent(value!);
  };
  const queryClient = useQueryClient();

  const handlePostingReply = async () => {
    if (!me?.id) return;
    else if (content.length === 0) {
      return toast.error('내용을 입력해주세요!');
    }
    const data = await addAnswerReply({ user_id: me?.id, reply: content });
    toast.success('댓글 작성 완료', { autoClose: 1500, hideProgressBar: true });
    setContent('');
    setReplyCount((prev) => prev + 1);
    await revalidate('/', 'layout');
    return;
  };

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

  const { mutate: addAnswerReply } = useMutation({
    mutationFn: postingAnswerReply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qnaReply', commentId] });
    }
  });

  return (
    <div className="py-6  w-[1156px] h-[296px] flex flex-col border-y">
      <div className="flex items-center gap-4 mb-6 h-44">
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
          maxHeight={176}
          style={{ width: '1092px' }}
          preview="edit"
          extraCommands={commands.getCommands().filter(() => false)}
          textareaProps={{ maxLength: 1000 }}
        />
      </div>
      <div className="ml-auto flex gap-4">
        {content.length === 0 ? (
          <>
            <Chip intent={'gray_disabled'} size={'medium'} label="취소" />
            <Chip intent={'primary_disabled'} size={'medium'} label="등록" />
          </>
        ) : (
          <>
            <Chip intent={'gray'} size={'medium'} label="취소" />
            <Chip intent={'primary'} size={'medium'} label="등록" onClick={handlePostingReply} />
          </>
        )}
      </div>
    </div>
  );
};

export default AnswerReplyForm;
