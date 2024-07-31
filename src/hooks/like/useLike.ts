'use client';

import { LikeContext } from '@/providers/LikeProvider';
import { useContext } from 'react';

export const useLike = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLike Error');
  }
  return context;
};
