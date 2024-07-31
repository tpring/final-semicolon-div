import React from 'react';

type OAuthButtonsProps = {
  handleLogin: (provider: 'google' | 'kakao' | 'github') => void;
};

const OAuthButtons = ({ handleLogin }: OAuthButtonsProps) => {
  return (
    <div className="mt-4 text-center">
      <p className="text-gray-600">SNS 계정으로 로그인/회원가입</p>
      <div className="flex justify-center mt-2 space-x-4">
        <button
          onClick={() => handleLogin('google')}
          className="bg-white border border-gray-300 p-2 rounded-full flex items-center justify-center w-12 h-12"
        >
          <img src="/images/OAuthLogos/GoogleLogo.png" alt="Google" width={24} height={24} />
        </button>
        <button
          onClick={() => handleLogin('kakao')}
          className="bg-yellow-400 p-2 rounded-full flex items-center justify-center w-12 h-12"
        >
          <img src="/images/OAuthLogos/KakaoLogo.png" alt="Kakao" width={24} height={24} />
        </button>
        <button
          onClick={() => handleLogin('github')}
          className="bg-black p-2 rounded-full flex items-center justify-center w-12 h-12"
        >
          <img src="/images/OAuthLogos/GithubLogo.png" alt="GitHub" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default OAuthButtons;
