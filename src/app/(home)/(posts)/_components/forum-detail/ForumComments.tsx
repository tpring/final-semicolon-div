'use client';

import { useAuth } from '@/context/auth.context';
import { timeForToday } from '@/utils/timeForToday';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ForumReply from './ForumReply';
import ForumReplyInput from './ForumReplyInput';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { commentRetouch, forumCommentsType } from '@/types/posts/forumDetailTypes';
import LikeButton from '@/components/common/LikeButton';
import BookmarkButton from '@/components/common/BookmarkButton';
import KebabButton from '@/assets/images/common/KebabButton';
import { revalidate } from '@/actions/revalidate';
import ConfirmModal from '@/components/modal/ConfirmModal';

const ForumComments = ({ post_user_id }: { post_user_id: string }) => {
  const { me } = useAuth();
  const param = useParams<{ id: string }>();
  const [ref, inView] = useInView();
  const queryClient = useQueryClient();
  const [mdEditorChange, setMdEditorChange] = useState<string>('');
  const [editingState, setEditingState] = useState<{ [key: string]: boolean }>({});
  const [editingToggleState, setEditingToggleState] = useState<{ [key: string]: boolean }>({});
  const [inputReplyToggle, setInputReplyToggle] = useState<{ [key: string]: boolean }>({});
  const [replyToggle, setReplyToggle] = useState<{ [key: string]: boolean }>({});
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const COMMENT_PAGE = 5;
  //댓글 수정
  const commentRetouch = useMutation({
    mutationFn: async ({ id, user_id, mdEditorChange }: commentRetouch) => {
      const response = await fetch(`/api/posts/forum-detail/forum-comments/${param.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ id, user_id, mdEditorChange })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumComments'] });
    }
  });

  const commentRetouchHandle = async (id: string, user_id: string) => {
    commentRetouch.mutate({ id, user_id, mdEditorChange });
    setEditingState({ Boolean: false });
    if (!mdEditorChange) {
      toast.error('댓글을 입력해주세요!', {
        autoClose: 2000
      });
      return;
    }
  };

  // 댓글 삭제
  const commentDelete = useMutation({
    mutationFn: async ({ id, user_id }: { id: string; user_id: string }) => {
      const response = await fetch(`/api/posts/forum-detail/forum-comments/${param.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id, user_id })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumComments'] });
      revalidate('/', 'page');
    }
  });

  const handleDelete = async (id: string, user_id: string) => {
    commentDelete.mutate({ id, user_id });
  };

  //수정 취소버튼
  const toggleEditing = (id: string, comment: string) => {
    setEditingState({ [id]: !editingState[id] });
    setEditingToggleState({ [id]: false });
    setMdEditorChange(comment);
  };
  //댓글 Kebob
  const toggleEditingOptions = (id: string) => {
    setEditingToggleState({ [id]: !editingToggleState[id] });
  };

  const changEditor = (value?: string) => {
    setMdEditorChange(value!);
  };

  const handleInputReplyToggle = (id: string) => {
    setInputReplyToggle({ [id]: !inputReplyToggle[id] });
  };

  const replyOpenToggle = (id: string) => {
    setReplyToggle({ [id]: !replyToggle[id] });
  };

  //댓글 가져오기
  const {
    fetchNextPage,
    data: comments,
    isPending,
    isError
  } = useInfiniteQuery({
    queryKey: ['forumComments', param.id],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`/api/posts/forum-detail/forum-comments/${param.id}?page=${pageParam}`);
      const data = await response.json();
      return data as Promise<forumCommentsType>;
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

  return (
    <div>
      <div className=" mt-10 mb-6 px-6">{comments && comments.length > 0 && <p>댓글 {comments[0].count}</p>}</div>
      {comments?.map((data) => (
        <div key={data.id}>
          {data.data.map((comment) => (
            <div key={comment.id} className="w-full flex flex-col ">
              <div
                className={`flex flex-col justify-around border-b-[1px] gap-4 p-6 ${comment.user_id === me?.id ? 'bg-slate-100' : 'bg-white'}`}
              >
                <div className="flex justify-start items-center gap-4 ">
                  <Image
                    src={comment.user.profile_image}
                    alt="commentUserImage"
                    width={100}
                    height={100}
                    className="rounded-full w-10 h-10"
                  />
                  <div className=" flex flex-col w-full">
                    {post_user_id === comment.user_id ? (
                      <p className=" w-[66px] h-[30px] pt-[2px] text-white bg-main-500 text-center rounded-lg  ">
                        글쓴이
                      </p>
                    ) : null}
                    <h2>{comment.user.nickname}</h2>
                    <p>{timeForToday(comment.updated_at)}</p>
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
                            <div className="w-[105px] right-0 absolute flex flex-col justify-center items-center bg-white shadow-lg border rounded-lg">
                              <button className="h-[44px]" onClick={() => toggleEditing(comment.id, comment.comment)}>
                                댓글 수정
                              </button>
                              <button className="h-[44px]" onClick={() => setConfirmModal(true)}>
                                댓글 삭제
                              </button>
                              {confirmModal && (
                                <ConfirmModal
                                  isOpen={confirmModal}
                                  onClose={() => setConfirmModal(false)}
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
                    <div className="flex justify-end items-end">
                      <button onClick={() => toggleEditing(comment.id, comment.user_id)}>취소</button>
                      <button onClick={() => commentRetouchHandle(comment.id, comment.user_id)}>수정</button>
                    </div>
                  </div>
                ) : (
                  <p>{comment.comment}</p>
                )}
                <div className=" flex justify-between gap-4">
                  <p>{comment.created_at.slice(0, 10).replace(/-/g, '.')}</p>
                  <div className=" flex gap-4">
                    <LikeButton id={comment.id} type="forumComment" />
                    <BookmarkButton id={comment.id} type="forumComment" />
                    {replyToggle[comment.id] ? (
                      <div className="flex gap-5">
                        <button onClick={() => replyOpenToggle(comment.id)}>댓글 모두 숨기기</button>
                        <button className="text-right" onClick={() => handleInputReplyToggle(comment.id)}>
                          {inputReplyToggle[comment.id] ? '댓글 취소' : '댓글 쓰기'}
                        </button>
                      </div>
                    ) : comment.reply[0].count !== 0 ? (
                      <button onClick={() => replyOpenToggle(comment.id)}>{comment.reply[0].count}댓글 보기</button>
                    ) : (
                      <button className="text-right" onClick={() => handleInputReplyToggle(comment.id)}>
                        댓글 쓰기
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {inputReplyToggle[comment.id] ? (
                <ForumReplyInput comment_id={comment.id} toggle={handleInputReplyToggle} />
              ) : null}
              {replyToggle[comment.id] ? <ForumReply comment_id={comment.id} /> : null}
            </div>
          ))}
        </div>
      ))}

      <div ref={ref}></div>
    </div>
  );
};

export default ForumComments;
