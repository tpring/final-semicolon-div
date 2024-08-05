import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { TqnaData } from '@/types/posts/qnaDetailTypes';
import Image from 'next/image';
import Share from '@/assets/images/common/Share';
import LikeButton from '@/components/common/LikeButton';
import QuestionReplies from '../qnacomments/QuestionReplies';
import { useAuth } from '@/context/auth.context';
import QuestionKebobBtn from '../kebobbtn/QuestionKebobBtn';
import { timeForToday } from '@/utils/timeForToday';
import BookmarkButton from '@/components/common/BookmarkButton';

type QnaQuestionProps = {
  questionData: TqnaData;
};

const QnaQuestion = ({ questionData }: QnaQuestionProps) => {
  const { me } = useAuth();
  const [openQuestionReply, setOpenQuestionReply] = useState<boolean>(false);
  const [replyCount, setReplyCount] = useState<number>(questionData?.qna_post_reply[0].count);

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
          {me?.id === questionData.user_id ? <QuestionKebobBtn /> : null}
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
      <div className=" max-w-[1204px] flex  my-6">
        <MDEditor.Markdown style={{ maxWidth: '1156px' }} source={questionData.content} />
      </div>
      <div className="flex justify-between h-[59px] items-center">
        <span className="text-body1 text-neutral-400">{questionData.updated_at?.slice(0, 10)}</span>
        <div className="flex gap-6 items-center">
          <button className="flex gap-1">
            <LikeButton id={questionData.id} type={'qna'} />
          </button>
          <button className="flex gap-1">
            <BookmarkButton id={questionData.id} type={'qnaComment'} />
          </button>
          <button>
            <Share />
          </button>

          <button className="flex gap-1" onClick={handleReplyClick}>
            {replyCount !== 0 && openQuestionReply ? (
              <div className="text-main-400 text-subtitle1 font-medium">댓글 모두 숨기기</div>
            ) : replyCount !== 0 ? (
              <div className="text-main-400 text-subtitle1 font-medium">{replyCount}개의 댓글</div>
            ) : openQuestionReply ? (
              <div className="text-main-400 text-subtitle1 font-medium">댓글 쓰기</div>
            ) : (
              <div className="text-neutral-400 text-subtitle1 font-medium">댓글 쓰기</div>
            )}
          </button>
        </div>
      </div>
      {openQuestionReply ? <QuestionReplies postReplyCount={replyCount} setReplyCount={setReplyCount} /> : null}
    </div>
  );
};

export default QnaQuestion;
