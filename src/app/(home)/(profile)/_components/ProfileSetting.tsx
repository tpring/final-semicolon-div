'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import EditableField from './setting/EditableField';

// 임시 User 타입
type User = {
  id: string;
  profile_image: string;
  email: string;
  nickname: string;
  github_url: string;
  info: string;
  like: string;
  bookmark: string;
};

const ProfileSetting = () => {
  const [user, setUser] = useState<User>({
    id: '618962ac-e431-4ccd-9ca1-dc916435f8da',
    profile_image:
      'https://jtorewqfshytdtgldztv.supabase.co/storage/v1/object/sign/profile_image/18_20240511012529.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlX2ltYWdlLzE4XzIwMjQwNTExMDEyNTI5LnBuZyIsImlhdCI6MTcyMTYyNTQ3NiwiZXhwIjoyMDM2OTg1NDc2fQ.nKa_eNvxhs2qasseDYM8pO6mUZKPfrbnQr0TPBiSUPs',
    email: 'admin@admin.com',
    nickname: 'admin',
    github_url: 'https://github.com/',
    info: 'Short info about the user.',
    like: '10',
    bookmark: '30'
  });

  const [showInput, setShowInput] = useState<null | string>(null);
  const userDefaultImage =
    'https://jtorewqfshytdtgldztv.supabase.co/storage/v1/object/public/profile_image/free-icon-user-747376.png?t=2024-07-22T05%3A29%3A24.993Z';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleLabelClick = (field: string) => {
    setShowInput((prevField) => (prevField === field ? null : field));
  };

  // 프로필 이미지 파일 변경 핸들러
  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
    }
  };

  // 프로필 이미지 클릭 핸들러
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <p>계정 관리</p>
      <p>서비스에서 사용하는 내 계정 정보를 관리할 수 있습니다.</p>
      <div onClick={handleImageClick}>
        <Image src={user.profile_image || userDefaultImage} alt="Profile" width={200} height={200} priority />
        <input type="file" accept="image/*" onChange={handleProfileChange} ref={fileInputRef} />
      </div>
      <div className="flex items-center mb-4">
        <span className="mr-[90px]">이메일</span>
        <span>{user.email}</span>
      </div>
      <EditableField
        label="닉네임"
        name="nickname"
        value={user.nickname}
        showInput={showInput}
        onChange={handleChange}
        onLabelClick={handleLabelClick}
      />
      <EditableField
        label="깃허브 링크"
        name="github_url"
        value={user.github_url}
        showInput={showInput}
        onChange={handleChange}
        onLabelClick={handleLabelClick}
      />
      <EditableField
        label="자기소개"
        name="info"
        value={user.info}
        showInput={showInput}
        onChange={handleChange}
        onLabelClick={handleLabelClick}
      />
      //임시
      <button>회원탈퇴</button>
    </div>
  );
};

export default ProfileSetting;
