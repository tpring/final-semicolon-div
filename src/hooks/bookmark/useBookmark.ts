'use client';

import { BookmarkContext } from '@/providers/BookmarkProvider';
import { useContext } from 'react';

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmark Error');
  }
  return context;
};
