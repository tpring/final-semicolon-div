import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TqnaCommentsWithReplyCount } from '@/types/posts/qnaDetailTypes';
import Share from '@/assets/images/common/Share';
import AnswerReplies from '../qna-comments/AnswerReplies';
import LikeButton from '@/components/common/LikeButton';
import { useAuth } from '@/context/auth.context';
import AnswerKebobBtn from '../kebob-btn/AnswerKebobBtn';
import { timeForToday } from '@/utils/timeForToday';
import BookmarkButton from '@/components/common/BookmarkButton';
import CustomMDEditor from '@/app/(home)/(upsert)/_components/CustomMDEditor';
import { useQnaDetailStore } from '@/store/qnaDetailStore';
import BlueCheck from '@/assets/images/common/BlueCheck';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { revalidatePostTag } from '@/actions/revalidatePostTag';
import TagBlock from '@/components/common/TagBlock';
import SelectTagInput from '@/components/common/SelectTagInput';
import { TAG_LIST } from '@/constants/tags';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { EDIT_APPROVE_TEXT, EDIT_CANCLE_TEXT, SELECT_COMMENT_TEXT } from '@/constants/upsert';
import SelectAnswer from '@/assets/images/qna/SelectAnswer';
import Chip from '@/components/common/Chip';
import Tag from '@/components/common/Tag';
import { filterSlang } from '@/utils/markdownCut';

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
  const [tagList, setTagList] = useState<Array<Ttag>>(TAG_LIST);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isCancleModalOpen, setIsCancleModalOpen] = useState<boolean>(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleReplyClick = () => {
    setOpenAnswerReply((prev) => !prev);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCancleClick = () => {
    setIsCancleModalOpen(true);
  };

  const handelSelectClick = () => {
    setIsSelectModalOpen(true);
  };

  const selectComment = async (): Promise<void> => {
    const data = await selectMutate();
    toast.success('채택이 완료되었습니다!', { autoClose: 1500, hideProgressBar: true });
    await revalidatePostTag(`qna-detail-${postId}`);
    setSeletedComment(qnaComment.id);
  };

  const selectCommentMutation = async () => {
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
    mutationFn: selectCommentMutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['qnaComments', postId] });
    }
  });

  const editComment = async (): Promise<void> => {
    if (content.length === 0) {
      toast.error('내용을 입력해주세요!');
      return;
    }
    const data = await editMutate({
      commentId: qnaComment.id,
      comment: content,
      tags: tagList.filter((tag) => tag.selected),
      user_id: me?.id ?? ''
    });
    toast.success('수정 완료!', { autoClose: 1500, hideProgressBar: true });
    setIsEdit(false);
    await revalidatePostTag(`qna-detail-${postId}`);
  };

  const editCommentMutation = async ({
    commentId,
    comment,
    tags,
    user_id
  }: {
    commentId: string;
    comment: string;
    tags: Ttag[];
    user_id: string;
  }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/comment/${commentId}`, {
      method: 'PATCH',
      body: JSON.stringify({ comment, tags, user_id })
    });
    const { data, message } = await response.json();
    if (message) {
      return toast.error(message);
    }

    return data;
  };

  const { mutate: editMutate } = useMutation({
    mutationFn: editCommentMutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['qnaComments', postId] });
    }
  });

  useEffect(() => {
    const commentTagList = qnaComment.qna_comment_tag.map((tag) => tag.tag);

    setTagList(
      TAG_LIST.map((TAG) => {
        return commentTagList.includes(TAG.name) ? { ...TAG, selected: !TAG.selected } : TAG;
      })
    );
  }, [qnaComment.qna_comment_tag]);

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

          <div className="flex flex-col">
            <div className="flex">
              {seletedComment === qnaComment.id ? (
                <div className="flex gap-2 items-center">
                  <BlueCheck />
                  <Tag intent="primary" label="채택된 답변" />
                  {qnaComment.user_id === me?.id ? <Tag intent="primary" label="내가 쓴 글" /> : null}
                </div>
              ) : null}
            </div>
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
            <ConfirmModal
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
              }}
              onConfirm={editComment}
              message={EDIT_APPROVE_TEXT}
            />

            <ConfirmModal
              isOpen={isCancleModalOpen}
              onClose={() => {
                setIsCancleModalOpen(false);
              }}
              onConfirm={() => {
                setIsEdit(false);
              }}
              message={EDIT_CANCLE_TEXT}
            />

            <CustomMDEditor content={content} setContent={setContent} />
            <div className="h-[182px] mt-12 flex flex-col gap-4">
              <h5 className="text-h5 font-bold text-neutral-900">태그</h5>
              <SelectTagInput tagList={tagList} setTagList={setTagList} />
            </div>
            <div className="flex gap-4 ml-auto">
              <Chip intent={'gray'} size={'medium'} label="취소하기" onClick={handleCancleClick} />
              <Chip intent={'secondary'} size={'medium'} label="수정하기" onClick={handleEditClick} />
            </div>
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
            source={filterSlang(qnaComment.comment)}
          />
        )}
        <div className={`flex gap-[6px] my-6 ${isEdit ? 'hidden' : ''}`}>
          {qnaComment.qna_comment_tag.map((tag) => (
            <TagBlock key={'answer' + tag} tag={tag.tag} />
          ))}
        </div>
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
        <ConfirmModal
          isOpen={isSelectModalOpen}
          onClose={() => {
            setIsSelectModalOpen(false);
          }}
          onConfirm={selectComment}
          message={SELECT_COMMENT_TEXT}
        />
        {me?.id === questioner && seletedComment !== qnaComment.id ? (
          <button
            className="w-[134px] h-[48px] bg-main-50 rounded-md text-main-400 text-subtitle1 font-bold"
            onClick={handelSelectClick}
          >
            <SelectAnswer />
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
