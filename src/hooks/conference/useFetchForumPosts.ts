'use client';

import { Post } from '@/types/posts/forumPosts';
import { useQuery } from '@tanstack/react-query';

const fetchForumPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch('/api/posts/conference');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error Fetching Forum Posts', error);
    return [];
  }
};

const useFetchForumPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['forumPosts'],
    queryFn: fetchForumPosts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  });
};

export default useFetchForumPosts;
