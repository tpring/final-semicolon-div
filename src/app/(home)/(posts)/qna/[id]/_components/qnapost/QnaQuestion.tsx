import { timeForToday } from '@/components/timeForToday';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { TqnaData } from '@/types/posts/qnaDetailTypes';
import Image from 'next/image';
import Share from '@/assets/images/common/Share';
import UnfilledBookmark from '@/assets/images/bookmark/UnfilledBookmark';
import CommentBubble from '@/assets/images/common/CommentBubble';
import CommentHide from '@/assets/images/common/CommentHide';
import LikeButton from '@/components/common/LikeButton';
import QuestionReplies from '../qnacomments/QuestionReplies';
import { useAuth } from '@/context/auth.context';
import QuestionKebobBtn from './QuestionKebobBtn';

type QnaQuestionProps = {
  questionData: TqnaData;
};

const QnaQuestion = ({ questionData }: QnaQuestionProps) => {
  const { me } = useAuth();
  const [openQuestionReply, setOpenQuestionReply] = useState<boolean>(false);
  const [openKebab, setOpenKebab] = useState<boolean>(false);

  const handleReplyClick = () => {
    setOpenQuestionReply((prev) => !prev);
  };
  return (
    <div className="w-[1204px]  mb-6 px-6 py-12 border rounded-2xl ">
      <div className="mb-6">
        <div className="w-[1156px] mb-4 flex justify-between">
          <div>
            <span className="text-h4 mr-2 font-bold text-main-400">Q.</span>
            <h2 className="text-h4 font-bold text-neutral-900 inline">{questionData.title}</h2>
          </div>
          {me?.id === questionData.user_id ? <QuestionKebobBtn postId={questionData.id} /> : null}
        </div>

        <div className="flex gap-4 items-center">
          {questionData.users.profile_image ? (
            <div className="relative w-12 h-12">
              <Image
                src={questionData.users.profile_image ?? ''}
                alt="Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          ) : null}
          <span className="text-body1 text-neutral-500">{questionData.users.nickname}</span>
          <span className="text-body1 text-neutral-500">{timeForToday(questionData.updated_at ?? '')}</span>
        </div>
      </div>
      <div className=" max-w-[1204px] flex items-center justify-center">
        <MDEditor.Markdown style={{ maxWidth: '1000px', overflow: 'auto' }} source={questionData.content} />
      </div>
      <div className="flex justify-between">
        <span>{questionData.updated_at?.slice(0, 10)}</span>
        <div className="flex gap-6 items-center">
          <button className="flex gap-1">
            <LikeButton id={questionData.id} type={'qna'} />
            {/* {questionData.qna_likes.length} */}
          </button>
          <button className="flex gap-1">
            <UnfilledBookmark />
            {/* {questionData.qna_bookmarks.length} */}
          </button>
          <button>
            <Share />
          </button>
          <div className="flex ">
            <button className="flex gap-1" onClick={handleReplyClick}>
              {openQuestionReply ? (
                <CommentHide />
              ) : (
                <>
                  <CommentBubble />
                  {questionData.qna_post_reply[0].count}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {openQuestionReply ? (
        <QuestionReplies questionId={questionData.id} postReplyCount={questionData.qna_post_reply[0].count} />
      ) : null}
    </div>
  );
};

export default QnaQuestion;
