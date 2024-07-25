import React from 'react';
import ProfileSidebar from './_components/ProfileSidebar';

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="flex justify-center w-[1200px] h-screen">
      <ProfileSidebar />
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
};

export default ProfileLayout;
