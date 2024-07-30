import { ReactNode } from 'react';

export type BookmarkButtonProps = {
  id: string;
  type: BookmarkType;
};

export type BookmarkContextType = {
  bookmarks: {
    forumBookmarks: string[];
    forumCommentBookmarks: string[];
    qnaBookmarks: string[];
    qnaCommentBookmarks: string[];
    archiveBookmarks: string[];
    archiveCommentBookmarks: string[];
  };
  setBookmarks: React.Dispatch<
    React.SetStateAction<{
      forumBookmarks: string[];
      forumCommentBookmarks: string[];
      qnaBookmarks: string[];
      qnaCommentBookmarks: string[];
      archiveBookmarks: string[];
      archiveCommentBookmarks: string[];
    }>
  >;
};

export type BookmarkProviderProps = {
  id: string;
  children: ReactNode;
};

export const TABLES = {
  forum: 'forum_bookmarks',
  forumComment: 'forum_comment_bookmarks',
  qna: 'qna_bookmarks',
  qnaComment: 'qna_comment_bookmarks',
  archive: 'archive_bookmarks',
  archiveComment: 'archive_comment_bookmarks'
} as const;

export type BookmarkType = keyof typeof TABLES;
