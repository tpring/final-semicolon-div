import { useState } from 'react';
import { toast } from 'react-toastify';
import { createClient } from '@/supabase/client';

const useOAuthLogin = () => {
  const [error, setError] = useState<string | null>(null);

  const handleOAuthLogin = async (provider: 'google' | 'kakao' | 'github') => {
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: 'http://localhost:3000'
        }
      });

      if (error) {
        console.error(`${provider} 로그인 오류:`, error);
        setError(`Failed to log in with ${provider}. ${error.message}`);
        toast.error(`Failed to log in with ${provider}.`);
      }
    } catch (err) {
      console.error('OAuth 로그인 중 에러가 발생했습니다:', err);
      setError('OAuth 로그인 실패');
      toast.error('OAuth 로그인 중 에러가 발생했습니다.');
    }
  };

  return { handleOAuthLogin, error };
};

export default useOAuthLogin;
