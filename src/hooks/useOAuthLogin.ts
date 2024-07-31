import { useState } from 'react';
import { toast } from 'react-toastify';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth.context';
import { User } from '@supabase/supabase-js';

const useOAuthLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [showNicknameModal, setShowNicknameModal] = useState<boolean>(false); // 닉네임 모달 상태
  const router = useRouter();
  const { setUser } = useAuth(); // setUser를 사용하기 위해 useAuth 훅 사용

  const handleOAuthLogin = async (provider: 'google' | 'kakao' | 'github') => {
    setError(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: 'http://localhost:3000'
        }
      });
      console.log(data);

      if (error) {
        console.error(`${provider} 로그인 오류:`, error);
        setError(`Failed to log in with ${provider}. ${error.message}`);
        toast.error(`Failed to log in with ${provider}.`);
      } else if (data.user) {
        setUser(data.user); // 이미 받은 유저 데이터를 사용하여 설정
        checkAndShowNicknameModal(data.user); // 닉네임 확인 후 모달 표시
      } else {
        setError('Failed to retrieve user data.');
        toast.error('Failed to retrieve user data.');
      }
    } catch (err) {
      console.error('OAuth 로그인 중 에러가 발생했습니다:', err);
      setError('OAuth 로그인 실패');
      toast.error('OAuth 로그인 중 에러가 발생했습니다.');
    }
  };

  const checkAndShowNicknameModal = async (user: User) => {
    const supabase = createClient();

    // 사용자의 닉네임을 확인
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('nickname')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('프로필 정보를 불러오는 중 오류가 발생했습니다:', profileError);
      return;
    }
    if (!profile?.nickname) {
      setShowNicknameModal(true); // 닉네임이 없으면 모달 표시
    } else {
      router.replace('/'); // 닉네임이 있으면 메인 페이지로 이동
    }
  };

  return { handleOAuthLogin, error, showNicknameModal, setShowNicknameModal };
};

export default useOAuthLogin;
