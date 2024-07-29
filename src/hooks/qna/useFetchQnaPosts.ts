'use client';

import { FetchResult } from '@/types/posts/qnaTypes';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

const POSTS_PER_PAGE = 6;

const fetchQnaPosts = async (page: number, status: string): Promise<FetchResult> => {
  const response = await fetch(`/api/posts/qna/${status}?page=${page}&limit=${POSTS_PER_PAGE}`);
  if (!response.ok) {
    throw new Error('Network response is not ok');
  }
  const data = await response.json();
  return { data: data.data, count: data.count, nextPage: data.data.length === POSTS_PER_PAGE ? page + 1 : null };
};

const useFetchQnaPosts = (status: string) => {
  const [page, setPage] = useState(0);
  const { data, error, isPending, isError } = useQuery<FetchResult, Error>({
    queryKey: ['qnaPosts', page, status],
    queryFn: () => fetchQnaPosts(page, status)
    // staleTime: 1000 * 60 * 5,
    // gcTime: 1000 * 60 * 10
  });

  const totalPages = data ? Math.ceil(data.count / POSTS_PER_PAGE) : 0;

  const goToPage = useCallback((pageNumber: number) => {
    setPage(pageNumber);
  }, []);

  return {
    data: data?.data,
    error,
    isPending,
    isError,
    page,
    totalPages,
    goToPage
  };
};

export default useFetchQnaPosts;
