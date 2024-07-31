'use client';

import { useAuth } from '@/context/auth.context';
import { LikeContextType } from '@/types/buttons/like';
import { createContext, ReactNode, useEffect, useState } from 'react';

export const LikeContext = createContext<LikeContextType | undefined>(undefined);

const LikeProvider = ({ children }: { children: ReactNode }) => {
  const { me } = useAuth();
  const [likes, setLikes] = useState<LikeContextType['likes']>({
    forumLikes: [],
    forumCommentLikes: [],
    qnaLikes: [],
    qnaCommentLikes: [],
    archiveLikes: [],
    archiveCommentLikes: []
  });

  useEffect(() => {
    const fetchLikes = async () => {
      if (!me) return;
      try {
        const response = await fetch(`/api/common/like/like?user_id=${me.id}`);
        if (response.ok) {
          const result = await response.json();
          setLikes({
            forumLikes: result.forumLikes.map((like: { post_id: string }) => like.post_id),
            forumCommentLikes: result.forumCommentLikes.map((like: { comment_id: string }) => like.comment_id),
            qnaLikes: result.qnaLikes.map((like: { post_id: string }) => like.post_id),
            qnaCommentLikes: result.qnaCommentLikes.map((like: { comment_id: string }) => like.comment_id),
            archiveLikes: result.archiveLikes.map((like: { post_id: string }) => like.post_id),
            archiveCommentLikes: result.archiveCommentLikes.map((like: { comment_id: string }) => like.comment_id)
          });
        } else {
          console.error('like context error');
        }
      } catch (error) {
        console.error('like context error 2', error);
      }
    };
    fetchLikes();
  }, [me]);
  return <LikeContext.Provider value={{ likes, setLikes }}>{children}</LikeContext.Provider>;
};

export default LikeProvider;
