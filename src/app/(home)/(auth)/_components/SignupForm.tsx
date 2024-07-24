'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupButton from './SignupButton';
import useUserStore from '@/store/useUserStore';
import InputField from './InputField';
import CheckboxGroup from './CheckboxGroup';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [agreeAll, setAgreeAll] = useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(false);

  const { email, setEmail, nickname, setNickname } = useUserStore();
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState<boolean>(false);
  const [nicknameValid, setNicknameValid] = useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{10,}$/;
      return passwordRegex.test(password);
    };

    const validateNickname = (nickname: string) => {
      return nickname.length >= 2 && nickname.length <= 12;
    };

    setEmailValid(validateEmail(email));
    setPasswordValid(validatePassword(password));
    setConfirmPasswordValid(password === confirmPassword);
    setNicknameValid(validateNickname(nickname));
  }, [email, password, confirmPassword, nickname]);

  useEffect(() => {
    setFormValid(emailValid && passwordValid && confirmPasswordValid && nicknameValid && agreeTerms && agreePrivacy);
  }, [emailValid, passwordValid, confirmPasswordValid, nicknameValid, agreeTerms, agreePrivacy]);

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!agreeTerms || !agreePrivacy) {
      toast.error('약관 동의를 확인해주세요');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    const userData = {
      email,
      password,
      nickname
    };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      toast.success('회원가입이 완료되었습니다.', {
        autoClose: 2000,
        onClose: () => router.replace('/login')
      });
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget.closest('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
        <form onSubmit={handleSignup}>
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해 주세요."
          />
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요."
          />
          <InputField
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호를 한 번 더 입력해 주세요."
          />
          <div className="text-sm text-gray-600 mb-4">영문/숫자/특수문자 포함 (10자 이상)</div>
          <div className="mb-4 flex items-center space-x-2">
            <div className="flex-grow">
              <InputField
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임 (2~12자)를 입력해 주세요."
              />
            </div>
            <button className="p-3 border rounded bg-blue-500 text-white hover:bg-blue-600 transition h-full">
              중복 확인
            </button>
          </div>
          <CheckboxGroup
            agreeAll={agreeAll}
            setAgreeAll={setAgreeAll}
            agreeTerms={agreeTerms}
            setAgreeTerms={setAgreeTerms}
            agreePrivacy={agreePrivacy}
            setAgreePrivacy={setAgreePrivacy}
          />
          <div className="mb-6">
            <div className="bg-gray-200 p-6 rounded flex items-center justify-center">
              {/* reCAPTCHA 자리 */}
              <p className="text-gray-600">로봇이 아닙니다.</p>
            </div>
          </div>
          <SignupButton onClick={handleButtonClick} disabled={!formValid} />
          <p className="mt-4 text-center">
            이미 아이디가 있으신가요?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              로그인
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
