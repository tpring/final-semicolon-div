'use client';
import { useAuth } from '@/context/auth.context';
import React, { useState, useEffect } from 'react';
import OAuthNicknameModal from './OAuthNicknameModal';

const OAuthNicknameModalWrapper = () => {
  const { me, userData, updateUserData } = useAuth();
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);

  useEffect(() => {
    if (userData && !userData.nickname) {
      setIsNicknameModalOpen(true);
    }
  }, [userData]);

  const handleNicknameUpdate = (newNickname: string) => {
    updateUserData({ nickname: newNickname });
    setIsNicknameModalOpen(false);
  };

  return (
    <OAuthNicknameModal
      isOpen={isNicknameModalOpen}
      currentNickname={userData?.nickname || ''}
      onNicknameUpdate={handleNicknameUpdate}
      userId={me?.id || ''}
    />
  );
};

export default OAuthNicknameModalWrapper;
