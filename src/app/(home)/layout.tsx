import React from 'react';
import OAuthNicknameModalWrapper from './(auth)/_components/OAuthNicknameModalWrapper';
import HeaderWrapper from '@/components/header/HeaderWrapper';
import Header from '@/components/header/Header';

type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <HeaderWrapper />
      <div className="flex justify-center flex-1 w-full">
        <main className="w-[1200px] p-10">{children}</main>
      </div>
      <OAuthNicknameModalWrapper />
    </div>
  );
};

export default HomeLayout;
