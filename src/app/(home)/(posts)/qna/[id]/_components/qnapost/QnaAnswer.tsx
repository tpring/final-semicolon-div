import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { TqnaCommentsWithReplyCount } from '@/types/posts/qnaDetailTypes';
import Share from '@/assets/images/common/Share';
import AnswerReplies from '../qnacomments/AnswerReplies';
import LikeButton from '@/components/common/LikeButton';
import { useAuth } from '@/context/auth.context';
import AnswerKebobBtn from '../kebobbtn/AnswerKebobBtn';
import { timeForToday } from '@/utils/timeForToday';
import BookmarkButton from '@/components/common/BookmarkButton';
import CustomMDEditor from '@/app/(home)/(upsert)/_components/CustomMDEditor';
import { useQnaDetailStore } from '@/store/qnaDetailStore';
import BlueCheck from '@/assets/images/common/BlueCheck';
import { revalidate } from '@/actions/revalidate';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type QnaAnswerProps = {
  qnaComment: TqnaCommentsWithReplyCount;
  questioner: string;
  index?: number;
  qnaCommentsCount?: number;
  setQnaCommentsCount: Dispatch<SetStateAction<number>>;
};

const QnaAnswer = ({ qnaComment, questioner, index, qnaCommentsCount, setQnaCommentsCount }: QnaAnswerProps) => {
  const { me } = useAuth();
  const { postId, seletedComment, setSeletedComment } = useQnaDetailStore();
  const [openAnswerReply, setOpenAnswerReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(qnaComment.comment);
  const [replyCount, setReplyCount] = useState<number>(qnaComment?.qna_reply[0].count);
  const queryClient = useQueryClient();

  const handleReplyClick = () => {
    setOpenAnswerReply((prev) => !prev);
  };

  const handleSelectComment: MouseEventHandler<HTMLButtonElement> = async () => {
    const data = await selectMutate();
    toast.success('채택이 완료되었습니다!', { autoClose: 1500, hideProgressBar: true });
    await revalidate('/', 'layout');
    setSeletedComment(qnaComment.id);
  };

  const selectComment = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/${postId}?comment_id=${qnaComment.id}`,
      {
        method: 'PATCH'
      }
    );
    const { data, message } = await response.json();
    if (message) {
      toast.error(message, { autoClose: 1500, hideProgressBar: true });
    }
    return data;
  };
  const { mutate: selectMutate } = useMutation({
    mutationFn: selectComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['qnaComments', postId] });
    }
  });

  const handleEditComment: MouseEventHandler<HTMLButtonElement> = async () => {
    if (content.length === 0) {
      return toast.error('내용을 입력해주세요!');
    }
    const data = await editMutate({ commentId: qnaComment.id, comment: content });
    toast.success('수정 완료!', { autoClose: 1500, hideProgressBar: true });
    setIsEdit(false);
    await revalidate('/', 'layout');
  };

  const editComment = async ({ commentId, comment }: { commentId: string; comment: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/comment/${commentId}`, {
      method: 'PATCH',
      body: JSON.stringify({ comment })
    });
    const { data, message } = await response.json();
    if (message) {
      return toast.error(message);
    }
    return data;
  };

  const { mutate: editMutate } = useMutation({
    mutationFn: editComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['qnaComments', postId] });
    }
  });

  return (
    <div
      className={`w-[1204px]  mb-6 px-6 py-12 border ${seletedComment === qnaComment.id ? 'border-main-400' : ''} rounded-2xl overflow-auto`}
    >
      <div className="mb-6">
        {index === 0 ? <div className="w-[1156px] pb-12 text-h4 font-bold">총 {qnaCommentsCount}개의 답변</div> : null}
        <div
          className={`flex gap-4 items-center ${seletedComment === qnaComment.id ? 'bg-main-50 ' : 'bg-neutral-50 '} py-6 px-5 rounded-2xl`}
        >
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

          <div>
            {seletedComment === qnaComment.id ? (
              <div className="flex gap-2 ">
                <BlueCheck />
                <div
                  className={` text-white bg-main-400 text-subtitle2 font-medium w-[97px] h-[30px] text-center content-center rounded`}
                >
                  채택된 답변
                </div>
              </div>
            ) : null}
            <div className="flex gap-5 h-[42px] items-center">
              <span className="text-subtitle1 text-neutral-900">{qnaComment.users.nickname}</span>
              <span className="text-body1 text-neutral-500">{timeForToday(qnaComment.updated_at ?? '')}</span>
            </div>
          </div>
          <div className="ml-auto">
            {me?.id === qnaComment.user_id ? (
              <AnswerKebobBtn
                commentId={qnaComment.id}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                setQnaCommentsCount={setQnaCommentsCount}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className=" max-w-[1204px]">
        {isEdit ? (
          <div className="flex flex-col">
            <CustomMDEditor content={content} setContent={setContent} />

            <button
              className="w-[100px] h-[48px] ml-auto mt-4 bg-main-50 rounded-md text-main-400 text-subtitle1 font-bold"
              onClick={handleEditComment}
            >
              수정하기
            </button>
          </div>
        ) : (
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
        )}
      </div>
      <div className="flex justify-between  h-[59px] items-center">
        <div className="flex gap-6 items-center ">
          <span className="text-body1 text-neutral-400">{qnaComment.created_at?.slice(0, 10)}</span>
          <button className="flex gap-1 ">
            <LikeButton id={qnaComment.id} type={'qnaComment'} />
          </button>
          <button className="flex gap-1 ">
            <BookmarkButton id={qnaComment.id} type={'qnaComment'} />
          </button>
          <button className="flex gap-1 ">
            <Share />
          </button>
          <button className="flex gap-1" onClick={handleReplyClick}>
            {replyCount !== 0 && openAnswerReply ? (
              <div className="text-main-400 text-subtitle1 font-medium">댓글 모두 숨기기</div>
            ) : replyCount !== 0 ? (
              <div className="text-main-400 text-subtitle1 font-medium">{replyCount}개의 댓글</div>
            ) : openAnswerReply ? (
              <div className="text-main-400 text-subtitle1 font-medium">댓글 쓰기</div>
            ) : (
              <div className="text-neutral-400 text-subtitle1 font-medium">댓글 쓰기</div>
            )}
          </button>
        </div>
        {me?.id === questioner && seletedComment !== qnaComment.id ? (
          <button
            className="w-[134px] h-[48px] bg-main-50 rounded-md text-main-400 text-subtitle1 font-bold"
            onClick={handleSelectComment}
          >
            채택하기
          </button>
        ) : null}
      </div>
      {openAnswerReply ? (
        <AnswerReplies commentId={qnaComment.id} replyCount={replyCount} setReplyCount={setReplyCount} />
      ) : null}
    </div>
  );
};

export default QnaAnswer;
