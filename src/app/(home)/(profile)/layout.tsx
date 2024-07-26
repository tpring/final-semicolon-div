import React from 'react';
import ProfileSidebar from './_components/ProfileSidebar';
import Header from '@/components/header/Header';

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="flex flex-col justify-center items-center relative">
      <Header />
      <div className="flex justify-center w-[1200px] h-screen">
        <ProfileSidebar />
        <main className="flex-1 p-10">{children}</main>
      </div>
    </div>
  );
};

export default ProfileLayout;
