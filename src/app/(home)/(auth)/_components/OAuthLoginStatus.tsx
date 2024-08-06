'use client';

import Div40X40 from '@/assets/images/auth/Div40X40';
import Github40X40 from '@/assets/images/auth/Github40X40';
import Google40X40 from '@/assets/images/auth/Google40X40';
import Kakao40X40 from '@/assets/images/auth/Kakao40X40';
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
        return <Kakao40X40 />;
      case 'google':
        return <Google40X40 />;
      case 'github':
        return <Github40X40 />;
      default:
        return <Div40X40 /* fillBg="#FFFFFF" fill="#0F0F0F" */ />;
    }
  };

  return (
    <div className="flex items-center justify-between p-[16px_0]">
      <span className="text-neutral-900 text-subtitle1 font-medium">로그인 계정</span>
      <span className="center-alignment w-[40px] h-[40px] border border-main-50 rounded-full">
        {getProviderMessage(provider)}
      </span>
    </div>
  );
};

export default OAuthLoginStatus;
