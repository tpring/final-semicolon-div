'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/context/auth.context';
import OAuthButtons from './OAuthButtons';
import { createClient } from '@/supabase/client';
import Logo from '@/assets/images/header/Logo';
import InputField from './InputField';
function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { logIn } = useAuth();

  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [emailMessage, setEmailMessage] = useState<string>('');

  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const [passwordMessage, setPasswordMessage] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setEmailValid(false);
      setEmailMessage('유효하지 않은 이메일 형식입니다.');
      toast.error('유효하지 않은 이메일 형식입니다.');
      return;
    } else {
      setEmailValid(true);
      setEmailMessage('');
    }

    if (password.length < 6) {
      setPasswordValid(false);
      setPasswordMessage('비밀번호는 6자 이상이어야 합니다.');
      toast.error('비밀번호는 6자 이상이어야 합니다.');
      return;
    } else {
      setPasswordValid(true);
      setPasswordMessage('');
    }

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

  // 이메일 유효성 검사 함수
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // OAuth 로그인 처리 함수
  const handleOAuthLogin = async (provider: 'google' | 'kakao' | 'github') => {
    setError(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: process.env.NEXT_PUBLIC_BASE_URL
        }
      });

      if (error) {
        setError(`Failed to log in with ${provider}. ${error.message}`);
        toast.error(`Failed to log in with ${provider}.`);
      } else {
        localStorage.setItem('oauthProvider', provider);
      }
    } catch (err) {
      setError('OAuth 로그인 실패');
      toast.error('OAuth 로그인 중 에러가 발생했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <ToastContainer />
      <div className="bg-white w-full max-w-sm">
        <div className="flex items-center justify-center mb-16">
          <Logo />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <InputField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
              valid={emailValid}
              message={emailMessage}
            />
          </div>
          <div className="mb-4">
            <InputField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              valid={passwordValid}
              message={passwordMessage}
            />
          </div>
          <button type="submit" className="w-full p-3 bg-main-100 hover:bg-main-400 text-white rounded-md">
            로그인
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="mt-4 text-center">
            혹시 계정이 없으신가요?
            <Link className="text-blue-600 hover:underline" href="/signup">
              회원가입
            </Link>
          </p>
        </div>
        <div className="border-t-4 mt-8">
          <OAuthButtons handleLogin={handleOAuthLogin} />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
