import MDEditor, { commands } from '@uiw/react-md-editor';
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { TpostReply } from '@/types/posts/qnaDetailTypes';
import Image from 'next/image';
import { timeForToday } from '@/utils/timeForToday';
import { useAuth } from '@/context/auth.context';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import QuestionReplyKebobBtn from '../kebob-btn/QuestionReplyKebobBtn';
import { useQnaDetailStore } from '@/store/qnaDetailStore';

type QuestionReplyProps = {
  reply: TpostReply;
  setReplyCount: Dispatch<SetStateAction<number>>;
};

const QuestionReply = ({ reply, setReplyCount }: QuestionReplyProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [content, setContent] = useState<string>(reply.post_reply_content);
  const { me } = useAuth();
  const { postId } = useQnaDetailStore();
  const queryClient = useQueryClient();

  const handleContentChange = (value: string | undefined): void => {
    setContent(value!);
  };

  const handleCancleClick = () => {
    setIsEdit(false);
  };

  const handleEditQuestionReply: MouseEventHandler<HTMLButtonElement> = async () => {
    const data = await editMutate({ replyId: reply.id, post_reply_content: content });
    toast.success('수정 완료!', { autoClose: 1500, hideProgressBar: true });
    setIsEdit(false);
  };

  const editQuestionReply = async ({
    replyId,
    post_reply_content
  }: {
    replyId: string;
    post_reply_content: string;
  }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/qna-post-reply/${replyId}`, {
      method: 'PATCH',
      body: JSON.stringify({ post_reply_content })
    });
    const { data, message } = await response.json();
    if (message) {
      return toast.error(message);
    }
    return data;
  };

  const { mutate: editMutate } = useMutation({
    mutationFn: editQuestionReply,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['qnaReply', postId] });
    }
  });

  return (
    <div key={reply.id} className={`relative left-0 border-b`}>
      <div className="flex h-[86px] mt-6 mx-5 items-center gap-[16px] ">
        <div className="relative w-12 h-12">
          <Image
            src={reply.users?.profile_image ?? ''}
            alt="Profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div>
          <div>{reply.users.nickname}</div>
          <div>{timeForToday(reply.updated_at!)}</div>
        </div>
        {me?.id === reply.user_id ? (
          <div className="flex ml-auto ">
            <QuestionReplyKebobBtn replyId={reply.id} setReplyCount={setReplyCount} setIsEdit={setIsEdit} />
          </div>
        ) : (
          ''
        )}
      </div>
      {isEdit ? (
        <div className="flex flex-col h-[200px] mb-6 mx-5  gap-[16px]">
          <MDEditor
            value={content}
            onChange={handleContentChange}
            preview="edit"
            commands={commands.getCommands().filter((command) => {
              return command.name !== 'image';
            })}
            textareaProps={{ maxLength: 1000 }}
            extraCommands={commands.getCommands().filter(() => false)}
          />
          <div className="flex gap-4">
            <button
              type="button"
              className="ml-auto w-[71px] h-[48px] bg-neutral-50 rounded-md text-neutral-100"
              onClick={handleCancleClick}
            >
              취소
            </button>
            <button className="w-[71px] h-[48px] bg-main-100 rounded-md text-main-50" onClick={handleEditQuestionReply}>
              등록
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[86px] mb-6 mx-5  gap-[16px]">
          <MDEditor.Markdown source={reply.post_reply_content} />
          <div>{reply.created_at.slice(0, 10)}</div>
        </div>
      )}
    </div>
  );
};

export default QuestionReply;
