'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import EditableField from './setting/EditableField';
import { User as UserType } from '@/types/profile/profileType';
import { useAuth } from '@/context/auth.context';

const ProfileSetting = () => {
  const { me, userData } = useAuth();
  const [user, setUser] = useState<UserType | null>(null);
  const [showInput, setShowInput] = useState<null | string>(null);
  const userDefaultImage =
    'https://jtorewqfshytdtgldztv.supabase.co/storage/v1/object/public/profile_image/free-icon-user-747376.png?t=2024-07-22T05%3A29%3A24.993Z';

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userData) {
      setUser({
        id: me?.id ?? '',
        profile_image: userData.profile_image || userDefaultImage,
        email: me?.email ?? '',
        nickname: userData.nickname ?? '',
        github_url: userData.github_url ?? '',
        info: userData.info ?? ''
      });
    }
  }, [me, userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          [name]: value
        };
      }
      return prevUser;
    });
  };

  const handleLabelClick = (field: string) => {
    setShowInput((prevField) => (prevField === field ? null : field));
  };

  // 프로필 이미지 파일 변경 핸들러
  const handleProfileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      // 파일 업로드 처리 로직을 추가하세요
    }
  };

  // 프로필 이미지 클릭 핸들러
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 유저 정보 업데이트 함수
  const updateUser = async () => {
    if (user && me) {
      const userConfirmed = confirm('저장하시겠습니까?');
      if (!userConfirmed) return;

      const requestData = {
        userId: user.id,
        profile_image: user.profile_image || '',
        nickname: user.nickname || '',
        github_url: user.github_url || '',
        info: user.info || ''
      };

      console.log('Sending update request with data:', requestData);

      const response = await fetch('/api/profile/profileauth', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('User updated successfully');
      } else {
        console.error('Failed to update user:', result.error);
        alert('Failed to update user');
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <p>계정 관리</p>
      <p>서비스에서 사용하는 내 계정 정보를 관리할 수 있습니다.</p>
      <div onClick={handleImageClick}>
        <Image src={user?.profile_image || userDefaultImage} alt="Profile" width={200} height={200} priority />
        <input type="file" accept="image/*" onChange={handleProfileChange} ref={fileInputRef} />
      </div>
      <div className="flex items-center mb-4">
        <span className="mr-[90px]">이메일</span>
        <span>{user?.email}</span>
      </div>
      <EditableField
        label="닉네임"
        name="nickname"
        value={user?.nickname || ''}
        showInput={showInput}
        onChange={handleChange}
        onLabelClick={handleLabelClick}
      />
      <EditableField
        label="깃허브 링크"
        name="github_url"
        value={user?.github_url || ''}
        showInput={showInput}
        onChange={handleChange}
        onLabelClick={handleLabelClick}
      />
      <EditableField
        label="자기소개"
        name="info"
        value={user?.info || ''}
        showInput={showInput}
        onChange={handleChange}
        onLabelClick={handleLabelClick}
      />
      <button onClick={updateUser}>저장</button>
    </div>
  );
};

export default ProfileSetting;
