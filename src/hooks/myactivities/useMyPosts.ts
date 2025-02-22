import { useAuth } from '@/context/auth.context';
import { useQuery } from '@tanstack/react-query';

// 포스트 데이터를 가져오는 함수
const fetchMyPosts = async (userId: string) => {
  const response = await fetch('/api/profile/myposts', {
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
export const useMyPosts = () => {
  const { me } = useAuth();
  const userId = me?.id;

  return useQuery({
    queryKey: ['myPosts', userId],
    queryFn: () => {
      if (!userId) throw new Error('사용자 ID가 필요합니다.');
      return fetchMyPosts(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000
  });
};

// 댓글 데이터를 가져오는 함수
const fetchMyComments = async (userId: string) => {
  const response = await fetch('/api/profile/mycomments', {
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
export const useMyComments = () => {
  const { me } = useAuth();
  const userId = me?.id;

  return useQuery({
    queryKey: ['myComments', userId],
    queryFn: () => {
      if (!userId) throw new Error('사용자 ID가 필요합니다.');
      return fetchMyComments(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000
  });
};
