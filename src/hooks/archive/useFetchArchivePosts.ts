'use client';

import { FetchResult, Post, SortOption } from '@/types/posts/archiveTypes';
import { useQuery } from '@tanstack/react-query';

const fetchArchivePosts = async (page: number, limit: number, sort: SortOption): Promise<FetchResult> => {
  const response = await fetch(`/api/posts/archive?page=${page}&limit=${limit}&sort=${sort}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Network response was not ok: ${errorText}`);
  }
  const data = await response.json();
  return { data: data.archivePosts, count: data.archiveCount, nextPage: data.nextPage };
};

const fetchPopularArchivePosts = async (): Promise<{ data: Post[] }> => {
  const response = await fetch(`/api/posts/archive`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Network response was not ok: ${errorText}`);
  }
  const data = await response.json();
  return { data: data.popularPosts };
};

const useArchivePosts = (page: number, limit: number, sort: SortOption) => {
  return useQuery<FetchResult, Error>({
    queryKey: ['archivePosts', page, limit, sort],
    queryFn: () => fetchArchivePosts(page, limit, sort)
    // staleTime: 1000 * 60 * 5,
    // gcTime: 1000 * 60 * 10
  });
};

const usePopularArchivePosts = () => {
  return useQuery<{ data: Post[] }, Error>({
    queryKey: ['popularArchivePosts'],
    queryFn: fetchPopularArchivePosts
    // staleTime: 1000 * 60 * 5,
    // gcTime: 1000 * 60 * 10
  });
};

export { useArchivePosts, usePopularArchivePosts };
