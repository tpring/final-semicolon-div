'use client';

import { useAuth } from '@/context/auth.context';
import { timeForToday } from '@/utils/timeForToday';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PaginationButtons from './PaginationButton';
import KebabButton from '@/assets/images/common/KebabButton';

type Reply = {
  id: string;
  comment_id: string;
  reply: string;
  user_id: string;
  user: {
    nickname: string;
    profile_image: string;
  };
  updated_at: string;
};

function ArchiveReply({ comment_id }: { comment_id: string }) {
  const { me } = useAuth();
  const params = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [replyRetouch, setReplyRetouch] = useState('');
  const [replyEditor, setReplyEditor] = useState<{ [key: string]: boolean }>({});
  const [replyEditorToggle, setReplyEditorToggle] = useState<{ [key: string]: boolean }>({});

  const COMMENT_REPLY_PAGE = 5;

  // 대댓글 수정
  const replyRetouchMutation = useMutation({
    mutationFn: async ({
      id,
      user_id,
      replyRetouch,
      comment_id
    }: {
      id: string;
      user_id: string;
      replyRetouch: string | undefined;
      comment_id: string;
    }) => {
      const response = await fetch(`/api/posts/archive-detail/archive-reply/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, user_id, replyRetouch, comment_id })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '댓글 수정에 실패했습니다.');
      }
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReply', comment_id, page] });
      toast.success('댓글이 수정되었습니다!');
    },
    onError: (error: any) => {
      console.error('Update Mutation Error:', error.message);
      toast.error('댓글 수정에 실패했습니다.');
    }
  });

  const replyRetouchHandle = async (id: string, user_id: string) => {
    if (!replyRetouch) {
      toast.error('댓글을 입력해주세요!', {
        autoClose: 2000
      });
      return;
    }
    replyRetouchMutation.mutate({ id, user_id, replyRetouch, comment_id });
    setReplyEditor({ [id]: false });
  };

  // 대댓글 삭제
  const commentDelete = useMutation({
    mutationFn: async ({ id, user_id }: { id: string; user_id: string }) => {
      const response = await fetch(`/api/posts/archive-detail/archive-reply/${params.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, user_id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '댓글 삭제에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReply', comment_id, page] });
      toast.success('댓글이 삭제되었습니다.');
    },
    onError: (error: any) => {
      console.error('Delete Mutation Error:', error.message);
      toast.error('댓글 삭제에 실패했습니다.');
    }
  });

  const handleReplyDelete = async (id: string, user_id: string) => {
    commentDelete.mutate({ id, user_id });
  };

  // 대댓글 가져오기
  const {
    data: reply,
    isLoading: isPending,
    error
  } = useQuery({
    queryKey: ['commentReply', comment_id, page],
    queryFn: async () => {
      try {
        const response = await fetch(
          `/api/posts/archive-detail/archive-reply/${params.id}?page=${page}&limit=${COMMENT_REPLY_PAGE}&comment_id=${comment_id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch replies');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return { getReply: [], count: 0 };
      }
    }
  });

  // 대댓글이 있는 댓글에만 페이지네이션 버튼을 보여주기 위한 조건
  const filteredReplies: Reply[] =
    reply?.getReply?.filter((currentReply: Reply) => currentReply.comment_id === comment_id) || [];
  const replyCount = filteredReplies.length;
  const replyPages = replyCount > 0 ? Math.ceil(reply.count / COMMENT_REPLY_PAGE) : 0;

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>대댓글을 불러오는 데 실패했습니다.</div>;
  }

  const changReplyRetouch = (value?: string | undefined) => {
    setReplyRetouch(value || '');
  };

  const toggleReplyEditing = (id: string, reply: string) => {
    setReplyEditor({ [id]: true });
    setReplyEditorToggle({ [id]: !replyEditorToggle[id] });
    setReplyRetouch(reply);
  };

  const toggleEditingOptions = (id: string) => {
    setReplyEditorToggle({ [id]: !replyEditorToggle[id] });
  };

  return (
    <>
      {filteredReplies.length > 0 && (
        <>
          {filteredReplies.map((currentReply: Reply) => (
            <div key={currentReply.id} className="w-full border-b-[1px] p-5 flex flex-col gap-4">
              <div className="flex justify-start items-center gap-4 ">
                <Image
                  src={currentReply.user.profile_image}
                  alt="replyUserImage"
                  width={100}
                  height={100}
                  className="rounded-full w-10 h-10"
                />
                <div className="flex flex-col w-full">
                  <h2>{currentReply.user.nickname}</h2>
                  <p>{timeForToday(currentReply.updated_at)}</p>
                </div>
                <div className="relative">
                  <div className="right-0">
                    {me?.id === currentReply.user_id && (
                      <>
                        {replyEditor[currentReply.id] ? null : (
                          <div onClick={() => toggleEditingOptions(currentReply.id)} className="p-2">
                            <KebabButton />
                          </div>
                        )}
                        {replyEditorToggle[currentReply.id] && (
                          <div className="w-[105px] right-0 absolute flex flex-col justify-center items-center bg-white shadow-lg border rounded-lg">
                            <button
                              className="h-[44px]"
                              onClick={() => toggleReplyEditing(currentReply.id, currentReply.reply)}
                            >
                              댓글 수정
                            </button>
                            <button
                              className="h-[44px]"
                              onClick={() => handleReplyDelete(currentReply.id, currentReply.user_id)}
                            >
                              댓글 삭제
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              {replyEditor[currentReply.id] ? (
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
                    className="w-full"
                  />
                  <div>
                    <button onClick={() => setReplyEditor({ [currentReply.id]: false })}>취소</button>
                    <button onClick={() => replyRetouchHandle(currentReply.id, currentReply.user_id)}>수정</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>{currentReply.reply}</p>
                </div>
              )}
            </div>
          ))}
          <PaginationButtons totalPages={replyPages} currentPage={page} onPageChange={setPage} />
        </>
      )}
    </>
  );
}

export default ArchiveReply;
