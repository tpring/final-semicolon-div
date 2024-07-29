'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/context/auth.context';
import OAuthButtons from './OAuthButtons';
import { createClient } from '@/supabase/client';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { logIn, me } = useAuth();
  const supabase = createClient();

  const handleLogin = async (): Promise<void> => {
    setError(null);
    try {
      const response = await logIn(email, password);

      if (response.status === 200) {
        toast.success('로그인 성공!', {
          autoClose: 2000,
          onClose: () => router.replace('/')
        });
      } else {
        setError('로그인 실패');
        toast.error('로그인 중 에러가 발생했습니다.');
      }
    } catch (err) {
      setError('로그인 실패');
      toast.error('로그인 중 에러가 발생했습니다.');
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'kakao' | 'github') => {
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: 'http://localhost:3000'
        }
      });

      if (error) {
        console.error(`${provider} 로그인 오류:`, error);
        setError(`Failed to log in with ${provider}. ${error.message}`);
        toast.error(`Failed to log in with ${provider}.`);
      } else {
        toast.success('로그인 성공!', {
          autoClose: 2000,
          onClose: () => router.replace('/')
        });
      }
    } catch (err) {
      console.error('OAuth 로그인 중 에러가 발생했습니다:', err);
      setError('OAuth 로그인 실패');
      toast.error('OAuth 로그인 중 에러가 발생했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="이메일"
            className="w-full p-3 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full p-3 border rounded"
          />
        </div>
        <button onClick={handleLogin} className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded">
          로그인
        </button>
        <div className="mt-4 text-center">
          <p className="mt-4 text-center">
            혹시 계정이 없으신가요?{' '}
            <Link className="text-blue-600 hover:underline" href="/signup">
              회원가입
            </Link>
          </p>
        </div>
        <OAuthButtons handleLogin={handleOAuthLogin} />
      </div>
    </div>
  );
};

export default LoginForm;
