'use client';

import { useAuth } from '@/context/auth.context';
import { timeForToday } from '@/utils/timeForToday';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import LikeButton from '@/components/common/LikeButton';
import BookmarkButton from '@/components/common/BookmarkButton';
import KebabButton from '@/assets/images/common/KebabButton';
import { revalidate } from '@/actions/revalidate';
import ConfirmModal from '@/components/modal/ConfirmModal';
import ArchiveReplyInput from './ArchiveReplyInput';
import ArchiveReply from './ArchiveReply';
import { archiveCommentsType, commentRetouch } from '@/types/posts/archiveDetailTypes';

const ArchiveComments = ({ post_user_id }: { post_user_id: string }) => {
  const { me } = useAuth();
  const param = useParams<{ id: string }>();
  const [ref, inView] = useInView();
  const queryClient = useQueryClient();
  const [mdEditorChange, setMdEditorChange] = useState<string>('');
  const [editingState, setEditingState] = useState<{ [key: string]: boolean }>({});
  const [editingToggleState, setEditingToggleState] = useState<{ [key: string]: boolean }>({});
  const [inputReplyToggle, setInputReplyToggle] = useState<{ [key: string]: boolean }>({});
  const [replyToggle, setReplyToggle] = useState<{ [key: string]: boolean }>({});
  const [confirmModal, setConfirmModal] = useState<{ [key: string]: boolean }>({});

  const COMMENT_PAGE = 5;

  // 댓글 수정
  const commentRetouch = useMutation({
    mutationFn: async ({ id, user_id, mdEditorChange }: commentRetouch) => {
      const response = await fetch(`/api/posts/forum-detail/archive-comments/${param.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ id, user_id, mdEditorChange }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveComments'] });
    }
  });

  const commentRetouchHandle = async (id: string, user_id: string) => {
    if (!mdEditorChange) {
      toast.error('댓글을 입력해주세요!', {
        autoClose: 2000
      });
      return;
    }
    commentRetouch.mutate({ id, user_id, mdEditorChange });
    setEditingState({ [id]: false });
  };

  // 댓글 삭제
  const commentDelete = useMutation({
    mutationFn: async ({ id, user_id }: { id: string; user_id: string }) => {
      const response = await fetch(`/api/posts/archive-detail/archive-comments/${param.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id, user_id }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveComments'] });
      revalidate('/', 'page');
    }
  });

  const handleDelete = async (id: string, user_id: string) => {
    commentDelete.mutate({ id, user_id });
  };

  const handleCancelEdit = (id: string) => {
    setConfirmModal((prev) => ({ ...prev, [id]: true }));
  };

  const handleConfirmCancelEdit = (id: string) => {
    setEditingState({ [id]: false });
    setConfirmModal((prev) => ({ ...prev, [id]: false }));
  };

  const handleCloseModal = (id: string) => {
    setConfirmModal((prev) => ({ ...prev, [id]: false }));
  };

  const toggleEditing = (id: string, comment: string) => {
    setEditingState({ [id]: !editingState[id] });
    setEditingToggleState({ [id]: false });
    setMdEditorChange(comment);
  };

  const toggleEditingOptions = (id: string) => {
    setEditingToggleState({ [id]: !editingToggleState[id] });
  };

  const changEditor = (value?: string) => {
    setMdEditorChange(value!);
  };

  // 댓글 가져오기
  const {
    fetchNextPage,
    data: comments,
    isPending,
    isError
  } = useInfiniteQuery({
    queryKey: ['archiveComments', param.id],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`/api/posts/archive-detail/archive-comments/${param.id}?page=${pageParam}`);
      const data = await response.json();
      return data as Promise<archiveCommentsType>;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      return nextPage <= Math.ceil(allPages[0].count / COMMENT_PAGE) ? nextPage : undefined;
    },
    select: ({ pages }) => pages.flat()
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isPending) {
    return <div>로딩..</div>;
  }
  const handleInputReplyToggle = (id: string, count: number) => {
    setInputReplyToggle({ [id]: !inputReplyToggle[id] });
    if (count === 0) {
      setReplyToggle({ [id]: !replyToggle[id] });
    }
  };

  const replyOpenToggle = (id: string) => {
    setReplyToggle({ [id]: !replyToggle[id] });
    setInputReplyToggle({ [id]: false });
  };

  return (
    <div>
      <div className=" mt-10 mb-6 px-6 text-subtitle1 font-medium ">
        {comments && comments.length > 0 && <p>댓글 {comments[0].count}</p>}
      </div>
      {comments?.map((data) => (
        <div key={data.id}>
          {data.data.map((comment) => (
            <div key={comment.id} className="w-full flex flex-col ">
              <div
                className={`flex flex-col justify-around border-b-2 gap-4 p-6 ${
                  comment.user_id === me?.id ? 'bg-sub-50' : 'bg-white'
                }`}
              >
                <div className="flex justify-between ">
                  <div className="flex justify-start items-center gap-4 ">
                    <Image
                      src={comment.user.profile_image}
                      alt="commentUserImage"
                      width={48}
                      height={48}
                      className="rounded-full "
                    />
                    <div className=" flex flex-col gap-1 ">
                      {post_user_id === comment.user_id && (
                        <p className=" text-subtitle2 font-medium  px-[12px] py-[4px] text-white bg-main-500 text-center rounded-[4px]  ">
                          글쓴이
                        </p>
                      )}
                      <p className="text-subtitle1 font-medium text-neutral-900">{comment.user.nickname}</p>
                      <p className="text-body2 font-regular text-neutral-300">{timeForToday(comment.updated_at)}</p>
                    </div>
                  </div>
                  <div className=" relative">
                    <div className=" right-0">
                      {me?.id === comment.user_id && (
                        <>
                          {editingState[comment.id] ? null : (
                            <div onClick={() => toggleEditingOptions(comment.id)} className=" p-2 ">
                              <KebabButton />
                            </div>
                          )}
                          {editingToggleState[comment.id] && (
                            <div className="w-[105px] right-0 absolute flex flex-col justify-center items-center border-main-400 bg-white shadow-lg border rounded-lg">
                              <button
                                className="h-[44px]  w-full rounded-t-lg hover:bg-main-50 hover:text-main-400"
                                onClick={() => toggleEditing(comment.id, comment.comment)}
                              >
                                댓글 수정
                              </button>
                              <button
                                className="h-[44px]  w-full rounded-b-lg hover:bg-main-50 hover:text-main-400"
                                onClick={() => setConfirmModal((prev) => ({ ...prev, [comment.id]: true }))}
                              >
                                댓글 삭제
                              </button>
                              {confirmModal[comment.id] && (
                                <ConfirmModal
                                  isOpen={confirmModal[comment.id]}
                                  onClose={() => setConfirmModal((prev) => ({ ...prev, [comment.id]: false }))}
                                  onConfirm={() => handleDelete(comment.id, comment.user_id)}
                                  message={'댓글을 삭제 하겠습니까?'}
                                />
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {editingState[comment.id] ? (
                  <div className=" flex flex-col " data-color-mode="light">
                    <MDEditor
                      value={mdEditorChange}
                      onChange={changEditor}
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
                        onClick={() => handleCancelEdit(comment.id)}
                        className="bg-neutral-50 hover:bg-neutral-100 hover:text-neutral-600 text-neutral-100 px-5 py-3 rounded-lg"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => commentRetouchHandle(comment.id, comment.user_id)}
                        className="bg-main-100 hover:bg-main-500 text-main-50 px-5 py-3 rounded-lg"
                      >
                        수정
                      </button>
                      {confirmModal[comment.id] && (
                        <ConfirmModal
                          isOpen={confirmModal[comment.id]}
                          onClose={() => handleCloseModal(comment.id)}
                          onConfirm={() => handleConfirmCancelEdit(comment.id)}
                          message={'댓글 작성을 취소 하시겠습니까?'}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-body1 font-regular whitespace-pre-wrap break-words">{comment.comment}</p>
                )}
                <div className=" flex justify-between gap-4">
                  <p className="text-body1 font-regular text-neutral-400">
                    {comment.created_at.slice(0, 10).replace(/-/g, '.')}
                  </p>
                  <div className=" flex gap-4">
                    <LikeButton id={comment.id} type="forumComment" />
                    <BookmarkButton id={comment.id} type="forumComment" />
                    {replyToggle[comment.id] ? (
                      <div className="flex gap-5">
                        <button
                          onClick={() => replyOpenToggle(comment.id)}
                          className="text-subtitle1 font-medium text-main-400"
                        >
                          댓글 모두 숨기기
                        </button>
                        <button
                          className="text-subtitle1 font-medium text-neutral-400"
                          onClick={() => handleInputReplyToggle(comment.id, comment.reply[0].count)}
                        >
                          {inputReplyToggle[comment.id] ? '댓글 취소' : '댓글 쓰기'}
                        </button>
                      </div>
                    ) : comment.reply[0].count !== 0 ? (
                      <button
                        onClick={() => replyOpenToggle(comment.id)}
                        className="text-subtitle1 font-medium text-main-400"
                      >
                        {comment.reply[0].count}개의 댓글 보기
                      </button>
                    ) : (
                      <button
                        className="text-subtitle1 font-medium text-neutral-400"
                        onClick={() => handleInputReplyToggle(comment.id, comment.reply[0].count)}
                      >
                        댓글 쓰기
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {inputReplyToggle[comment.id] ? (
                <ArchiveReplyInput
                  comment_id={comment.id}
                  toggle={handleInputReplyToggle}
                  count={comment.reply[0].count}
                />
              ) : null}
              {replyToggle[comment.id] ? <ArchiveReply comment_id={comment.id} post_user_id={post_user_id} /> : null}
            </div>
          ))}
        </div>
      ))}

      <div ref={ref}></div>
    </div>
  );
};

export default ArchiveComments;
