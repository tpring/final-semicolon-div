'use client';

import { useAuth } from '@/context/auth.context';
import { BookmarkContextType, BookmarkProviderProps } from '@/types/buttons/bookmark';
import { createContext, useEffect, useState } from 'react';

export const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: BookmarkProviderProps) => {
  const { me } = useAuth();
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!me) return;
      try {
        const response = await fetch(`/api/common/bookmark?user_id=${me.id}`);
        if (response.ok) {
          const result = await response.json();
          setBookmarks(result.bookmarks);
        } else {
          console.error('context error');
        }
      } catch (error) {
        console.error('context', error);
      }
    };
    fetchBookmarks();
  }, [me]);

  return <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>{children}</BookmarkContext.Provider>;
};
