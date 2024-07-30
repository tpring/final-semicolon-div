import React from 'react';
import ProfileSidebar from './_components/ProfileSidebar';

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="flex h-screen">
      <ProfileSidebar />
      <main className="flex-1 ml-[286px] overflow-y-auto p-10">{children}</main>
    </div>
  );
};

export default ProfileLayout;
