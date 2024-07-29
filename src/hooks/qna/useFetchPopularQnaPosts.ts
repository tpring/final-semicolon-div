import { Post } from '@/types/posts/qnaTypes';
import { useQuery } from '@tanstack/react-query';

const fetchPopularQnaPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/posts/qna/popular');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data;
};

const useFetchPopularQnaPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['popularQnaPosts'],
    queryFn: fetchPopularQnaPosts
  });
};
