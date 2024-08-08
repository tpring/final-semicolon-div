import { useAuth } from '@/context/auth.context';
import { useQuery } from '@tanstack/react-query';

// 포스트 데이터를 가져오는 함수
const fetchLikesPosts = async (userId: string) => {
  const response = await fetch('/api/profile/likesposts', {
    cache: 'no-store',
    headers: {
      'user-id': userId
    }
  });
  if (!response.ok) {
    throw new Error('포스트 정보 가져오기 실패');
  }
  return response.json();
};

// 포스트 훅
export const useLikesPosts = () => {
  const { me } = useAuth();
  const userId = me?.id;

  return useQuery({
    queryKey: ['likesPosts', userId],
    queryFn: () => {
      if (!userId) throw new Error('사용자 ID가 필요합니다.');
      return fetchLikesPosts(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000
  });
};

// 댓글 데이터를 가져오는 함수
const fetchLikesComments = async (userId: string) => {
  const response = await fetch('/api/profile/likescomments', {
    headers: {
      'user-id': userId
    }
  });
  if (!response.ok) {
    throw new Error('댓글 정보 가져오기 실패');
  }
  return response.json();
};

// 댓글 훅
export const useLikesComments = () => {
  const { me } = useAuth();
  const userId = me?.id;

  return useQuery({
    queryKey: ['likesComments', userId],
    queryFn: () => {
      if (!userId) throw new Error('사용자 ID가 필요합니다.');
      return fetchLikesComments(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000
  });
};
