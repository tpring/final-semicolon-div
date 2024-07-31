import { timeForToday } from '@/components/timeForToday';
import { TqnaReplyWithUser } from '@/types/posts/qnaDetailTypes';
import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import ReplyForm from './ReplyForm';

type AnswerCommentsProps = {
  answerReplies: TqnaReplyWithUser[];
};

const AnswerComments = ({ answerReplies }: AnswerCommentsProps) => {
  const handleReplySubmit = () => {};
  return (
    <div>
      <ReplyForm />
      {answerReplies.map((reply, index) => {
        return (
          <div key={reply.id} className={`relative left-0 border-b`}>
            <div className="flex h-[86px] mt-6 mx-5 items-center gap-[16px] ">
              <span className="py-6">
                <Image src={reply.users.profile_image} alt="profile" width={48} height={48} />
              </span>
              <div>
                <div>{reply.users.nickname}</div>
                <div>{timeForToday(reply.updated_at!)}</div>
              </div>
            </div>
            <div className="flex flex-col h-[86px] mb-6 mx-5  gap-[16px]">
              <MDEditor.Markdown source={reply.reply} />
              <div>{reply.created_at.slice(0, 10)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnswerComments;
