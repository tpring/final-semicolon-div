'use client';

import { useAuth } from '@/context/auth.context';
import { timeForToday } from '@/utils/timeForToday';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import ForumReply from './ForumReply';
import Kebab from '@/assets/images/common/Kebab';
import ForumReplyInput from './ForumReplyInput';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { InView, useInView } from 'react-intersection-observer';

const ForumComments = () => {
  const { me } = useAuth();
  const param = useParams();
  const queryClient = useQueryClient();
  const [mdEditorChange, setMdEditorChange] = useState('');
  const [editingState, setEditingState] = useState<{ [key: string]: boolean }>({});
  const [editingToggleState, setEditingToggleState] = useState<{ [key: string]: boolean }>({});
  const [inputCommentToggle, setInputCommentToggle] = useState<{ [key: string]: boolean }>({});

  const COMMENT_PAGE = 2;
  //댓글 수정
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
    }
  });

  const handleDelete = async (id: string, user_id: string) => {
    commentDelete.mutate({ id, user_id });
  };

  //수정 작업중 취소버튼
  const toggleEditing = (id: string, comment: string) => {
    setEditingState({ [id]: !editingState[id] });
    setEditingToggleState({ [id]: false });
    setMdEditorChange(comment);
  };
  //댓글 수정&삭제 케밥
  const toggleEditingOptions = (id: string) => {
    setEditingToggleState({ [id]: !editingToggleState[id] });
  };

  const changEditor = (value: string) => {
    setMdEditorChange(value!);
  };

  const ClickInputCommentToggle = (id) => {
    setInputCommentToggle({ [id]: !inputCommentToggle[id] });
  };

  //댓글 가져오기
  const {
    fetchNextPage,
    data: comments,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError
  } = useInfiniteQuery({
    queryKey: ['forumComments', param.id],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`/api/posts/forum-detail/forum-comments/${param.id}`, {
        params: { _page: pageParam, _limit: COMMENT_PAGE }
      });
      const data = await response.json();
      return data;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPage = lastPageParam + 1;
      return nextPage <= Math.ceil(commands[0]?.count / COMMENT_PAGE) ? nextPage : undefined;
    },
    select: ({ pages }) => pages.flat()
  });

  const { ref } = useInView({
    threshold: 1,
    onChange: (InView) => {
      if (InView && hasNextPage && isFetchingNextPage) {
        fetchNextPage();
      }
    }
  });
  if (isPending) {
    return <div>로딩</div>;
  }

  return (
    <>
      {comments[0].data.map((comment, index) => (
        <div key={comment.id} className="w-full border-b-[1px] p-5 flex flex-col  gap-4">
          <div className="flex justify-start items-center gap-4 ">
            <Image
              src={comment.user.profile_image}
              alt="commentUserImage"
              width={100}
              height={100}
              className="rounded-full w-10 h-10"
            />
            <div className=" flex flex-col w-full">
              <h2>{comment.user.nickname}</h2>
              <p>{timeForToday(comment.updated_at)}</p>
            </div>
            <div className=" relative">
              <div className=" right-0">
                {me?.id === comment.user_id && (
                  <>
                    {editingState[comment.id] ? null : (
                      <div onClick={() => toggleEditingOptions(comment.id)} className=" p-2 ">
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
                className="w-full "
              />
              <div>
                <button onClick={() => toggleEditing(comment.id, comment.user)}>취소</button>
                <button onClick={() => commentRetouchHandle(comment.id, comment.user_id)}>수정</button>
              </div>
            </div>
          ) : (
            <div>
              <p>{comment.comment}</p>
            </div>
          )}
          {inputCommentToggle[comment.id] ? (
            <ForumReplyInput comment_id={comment.id} toggle={ClickInputCommentToggle} />
          ) : (
            <button className="text-right" onClick={() => ClickInputCommentToggle(comment.id)}>
              대댓글 쓰기
            </button>
          )}

          <ForumReply comment_id={comment.id} />
        </div>
      ))}
    </>
  );
};

export default ForumComments;
