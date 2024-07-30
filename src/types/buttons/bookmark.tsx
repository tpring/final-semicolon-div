import { ReactNode } from 'react';

export type bookmarkButton = {
  postId: string;
};

export type BookmarkContextType = {
  bookmarks: string[];
  setBookmarks: React.Dispatch<React.SetStateAction<string[]>>;
};

export type BookmarkProviderProps = {
  children: ReactNode;
};
