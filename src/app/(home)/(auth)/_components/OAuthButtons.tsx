import Github from '@/assets/images/auth/Github';
import Google from '@/assets/images/auth/Google';
import Kakao from '@/assets/images/auth/Kakao';
import React from 'react';

type OAuthButtonsProps = {
  handleLogin: (provider: 'google' | 'kakao' | 'github') => void;
};

const OAuthButtons = ({ handleLogin }: OAuthButtonsProps) => {
  return (
    <div className="mt-4 text-center">
      <p className="text-gray-600">SNS 계정으로 로그인/회원가입</p>
      <div className="flex justify-center mt-2 space-x-4">
        <button onClick={() => handleLogin('google')} className=" p-2 rounded-full flex items-center justify-center ">
          <Google />
        </button>
        <button onClick={() => handleLogin('kakao')} className="p-2 rounded-full flex items-center justify-center ">
          <Kakao />
        </button>
        <button onClick={() => handleLogin('github')} className="p-2 rounded-full flex items-center justify-center ">
          <Github />
        </button>
      </div>
    </div>
  );
};

export default OAuthButtons;
