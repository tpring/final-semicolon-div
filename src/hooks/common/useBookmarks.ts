import { useAuth } from '@/context/auth.context';
import { useQuery } from '@tanstack/react-query';

// 포스트 데이터를 가져오는 함수
const fetchBookmarksPosts = async (userId: string) => {
  const response = await fetch('/api/profile/bookmarksposts', {
    headers: {
      'user-id': userId
    }
  });
  if (!response.ok) {
    throw new Error('포스트 정보를 가져오는 데 실패했습니다.');
  }
  return response.json();
};

// 포스트 훅
export const useBookmarksPosts = () => {
  const { me } = useAuth();
  const userId = me?.id;

  return useQuery({
    queryKey: ['bookmarksPosts', userId],
    queryFn: () => {
      if (!userId) throw new Error('사용자 ID가 필요합니다.');
      return fetchBookmarksPosts(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000
  });
};

// 댓글 데이터를 가져오는 함수
const fetchBookmarksComments = async (userId: string) => {
  const response = await fetch('/api/profile/bookmarkscomments', {
    headers: {
      'user-id': userId
    }
  });
  if (!response.ok) {
    throw new Error('댓글 정보를 가져오는 데 실패했습니다.');
  }
  return response.json();
};

// 댓글 훅
export const useBookmarksComments = () => {
  const { me } = useAuth();
  const userId = me?.id;

  return useQuery({
    queryKey: ['bookmarksComments', userId],
    queryFn: () => {
      if (!userId) throw new Error('사용자 ID가 필요합니다.');
      return fetchBookmarksComments(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000
  });
};
