import { timeForToday } from '@/components/timeForToday';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import QuestionComments from '../qnacomments/QuestionComments';
import { qnaData } from '@/types/posts/qnaDetailTypes';
import Image from 'next/image';

type QnaQuestionProps = {
  questionData: qnaData;
};

const QnaQuestion = ({ questionData }: QnaQuestionProps) => {
  const [openQuestionReply, setOpenQuestionReply] = useState<boolean>(false);
  return (
    <div className="w-[1204px]  mb-6 px-6 py-12 border rounded-2xl overflow-auto">
      <div className="mb-6">
        <div className="w-[1156px] mb-4">
          <span className="text-h4 mr-2 font-bold text-main-400">Q.</span>
          <h2 className="text-h4 font-bold text-neutral-900 inline">{questionData.title}</h2>
        </div>
        <div className="flex gap-4 items-center">
          {questionData.users.profile_image ? (
            <Image src={questionData.users.profile_image} alt="profile" width={48} height={48} />
          ) : null}
          <span className="text-body1 text-neutral-500">{questionData.users.nickname}</span>
          <span className="text-body1 text-neutral-500">{timeForToday(questionData.updated_at ?? '')}</span>
        </div>
      </div>
      <div className=" max-h-[1220px] max-w-[1204px]">
        <MDEditor.Markdown
          style={{ maxWidth: '1000px', maxHeight: '1000px', overflow: 'auto' }}
          source={questionData.content}
        />
      </div>
      <div className="flex justify-between">
        <span>{questionData.updated_at?.slice(0, 10)}</span>
        <div className="flex gap-2">
          <span>좋아요{questionData.qna_likes.length}</span>
          <span>북마크{questionData.qna_bookmarks.length}</span>
          <span>공유</span>
          <div className="flex flex-col">
            <span
              onClick={() => {
                setOpenQuestionReply((prev) => !prev);
              }}
            >
              댓글{questionData.qna_post_reply.length}
            </span>
          </div>
        </div>
      </div>
      {openQuestionReply ? <QuestionComments questionReplies={questionData.qna_post_reply} /> : null}
    </div>
  );
};

export default QnaQuestion;
