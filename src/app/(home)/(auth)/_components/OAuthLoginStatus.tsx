'use client';

import Div from '@/assets/images/auth/Div';
import Github from '@/assets/images/auth/Github';
import Google from '@/assets/images/auth/Google';
import Kakao from '@/assets/images/auth/Kakao';
import { useEffect, useState } from 'react';

const OAuthLoginStatus = () => {
  const [provider, setProvider] = useState<string | null>(null);

  useEffect(() => {
    const storedProvider = localStorage.getItem('oauthProvider');
    setProvider(storedProvider);
  }, []);

  const getProviderMessage = (provider: string | null) => {
    switch (provider) {
      case 'kakao':
        return <Kakao />;
      case 'google':
        return <Google />;
      case 'github':
        return <Github />;
      default:
        return <Div />;
    }
  };

  return (
    <div className="flex items-center text-mt-4 text-center">
      <p className="flex items-center">로그인 계정</p>
      <p>{getProviderMessage(provider)}</p>
    </div>
  );
};

export default OAuthLoginStatus;
