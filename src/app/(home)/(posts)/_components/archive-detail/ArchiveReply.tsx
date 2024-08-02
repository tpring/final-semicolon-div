'use client';

import Kebab from '@/assets/images/common/kebab';
import { useAuth } from '@/context/auth.context';
import { timeForToday } from '@/utils/timeForToday';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands, ContextStore } from '@uiw/react-md-editor';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';

// Reply 타입 정의
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

const ArchiveReply = ({ comment_id }: { comment_id: string }) => {
  const { me } = useAuth();
  const params_id = useParams();
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const queryClient = useQueryClient();
  const [replyRetouch, setReplyRetouch] = useState('');
  const [replyEditor, setReplyEditor] = useState<{ [key: string]: boolean }>({});
  const [replyEditorToggle, setReplyEditorToggle] = useState<{ [key: string]: boolean }>({});
  const [replyInputToggle, setReplyInputToggle] = useState<{ [key: string]: boolean }>({}); // 대댓글 입력창 토글 상태
  const [replyListToggle, setReplyListToggle] = useState(false); // 대댓글 리스트 토글 상태

  const COMMENT_REPLY_PAGE = 5; // 페이지당 댓글 수

  // 대댓글 추가
  const replyAddMutation = useMutation({
    mutationFn: async ({ user_id, comment_id, reply }: { user_id: string; comment_id: string; reply: string }) => {
      const response = await fetch(`/api/posts/archive-detail/archive-reply/${params_id.id}`, {
        method: 'POST',
        body: JSON.stringify({ user_id, comment_id, reply })
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReply', comment_id, page] });
      setReplyRetouch(''); // 대댓글 추가 후 입력 창 비우기
      setReplyInputToggle({ ...replyInputToggle, [comment_id]: false }); // 대댓글 입력창 닫기
    }
  });

  const handleAddReply = async () => {
    if (!replyRetouch) {
      toast.error('댓글을 입력해주세요!', {
        autoClose: 2000
      });
      return;
    }

    if (me?.id) {
      // me가 null이 아닌 경우에만 대댓글 추가
      replyAddMutation.mutate({ user_id: me.id, comment_id, reply: replyRetouch });
    } else {
      toast.error('로그인이 필요합니다.', {
        autoClose: 2000
      });
    }
  };

  // 대댓글 수정 (시간순 확인해야함! 수정 시 최신으로 되어서 기존 시간 유지하게 하고 내용만 변경되게!)
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
      const response = await fetch(`/api/posts/archive-detail/archive-reply/${params_id.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ id, user_id, replyRetouch, comment_id })
      });
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentReply', comment_id, page] });
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
      const response = await fetch(`/api/posts/archive-detail/archive-reply/${params_id.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id, user_id }) // 삭제 요청에 필요한 데이터
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
    // 삭제 요청 데이터 확인
    console.log(`Deleting reply with ID: ${id}, User: ${user_id}`);
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
          `/api/posts/archive-detail/archive-reply/${params_id.id}?page=${page}&limit=${COMMENT_REPLY_PAGE}&comment_id=${comment_id}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Failed to fetch replies:', error);
      }
    }
  });

  // 대댓글이 있는 댓글에만 페이지네이션 버튼을 보여주기 위한 조건
  const filteredReplies: Reply[] =
    reply?.getReply.filter((currentReply: Reply) => currentReply.comment_id === comment_id) || [];
  const replyCount = filteredReplies.length;
  const replyPages = replyCount > 0 ? Math.ceil(reply.count / COMMENT_REPLY_PAGE) : 0;

  if (isPending) {
    return <div>Loading...</div>; // 로딩 중일 때 사용자에게 보여줄 메시지
  }

  // MDeditor의 onChange 이벤트 핸들러
  const changReplyRetouch = (
    value?: string | undefined,
    event?: ChangeEvent | undefined,
    state?: ContextStore | undefined
  ) => {
    setReplyRetouch(value || ''); // value가 undefined인 경우 빈 문자열로 설정
  };

  // 댓글 수정 버튼
  const toggleReplyEditing = (id: string, reply: string) => {
    setReplyEditor({ [id]: true });
    setReplyEditorToggle({ [id]: !replyEditorToggle[id] });
    setReplyRetouch(reply);
  };

  // 댓글 수정&삭제 케밥
  const toggleEditingOptions = (id: string) => {
    setReplyEditorToggle({ [id]: !replyEditorToggle[id] });
  };

  // 대댓글 입력창 토글
  const toggleReplyInput = (commentId: string) => {
    setReplyInputToggle({ ...replyInputToggle, [commentId]: !replyInputToggle[commentId] });
  };

  // 대댓글 보기/숨기기 토글
  const toggleReplyList = () => {
    setReplyListToggle(!replyListToggle);
  };

  // 페이지네이션 버튼 생성 (대댓글이 있는 경우에만 표시)
  const paginationButtons =
    replyPages > 1
      ? Array.from({ length: replyPages }, (_, index) => (
          <button
            key={index}
            className={`px-2 py-1 ${page === index + 1 ? 'bg-gray-300' : 'bg-gray-100'}`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))
      : null;

  return (
    <>
      {/* 대댓글 보기/숨기기 버튼 */}
      <div className="flex justify-end">
        {' '}
        {/* 오른쪽 정렬을 위해 flex 사용 */}
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={toggleReplyList}>
          {replyListToggle ? '대댓글 숨기기' : '대댓글 보기'}
        </button>
      </div>

      {/* 대댓글 리스트 */}
      {replyListToggle && (
        <>
          {filteredReplies.map(
            (
              currentReply: Reply // 명시적인 타입 지정
            ) => (
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
                      {me?.id === currentReply.user_id && ( // me가 null이 아닌 경우에만 접근
                        <>
                          {replyEditor[currentReply.id] ? null : (
                            <div onClick={() => toggleEditingOptions(currentReply.id)} className="p-2">
                              <Kebab />
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
                      onChange={changReplyRetouch} // 올바른 타입의 함수로 변경
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
            )
          )}

          {/* 대댓글 입력창 */}
          {replyInputToggle[comment_id] && (
            <div className="w-full p-5 flex flex-col gap-4">
              <MDEditor
                value={replyRetouch}
                onChange={changReplyRetouch} // 올바른 타입의 함수로 변경
                preview="edit"
                extraCommands={commands.getCommands().filter(() => false)}
                commands={commands.getCommands().filter((command) => command.name !== 'image')}
                textareaProps={{ maxLength: 1000 }}
                className="w-full"
              />
              <button onClick={handleAddReply}>대댓글 작성</button>
            </div>
          )}

          {/* 페이지네이션 버튼 */}
          {replyPages > 1 && <div className="flex justify-center gap-2 py-4">{paginationButtons}</div>}
        </>
      )}
    </>
  );
};

export default ArchiveReply;
