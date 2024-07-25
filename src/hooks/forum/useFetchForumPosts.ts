'use client';

import { FetchResult } from '@/types/posts/forumTypes';
import { InfiniteData, QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

const POSTS_PER_PAGE = 10;

const fetchForumPosts = async ({ pageParam }: QueryFunctionContext<[string], number>): Promise<FetchResult> => {
  const response = await fetch(`/api/posts/forum?page=${pageParam}&limit=${POSTS_PER_PAGE}`);
  const data = await response.json();
  return { data: data.data, nextPage: data.data.length === POSTS_PER_PAGE ? pageParam + 1 : null };
};

const useFetchForumPosts = () => {
  return useInfiniteQuery<FetchResult, Error, InfiniteData<FetchResult>, [string], number>({
    queryKey: ['forumPosts'],
    queryFn: fetchForumPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage: FetchResult) => lastPage.nextPage
    // staleTime: 1000 * 60 * 5,
    // gcTime: 1000 * 60 * 10
  });
};

export default useFetchForumPosts;
