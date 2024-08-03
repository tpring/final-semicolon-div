'use client';

import { useAuth } from '@/context/auth.context';
import { timeForToday } from '@/utils/timeForToday';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import ArchiveReplyInput from './ArchiveReplyInput';
import ArchiveReply from './ArchiveReply';
import { useInView } from 'react-intersection-observer';
import LikeButton from '@/components/common/LikeButton';
import BookmarkButton from '@/components/common/BookmarkButton';
import Share from '@/assets/images/common/Share';
import { handleLinkCopy } from '@/components/handleLinkCopy';
import Kebab from '@/assets/images/common/Kebab';

type Comment = {
  id: string;
  comment: string;
  user: {
    profile_image: string;
    nickname: string;
  };
  user_id: string;
  updated_at: string;
  created_at: string;
};

type Data = {
  data: Comment[];
  id: number;
  count: number;
};

const ArchiveComments = () => {
  const { me } = useAuth();
  const param = useParams();
  const [ref, inView] = useInView();
  const queryClient = useQueryClient();
  const [mdEditorChange, setMdEditorChange] = useState<string>('');
  const [editingState, setEditingState] = useState<{ [key: string]: boolean }>({});
  const [editingToggleState, setEditingToggleState] = useState<{ [key: string]: boolean }>({});
  const [inputCommentToggle, setInputCommentToggle] = useState<{ [key: string]: boolean }>({});

  const COMMENT_PAGE = 5;

  // 댓글 수정
  const commentRetouch = useMutation({
    mutationFn: async ({
      id,
      user_id,
      mdEditorChange
    }: {
      id: string;
      user_id: string;
      mdEditorChange: string | undefined;
    }) => {
      await fetch(`/api/posts/archive-detail/archive-comments/${param.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ id, user_id, mdEditorChange })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveComments'] });
    }
  });

  const commentRetouchHandle = async (id: string, user_id: string) => {
    commentRetouch.mutate({ id, user_id, mdEditorChange });
    setEditingState({ [id]: false });
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
      await fetch(`/api/posts/archive-detail/archive-comments/${param.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id, user_id })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archiveComments'] });
    }
  });

  const handleDelete = async (id: string, user_id: string) => {
    commentDelete.mutate({ id, user_id });
  };

  // 수정 작업 중 취소 버튼
  const toggleEditing = (id: string, commentText: string) => {
    setEditingState({ [id]: !editingState[id] });
    setEditingToggleState({ [id]: false });
    setMdEditorChange(commentText);
  };

  // 댓글 수정 & 삭제 케밥
  const toggleEditingOptions = (id: string) => {
    setEditingToggleState({ [id]: !editingToggleState[id] });
  };

  const changEditor = (value: string | undefined) => {
    setMdEditorChange(value ?? '');
  };

  const ClickInputCommentToggle = (id: string) => {
    setInputCommentToggle({ [id]: !inputCommentToggle[id] });
  };

  // 댓글 가져오기
  const {
    fetchNextPage,
    data: comments,
    isPending,
    isError
  } = useInfiniteQuery({
    queryKey: ['archiveComments', param.id],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`/api/posts/archive-detail/archive-comments/${param.id}?page=${pageParam}`);
      const data = await response.json();
      console.log(data);

      return data;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      return nextPage <= Math.ceil(allPages[0]?.count / COMMENT_PAGE) ? nextPage : undefined;
    },
    select: ({ pages }) => pages.flat()
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isPending) {
    return <div>로딩</div>;
  }

  return (
    <>
      {comments?.map((data: Data) => (
        <div key={data.id}>
          {data.data.map((comment: Comment) => (
            <div key={comment.id} className="w-full border-b-[1px] p-5 flex flex-col gap-4">
              <div className="flex justify-start items-center gap-4 ">
                <Image
                  src={comment.user.profile_image}
                  alt="commentUserImage"
                  width={100}
                  height={100}
                  className="rounded-full w-10 h-10"
                />
                <div className="flex flex-col w-full">
                  <h2>{comment.user.nickname}</h2>
                  <p>{timeForToday(comment.updated_at)}</p>
                </div>
                <div className="relative">
                  <div className="right-0">
                    {me?.id === comment.user_id && (
                      <>
                        {editingState[comment.id] ? null : (
                          <div onClick={() => toggleEditingOptions(comment.id)} className="p-2">
                            <Kebab />
                          </div>
                        )}
                        {editingToggleState[comment.id] && (
                          <div className="w-[105px] right-0 absolute flex flex-col justify-center items-center bg-white shadow-lg border rounded-lg">
                            <button className="h-[44px]" onClick={() => toggleEditing(comment.id, comment.comment)}>
                              댓글 수정
                            </button>
                            <button className="h-[44px]" onClick={() => handleDelete(comment.id, comment.user_id)}>
                              댓글 삭제
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {editingState[comment.id] ? (
                <div>
                  <MDEditor
                    value={mdEditorChange}
                    onChange={changEditor}
                    preview="edit"
                    extraCommands={commands.getCommands().filter(() => false)}
                    commands={commands.getCommands().filter((command) => {
                      return command.name !== 'image';
                    })}
                    textareaProps={{ maxLength: 1000 }}
                    className="w-full"
                  />
                  <div>
                    <button onClick={() => toggleEditing(comment.id, comment.comment)}>취소</button>{' '}
                    <button onClick={() => commentRetouchHandle(comment.id, comment.user_id)}>수정</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>{comment.comment}</p>
                </div>
              )}
              <div className="flex items-center justify-between max-w-[1200px] mx-auto">
                <div className="flex items-center mt-1 text-sm text-neutral-300">
                  {comment.created_at.slice(0, 16).replace(/-/g, '.').replace(/T/g, ' ')}
                </div>
                <div className=" mt-2 flex items-center ml-auto">
                  <div className="flex items-center justify-center mr-2">
                    <LikeButton id={comment.id} type="archiveComment" />
                  </div>
                  <div className=" mt-2 flex items-center justify-center">
                    <BookmarkButton id={comment.id} type="archiveComment" />
                  </div>
                  <div className="flex items-center justify-center">
                    <button onClick={() => handleLinkCopy(`${process.env.NEXT_PUBLIC_BASE_URL}/forum/${comment.id}`)}>
                      <Share />
                    </button>
                  </div>
                  <div className="flex items-center justify-center ml-2">
                    {' '}
                    {inputCommentToggle[comment.id] ? (
                      <ArchiveReplyInput comment_id={comment.id} toggle={ClickInputCommentToggle} />
                    ) : (
                      <button className="text-right" onClick={() => ClickInputCommentToggle(comment.id)}>
                        대댓글 쓰기
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <ArchiveReply comment_id={comment.id} />
            </div>
          ))}
        </div>
      ))}
      <div ref={ref}></div>
    </>
  );
};

export default ArchiveComments;
