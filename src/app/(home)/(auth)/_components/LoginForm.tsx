'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/context/auth.context';
import OAuthButtons from './OAuthButtons';
import useOAuthLogin from '@/hooks/useOAuthLogin';
import { createClient } from '@/supabase/client';
import NicknameModal from '../../(profile)/_components/setting/NicknameModal';

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { logIn } = useAuth();
  const { handleOAuthLogin, error: oAuthError, showNicknameModal, setShowNicknameModal } = useOAuthLogin();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
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

  const handleNicknameUpdate = async (newNickname: string) => {
    const supabase = createClient();
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.error('사용자 정보를 불러오는 중 오류가 발생했습니다:', error);
      return;
    }

    const { error: updateError } = await supabase.from('users').update({ nickname: newNickname }).eq('id', user.id);

    if (updateError) {
      console.error('닉네임 업데이트 중 오류가 발생했습니다:', updateError);
      return;
    }

    setShowNicknameModal(false);
    router.replace('/'); // 닉네임 변경 후 메인 페이지로 이동
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded">
            로그인
          </button>
        </form>
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
      <NicknameModal
        isOpen={showNicknameModal}
        onClose={() => setShowNicknameModal(false)}
        currentNickname=""
        onNicknameUpdate={handleNicknameUpdate}
      />
    </div>
  );
}

export default LoginForm;
