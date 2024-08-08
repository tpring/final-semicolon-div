'use client';

import KebabButton from '@/assets/images/common/KebabButton';
import { useAuth } from '@/context/auth.context';
import { forumReplyType, replyRetouch } from '@/types/posts/forumDetailTypes';
import { timeForToday } from '@/utils/timeForToday';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ReplyPageButton from './ReplyPageButton';
import { revalidate } from '@/actions/revalidate';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { cutText, filterSlang } from '@/utils/markdownCut';

const ForumReply = ({ comment_id, post_user_id }: { comment_id: string; post_user_id: string }) => {
  const { me } = useAuth();
  const params = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(0);
  const queryClient = useQueryClient();
  const [replyRetouch, setReplyRetouch] = useState<string>('');
  const [replyEditor, setReplyEditor] = useState<{ [key: string]: boolean }>({});
  const [replyEditorToggle, setReplyEditorToggle] = useState<{ [key: string]: boolean }>({});
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [replyRetouchModal, setReplyRetouchModal] = useState<boolean>(false);
  const [replyLength, setReplyLength] = useState<boolean>(false);

  //한 페이지 안에 reply 수
  const COMMENT_REPLY_PAGE = 5;

  //대댓글 수정
  const replyRetouchMutation = useMutation({
    mutationFn: async ({ id, user_id, replyRetouch }: replyRetouch) => {
      const response = await fetch(`/api/posts/forum-detail/forum-reply/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ id, user_id, replyRetouch })
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReply', comment_id] });
    }
  });

  const replyRetouchHandle = async (id: string, user_id: string) => {
    replyRetouchMutation.mutate({ id, user_id, replyRetouch });

    setReplyEditor({ [id]: false });
    if (!replyRetouch) {
      toast.error('댓글을 입력해주세요!', {
        autoClose: 2000
      });
      return;
    }
  };

  //대댓글 삭제
  const commentDelete = useMutation({
    mutationFn: async ({ id, user_id }: { id: string; user_id: string }) => {
      const response = await fetch(`/api/posts/forum-detail/forum-reply/${params.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id, user_id })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReply'] });
      queryClient.invalidateQueries({ queryKey: ['forumComments'] });
    }
  });

  const handleReplyDelete = async (id: string, user_id: string) => {
    commentDelete.mutate({ id, user_id });
  };

  //대댓글 가져오기
  const {
    fetchNextPage,
    data: reply,
    isPending,
    error
  } = useInfiniteQuery({
    queryKey: ['commentReply', comment_id],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`/api/posts/forum-detail/forum-reply/${comment_id}?page=${pageParam}`);
      const data = await response.json();
      return data as Promise<forumReplyType>;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      return nextPage <= Math.ceil(allPages[0].count / COMMENT_REPLY_PAGE) ? nextPage : undefined;
    }
  });

  //reply 페이지 수
  const replyCount = reply?.pages[0].count;
  const totalPage = (replyCount as number) / COMMENT_REPLY_PAGE;

  if (isPending) {
    return <div>loading...</div>;
  }

  //MDeditor
  const changReplyRetouch = (value?: string) => {
    setReplyRetouch(value!);
  };

  //댓글 수정 버튼
  const toggleReplyEditing = (id: string, reply: string) => {
    setReplyEditor({ [id]: true });
    setReplyEditorToggle({ [id]: !replyEditorToggle[id] });
    setReplyRetouch(reply);
  };
  //댓글 수정&삭제 케밥
  const toggleEditingOptions = (id: string) => {
    setReplyEditorToggle({ [id]: !replyEditorToggle[id] });
  };

  return (
    <div>
      {reply?.pages[page].reply.map((reply) => (
        <div key={reply.id} className="w-full">
          {reply.comment_id === comment_id && (
            <div
              key={reply.id}
              className={`flex flex-col justify-between  border-l-4 border-[#C7DCF5] border-b-[1px] gap-4 p-6 ${reply.user_id === me?.id ? 'bg-[#F2F7FD]' : 'bg-white'}`}
            >
              <div className="flex justify-between ">
                <div className=" flex justify-start items-center gap-4">
                  <Image
                    src={reply.user.profile_image}
                    alt="replyUserImage"
                    width={48}
                    height={48}
                    className="rounded-full "
                  />
                  <div className=" flex flex-col">
                    {post_user_id === reply.user_id && (
                      <p className=" text-subtitle2 font-medium  px-[12px] py-[4px] text-white bg-main-500 text-center rounded-[4px]  ">
                        글쓴이
                      </p>
                    )}
                    <p className="text-subtitle1 font-medium">{reply.user.nickname}</p>
                    <p className="text-body2 font-regular">{timeForToday(reply.updated_at)}</p>
                  </div>
                </div>
                <div className=" relative  ">
                  {me?.id === reply.user_id && (
                    <>
                      {replyEditor[reply.id] ? null : (
                        <div onClick={() => toggleEditingOptions(reply.id)} className="  p-4 ">
                          <KebabButton />
                        </div>
                      )}
                      {replyEditorToggle[reply.id] && (
                        <div className="w-[105px] right-0 absolute flex flex-col justify-center items-center border-main-400 bg-white shadow-lg border rounded-lg">
                          <button
                            className="h-[44px] w-full rounded-t-lg hover:bg-main-50 hover:text-main-400"
                            onClick={() => toggleReplyEditing(reply.id, reply.reply)}
                          >
                            댓글 수정
                          </button>
                          <button
                            className="h-[44px] w-full rounded-b-lg hover:bg-main-50 hover:text-main-400"
                            onClick={() => setConfirmModal(true)}
                          >
                            댓글 삭제
                          </button>
                          {confirmModal && (
                            <ConfirmModal
                              isOpen={confirmModal}
                              onClose={() => setConfirmModal(false)}
                              onConfirm={() => handleReplyDelete(reply.id, reply.user_id)}
                              message={'댓글을 삭제 하겠습니까?'}
                            />
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              {replyEditor[reply.id] ? (
                <div data-color-mode="light">
                  <MDEditor
                    value={replyRetouch}
                    onChange={changReplyRetouch}
                    preview="edit"
                    extraCommands={commands.getCommands().filter(() => false)}
                    commands={commands.getCommands().filter((command) => {
                      return command.name !== 'image';
                    })}
                    textareaProps={{ maxLength: 1000 }}
                    height={'auto'}
                  />

                  <div className="flex justify-end items-end mt-4 gap-6">
                    <button
                      onClick={() => setReplyEditor({ [reply.id]: false })}
                      className={`${reply ? 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-500' : 'bg-neutral-50 text-neutral-100'}  px-5 py-3 rounded-lg text-subtitle1 font-bold`}
                    >
                      취소
                    </button>
                    <button
                      onClick={() => setReplyRetouchModal(true)}
                      className={`${reply ? 'bg-main-400 text-white hover:bg-main-500 hover:text-white' : 'bg-main-100 text-main-50'}  px-5 py-3 rounded-lg text-subtitle1 font-bold`}
                    >
                      수정
                    </button>
                    {replyRetouchModal && (
                      <ConfirmModal
                        isOpen={replyRetouchModal}
                        onClose={() => setReplyRetouchModal(false)}
                        onConfirm={() => replyRetouchHandle(reply.id, reply.user_id)}
                        message={'댓글을 수정 하시겠습니까?'}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col  gap-4">
                  {replyLength ? (
                    <p className="text-body1 font-regular text-wrap break-all  ">{filterSlang(reply.reply)}</p>
                  ) : (
                    <div className="flex flex-col justify-start items-start">
                      <p className="text-body1 font-regular text-wrap break-all  ">
                        {cutText(filterSlang(reply.reply), 140)}
                      </p>
                      {reply.reply.length > 145 ? (
                        <button
                          className="text-subtitle2 font-bold text-neutral-700"
                          onClick={() => setReplyLength(true)}
                        >
                          ...더보기
                        </button>
                      ) : null}
                    </div>
                  )}

                  <p className="text-body1 font-regular text-neutral-400">
                    {reply.created_at.slice(0, 10).replace(/-/g, '.')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <ReplyPageButton
        page={page}
        setPage={setPage}
        totalPage={totalPage}
        fetchNextPage={fetchNextPage}
        reply={reply}
      />
    </div>
  );
};

export default ForumReply;
