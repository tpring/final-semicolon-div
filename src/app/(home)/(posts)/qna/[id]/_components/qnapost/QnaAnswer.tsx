import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import { useState } from 'react';
import { TqnaCommentsWithReplyCount } from '@/types/posts/qnaDetailTypes';
import UnfilledBookmark from '@/assets/images/bookmark/UnfilledBookmark';
import Share from '@/assets/images/common/Share';
import CommentHide from '@/assets/images/common/CommentHide';
import CommentBubble from '@/assets/images/common/CommentBubble';
import AnswerReplies from '../qnacomments/AnswerReplies';
import LikeButton from '@/components/common/LikeButton';
import { useAuth } from '@/context/auth.context';
import Kebob from './Kebob';
import { timeForToday } from '@/utils/timeForToday';

type QnaAnswerProps = {
  qnaComment: TqnaCommentsWithReplyCount;
};

const QnaAnswer = ({ qnaComment }: QnaAnswerProps) => {
  const { me } = useAuth();
  const [openAnswerReply, setOpenAnswerReply] = useState(false);
  const handleReplyClick = () => {
    setOpenAnswerReply((prev) => !prev);
  };

  return (
    <div key={qnaComment.id} className="w-[1204px] max-h-[1224px] mb-6 px-6 py-12 border rounded-2xl overflow-auto">
      <div className="mb-6">
        <div className="flex gap-4 items-center bg-neutral-50 py-6 px-5 rounded-2xl">
          <div>
            {qnaComment.users.profile_image ? (
              <div className="relative w-12 h-12">
                <Image
                  src={qnaComment.users?.profile_image ?? ''}
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            ) : null}
          </div>
          <span className="text-subtitle1 text-neutral-900">{qnaComment.users.nickname}</span>
          <span className="text-body1 text-neutral-500">{timeForToday(qnaComment.updated_at ?? '')}</span>
          <div className="ml-auto"></div>
          {me?.id === qnaComment.user_id ? <Kebob /> : ''}
        </div>
      </div>
      <div className=" max-h-[1220px] max-w-[1204px]">
        <MDEditor.Markdown
          style={{
            maxWidth: '1000px',
            maxHeight: '1000px',
            overflow: 'auto',
            fontSize: '18px',
            lineHeight: '150%',
            letterSpacing: '-1'
          }}
          source={qnaComment.comment}
        />
      </div>
      <div className="flex justify-between  m-6">
        <span>{qnaComment.created_at?.slice(0, 10)}</span>
        <div className="flex gap-6 items-center justify-center">
          <button className="flex gap-1 items-center">
            <LikeButton id={qnaComment.id} type="qnaComment" />
            {/* {qnaAnswer.qna_comment_likes.length} */}
          </button>
          <button className="flex gap-1 items-center">
            <UnfilledBookmark />
          </button>
          <button className="flex gap-1 items-center">
            <Share />
          </button>
          <button className="flex gap-1 items-center" onClick={handleReplyClick}>
            {openAnswerReply ? (
              <CommentHide />
            ) : (
              <>
                <CommentBubble />
                {qnaComment.qna_reply[0].count}
              </>
            )}
          </button>
        </div>
      </div>
      {openAnswerReply ? <AnswerReplies commentId={qnaComment.id} replyCount={qnaComment.qna_reply[0].count} /> : null}
    </div>
  );
};

export default QnaAnswer;

// {openQuestionReply ? <QuestionComments answers={qnaAnswer.qna_post_reply} /> : null}
