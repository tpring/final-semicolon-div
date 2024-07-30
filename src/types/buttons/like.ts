import { ReactNode } from 'react';

export type LikeButtonProps = {
  id: string;
  type: LikeType;
};

export type LikeContextType = {
  likes: {
    forumLikes: string[];
    forumCommentLikes: string[];
    qnaLikes: string[];
    qnaCommentLikes: string[];
    archiveLikes: string[];
    archiveCommentLikes: string[];
  };
  setLikes: React.Dispatch<
    React.SetStateAction<{
      forumLikes: string[];
      forumCommentLikes: string[];
      qnaLikes: string[];
      qnaCommentLikes: string[];
      archiveLikes: string[];
      archiveCommentLikes: string[];
    }>
  >;
};

export type LikeProviderProps = {
  id: string;
  children: ReactNode;
};

export const TABLES = {
  forum: 'forum_likes',
  forumComment: 'forum_comment_likes',
  qna: 'qna_likes',
  qnaComment: 'qna_comment_likes',
  archive: 'archive_likes',
  archiveComment: 'archive_comment_likes'
} as const;

export type LikeType = keyof typeof TABLES;
