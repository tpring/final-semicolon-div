'use client';

import Kebab from '@/assets/images/common/Kebab';
import { useAuth } from '@/context/auth.context';
import { forumReplyType } from '@/types/posts/forumDetailTypes';
import { timeForToday } from '@/utils/timeForToday';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ForumReply = ({ comment_id }: { comment_id: string }) => {
  const { me } = useAuth();
  const params_id = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [replyRetouch, setReplyRetouch] = useState<string>('');
  const [replyEditor, setReplyEditor] = useState<{ [key: string]: boolean }>({});
  const [replyEditorToggle, setReplyEditorToggle] = useState<{ [key: string]: boolean }>({});

  const COMMENT_REPLY_PAGE = 5;
  //대댓글 수정
  const replyRetouchMutation = useMutation({
    mutationFn: async ({
      id,
      user_id,
      replyRetouch
    }: {
      id: string;
      user_id: string;
      replyRetouch: string | undefined;
    }) => {
      const response = await fetch(`/api/posts/forum-detail/forum-reply/${params_id.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ id, user_id, replyRetouch })
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReply'] });
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
      const response = await fetch(`/api/posts/forum-detail/forum-reply/${params_id.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id, user_id })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReply'] });
    }
  });

  const handleReplyDelete = async (id: string, user_id: string) => {
    commentDelete.mutate({ id, user_id });
  };

  //대댓글 가져오기
  const {
    data: reply,
    isPending,
    error
  } = useQuery<forumReplyType>({
    queryKey: ['commentReply'],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/posts/forum-detail/forum-reply/${params_id.id}`, {});
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  });

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
    <>
      {reply.getReply?.map(
        (reply) =>
          reply.comment_id === comment_id && (
            <div key={reply.id} className="w-full border-b-[1px] p-5 flex flex-col  gap-4">
              <div className="flex justify-start items-center gap-4 ">
                <Image
                  src={reply.user.profile_image}
                  alt="replyUserImage"
                  width={100}
                  height={100}
                  className="rounded-full w-10 h-10"
                />
                <div className=" flex flex-col w-full">
                  <h2>{reply.user.nickname}</h2>
                  <p>{timeForToday(reply.updated_at)}</p>
                </div>
                <div className=" relative">
                  <div className=" right-0">
                    {me?.id === reply.user_id && (
                      <>
                        {replyEditor[reply.id] ? null : (
                          <div onClick={() => toggleEditingOptions(reply.id)} className=" p-2 ">
                            <Kebab />
                          </div>
                        )}
                        {replyEditorToggle[reply.id] && (
                          <div className="w-[105px] right-0 absolute flex flex-col justify-center items-center bg-white shadow-lg border rounded-lg">
                            <button className="h-[44px]" onClick={() => toggleReplyEditing(reply.id, reply.reply)}>
                              댓글 수정
                            </button>
                            <button className="h-[44px]" onClick={() => handleReplyDelete(reply.id, reply.user_id)}>
                              댓글 삭제
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {replyEditor[reply.id] ? (
                <div>
                  <MDEditor
                    value={replyRetouch}
                    onChange={changReplyRetouch}
                    preview="edit"
                    extraCommands={commands.getCommands().filter(() => false)}
                    commands={commands.getCommands().filter((command) => {
                      return command.name !== 'image';
                    })}
                    textareaProps={{ maxLength: 1000 }}
                    className="w-full "
                  />
                  <div>
                    <button onClick={() => setReplyEditor({ [reply.id]: false })}>취소</button>
                    <button onClick={() => replyRetouchHandle(reply.id, reply.user_id)}>수정</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>{reply.reply}</p>
                </div>
              )}
            </div>
          )
      )}
    </>
  );
};

export default ForumReply;
