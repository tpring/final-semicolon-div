import { timeForToday } from '@/components/timeForToday';
import { useAuth } from '@/context/auth.context';
import { TqnaPostReplyWithUser } from '@/types/posts/qnaDetailTypes';
import MDEditor, { commands } from '@uiw/react-md-editor';
import Image from 'next/image';
import { useState } from 'react';
import ButtonBox from './ButtonBox';
import ReplyForm from './ReplyForm';

type AnswerCommentsProps = {
  questionReplies: TqnaPostReplyWithUser[];
};

const QuestionComments = ({ questionReplies }: AnswerCommentsProps) => {
  const { me } = useAuth();

  return (
    <div>
      <ReplyForm />
      {questionReplies.map((reply, index) => {
        return (
          <div key={reply.id} className={`relative left-0 border-b`}>
            <div className="flex h-[86px] mt-6 mx-5 items-center gap-[16px] ">
              <span className="py-6">
                <Image src={reply.users.profile_image} alt="profile" width={48} height={48} />
              </span>
              <div>
                <div>{reply.users.nickname}</div>
                <div>{timeForToday(reply.updated_at)}</div>
              </div>
            </div>
            <div className="flex flex-col h-[86px] mb-6 mx-5  gap-[16px]">
              <MDEditor.Markdown source={reply.post_reply_content} />
              <div>{reply.created_at.slice(0, 10)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionComments;
