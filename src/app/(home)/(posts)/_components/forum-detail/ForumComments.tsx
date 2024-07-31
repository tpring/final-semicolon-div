'use client';

import { useAuth } from '@/context/auth.context';
import { forumCommentsType } from '@/types/posts/forumDetailTypes';
import { timeForToday } from '@/utils/timeForToday';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import MDEditor, { commands } from '@uiw/react-md-editor';
import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import ForumReply from './ForumReply';
import Kebab from '@/assets/images/common/Kebab';
import ForumReplyInput from './ForumReplyInput';

const ForumComments = () => {
  const { me } = useAuth();
  const params = useParams();
  const queryClient = useQueryClient();
  const commentRetouchRef = useRef<HTMLInputElement>(null);
  const [mdEditorChange, setMdEditorChange] = useState('');
  const [editingState, setEditingState] = useState<{ [key: string]: boolean }>({});
  const [editingToggleState, setEditingToggleState] = useState<{ [key: string]: boolean }>({});

  //댓글 가져오기
  const { data: comments } = useQuery<forumCommentsType[]>({
    queryKey: ['forumComments'],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/posts/forum-detail/forum-comments/${params.id}`);
        const data = await response.json();
        data.sort((a, b) => dayjs(b.updated_at).unix() - dayjs(a.updated_at).unix());
        return data;
      } catch (error) {}
    }
  });

  //댓글 수정
  const commentRetouch = useMutation({
    mutationFn: async ({
      id,
      user_id,
      retouchComment
    }: {
      id: string;
      user_id: string;
      retouchComment: string | undefined;
    }) => {
      const response = await fetch(`/api/posts/forum-detail/forum-comments/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ id, user_id, retouchComment })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumComments'] });
    }
  });

  const commentRetouchHandle = async (id: string, user_id: string) => {
    const retouchComment = commentRetouchRef.current?.value;
    commentRetouch.mutate({ id, user_id, retouchComment });
    if (retouchComment) {
      commentRetouchRef.current.value = '';
    }
  };

  // 댓글 삭제
  const commentDelete = useMutation({
    mutationFn: async ({ id, user_id }: { id: string; user_id: string }) => {
      const response = await fetch(`/api/posts/forum-detail/forum-comments/${params.id}`, {
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
  const toggleEditing = (id: string) => {
    setEditingState({ [id]: !editingState[id] });
    setEditingToggleState({ [id]: false[id] });
  };
  //댓글 수정&삭제 케밥
  const toggleEditingOptions = (id: string) => {
    setEditingToggleState({ [id]: !editingToggleState[id] });
  };

  return (
    <>
      {comments?.map((comment) => (
        <div key={comment.id} className="w-full border-b-[1px] p-5 flex flex-col  gap-4">
          <div className="flex justify-start items-center gap-4 ">
            <img src={comment.user.profile_image} className="rounded-full w-10 h-10" />
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
                        <button className="h-[44px]" onClick={() => toggleEditing(comment.id)}>
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
                value={comment.comment}
                ref={commentRetouchRef}
                preview="edit"
                extraCommands={commands.getCommands().filter(() => false)}
                commands={commands.getCommands().filter((command) => {
                  return command.name !== 'image';
                })}
                textareaProps={{ maxLength: 1000 }}
                className="w-full "
              />
              <div>
                <button onClick={() => toggleEditing(comment.id)}>취소</button>
                <button onClick={() => commentRetouchHandle(comment.id, comment.user_id)}>수정</button>
              </div>
            </div>
          ) : (
            <div>
              <p>{comment.comment}</p>
            </div>
          )}
          <ForumReplyInput comment_id={comment.id} />
          <ForumReply comment_id={comment.id} />
        </div>
      ))}
    </>
  );
};

export default ForumComments;
