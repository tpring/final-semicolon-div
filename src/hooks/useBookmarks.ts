import { useQuery } from '@tanstack/react-query';

// 수정 제네릭?

// 포스트 데이터를 가져오는 함수
const fetchPosts = async () => {
  const response = await fetch('/api/profile/bookmarksposts');
  if (!response.ok) {
    throw new Error('포스트 정보 가져오기 실패');
  }
  return response.json();
};

// 포스트 훅
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });
};

// 댓글 데이터를 가져오는 함수
const fetchComments = async () => {
  const response = await fetch('/api/profile/bookmarkcomments');
  if (!response.ok) {
    throw new Error('댓글 정보 가져오기 실패');
  }
  return response.json();
};

// 댓글 훅
export const useComments = () => {
  return useQuery({
    queryKey: ['comments'],
    queryFn: fetchComments
  });
};

// 필요한 경우 추가 옵션 설정
// staleTime: 5 * 60 * 1000, // 데이터가 신선하다고 간주되는 시간 (5분)
// cacheTime: 10 * 60 * 1000, // 데이터가 캐시에 유지되는 시간 (10분)
// refetchOnWindowFocus: false, // 창 포커스 시 데이터 새로고침 여부
