import MDEditor, { commands } from '@uiw/react-md-editor';
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import AnswerReplytKebobBtn from '../kebob-btn/AnswerReplytKebobBtn';
import { Treply } from '@/types/posts/qnaDetailTypes';
import Image from 'next/image';
import { timeForToday } from '@/utils/timeForToday';
import { useAuth } from '@/context/auth.context';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type AnswerReplyProps = {
  reply: Treply;
  setReplyCount: Dispatch<SetStateAction<number>>;
};

const AnswerReply = ({ reply, setReplyCount }: AnswerReplyProps) => {
  const [content, setContent] = useState<string>(reply.reply);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { me } = useAuth();
  const queryClient = useQueryClient();

  const handleContentChange = (value: string | undefined): void => {
    setContent(value!);
  };

  const handleCancleClick = () => {
    setIsEdit(false);
  };

  const handleEditReply: MouseEventHandler<HTMLButtonElement> = async () => {
    const data = await editMutate({ replyId: reply.id, reply: content });
    toast.success('수정 완료!', { autoClose: 1500, hideProgressBar: true });
    setIsEdit(false);
  };

  const editReply = async ({ replyId, reply }: { replyId: string; reply: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/qna-reply/${replyId}`, {
      method: 'PATCH',
      body: JSON.stringify({ reply })
    });
    const { data, message } = await response.json();
    if (message) {
      return toast.error(message);
    }
    return data;
  };

  const { mutate: editMutate } = useMutation({
    mutationFn: editReply,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['qnaReply', reply.comment_id] });
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
            <AnswerReplytKebobBtn
              commentId={reply.comment_id}
              replyId={reply.id}
              setReplyCount={setReplyCount}
              setIsEdit={setIsEdit}
            />
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
            <button className="w-[71px] h-[48px] bg-main-100 rounded-md text-main-50" onClick={handleEditReply}>
              등록
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[86px] mb-6 mx-5  gap-[16px]">
          <MDEditor.Markdown source={reply.reply} />
          <div>{reply.created_at.slice(0, 10)}</div>
        </div>
      )}
    </div>
  );
};

export default AnswerReply;
