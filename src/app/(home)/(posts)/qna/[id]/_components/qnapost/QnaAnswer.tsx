import { timeForToday } from '@/components/timeForToday';
import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import { useState } from 'react';
import AnswerComments from '../qnacomments/AnswerComments';
import { TallComments } from '@/types/posts/qnaDetailTypes';

type QnaAnswerProps = {
  qnaAnswer: TallComments;
};

const QnaAnswer = ({ qnaAnswer }: QnaAnswerProps) => {
  console.log(qnaAnswer);
  const [openAnswerReply, setOpenAnswerReply] = useState(false);

  return (
    <div key={qnaAnswer.id} className="w-[1204px] max-h-[1224px] mb-6 px-6 py-12 border rounded-2xl overflow-auto">
      <div className="mb-6">
        <div className="flex gap-4 items-center bg-neutral-50 py-6 px-5 rounded-2xl">
          <div>
            {qnaAnswer.users.profile_image ? (
              <Image src={qnaAnswer.users.profile_image} alt="profile" width={48} height={48} />
            ) : null}
          </div>
          <span className="text-subtitle1 text-neutral-900">{qnaAnswer.users.nickname}</span>
          <span className="text-body1 text-neutral-500">{timeForToday(qnaAnswer.updated_at ?? '')}</span>
        </div>
      </div>
      <div className=" max-h-[1220px] max-w-[1204px]">
        <MDEditor.Markdown
          className="text-body1"
          style={{
            maxWidth: '1000px',
            maxHeight: '1000px',
            overflow: 'auto',
            fontSize: '18px',
            lineHeight: '150%',
            letterSpacing: '-1'
          }}
          source={qnaAnswer.comment}
        />
      </div>
      <div className="flex justify-between m-6">
        <span>{qnaAnswer.created_at?.slice(0, 10)}</span>
        <div className="flex gap-2">
          <span>좋아요{qnaAnswer.qna_comment_likes.length}</span>
          <span>북마크{qnaAnswer.qna_comment_bookmarks.length}</span>
          <span>공유</span>
          <span
            onClick={() => {
              setOpenAnswerReply((prev) => !prev);
            }}
          >
            댓글{qnaAnswer.qna_reply.length}
          </span>
        </div>
      </div>
      {openAnswerReply ? <AnswerComments answerReplies={qnaAnswer.qna_reply} /> : null}
    </div>
  );
};

export default QnaAnswer;

// {openQuestionReply ? <QuestionComments answers={qnaAnswer.qna_post_reply} /> : null}
