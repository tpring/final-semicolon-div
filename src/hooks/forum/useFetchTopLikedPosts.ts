import { FetchResult, Post } from '@/types/posts/forumTypes';
import { useQuery } from '@tanstack/react-query';

const fetchTopLikedPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/posts/forum/all-forum');
  if (!response.ok) {
    throw new Error('Error Fetching Top Liked Posts');
  }
  const data = await response.json();
  return data.data;
};

const useFetchTopLikedPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['topForumPosts'],
    queryFn: fetchTopLikedPosts
    // staleTime: 1000 * 60 * 5,
    // gcTime: 1000 * 60 * 10
  });
};

export default useFetchTopLikedPosts;
