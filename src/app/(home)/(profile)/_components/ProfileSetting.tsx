'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/auth.context';
import NicknameModal from './setting/NicknameModal';
import GithubUrlModal from './setting/GithubUrlModal';
import InfoModal from './setting/InfoModal';
import Image from 'next/image';
import { upDateImage, uploadImage } from '@/utils/imageUpload';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@/assets/images/common/EditIcon';

const ProfileSetting = () => {
  const { userData, me, updateUserData } = useAuth();
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [info, setInfo] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [isNicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [isGithubUrlModalOpen, setGithubUrlModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const newProfileRef = useRef<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userData) {
      setNickname(userData.nickname || '');
      setProfileImage(userData.profile_image || '');
      setInfo(userData.info || '');
      setGithubUrl(userData.github_url || '');
    }
  }, [userData]);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !me?.id) return;

    newProfileRef.current = file;

    const userId = me.id;
    const defaultProfileImage =
      'https://jtorewqfshytdtgldztv.supabase.co/storage/v1/object/public/profile_images/default_profile_image.png';

    const oldPath = profileImage.split('/').slice(-1)[0];
    const filePath = `${userId}_${Date.now()}.png`;

    let publicUrl: string | null = null;

    try {
      if (profileImage === defaultProfileImage) {
        publicUrl = await uploadImage(file as File, filePath);
      } else {
        publicUrl = await upDateImage(file as File, filePath, oldPath);
      }

      if (publicUrl) {
        await updateProfile({ profile_image: publicUrl });
        setProfileImage(publicUrl);
        updateUserData({ profile_image: publicUrl });
      } else {
        toast.error('이미지 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', (error as Error).message);
    }
  };

  const handleNicknameUpdate = async (newNickname: string) => {
    setNickname(newNickname);
    await updateProfile({ nickname: newNickname });
    updateUserData({ nickname: newNickname });
  };

  const handleGithubUrlUpdate = async (newGithubUrl: string) => {
    setGithubUrl(newGithubUrl);
    await updateProfile({ github_url: newGithubUrl });
    updateUserData({ github_url: newGithubUrl });
  };

  const handleInfoUpdate = async (newInfo: string) => {
    setInfo(newInfo);
    await updateProfile({ info: newInfo });
    updateUserData({ info: newInfo });
  };

  const updateProfile = async (
    updates: Partial<{ nickname: string; profile_image: string; info: string; github_url: string }>
  ) => {
    if (!me) return;

    const response = await fetch('/api/profile/profileauth', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: me.id,
        ...updates
      })
    });

    if (response.ok) {
      toast.success('프로필이 성공적으로 수정되었습니다.');
    } else {
      toast.error('프로필이 성공 실패했습니다.');
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className=" flex flex-col justify-center items-center p-6 border border-sub-200 rounded-lg">
      <ToastContainer />
      <div className="w-[588px]">
        <div className="mb-4 flex flex-col justify-center items-center">
          <div
            className="relative w-32 h-32 border border-[#ccc] rounded-full overflow-hidden bg-[#fdfbfb] flex items-center justify-center cursor-pointer"
            onClick={handleImageClick}
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                fill
                priority
                className="rounded-full object-cover"
                sizes="120px"
              />
            ) : (
              <div></div>
            )}
            <input type="file" className="hidden" ref={inputRef} onChange={handleImageUpload} accept=".png" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 rounded-full">
              <span className="text-white text-title">+</span>
            </div>
          </div>
          <div className="relative">
            <div
              onClick={handleImageClick}
              className="absolute cursor-pointer border border-sub-100 rounded-full right-[-75px] top-[-50px]"
            >
              <EditIcon />
            </div>
          </div>
          <p className="text-neutral-900 text-h4 font-bold p-[24px_0_24px_0]">{nickname}님, 좋은 하루 보내세요!</p>
        </div>
        <div className="flex justify-between p-[24px_0_24px_0]">
          <span className="text-neutral-900 text-subtitle1 font-medium">이메일</span>
          <span className="text-neutral-700 text-body1 font-regular">{me?.email}</span>
        </div>
        <div className="flex justify-between p-[24px_0_24px_0]">
          <span className="text-neutral-900 text-subtitle1 font-medium">닉네임</span>
          <span className="text-neutral-700 text-body1 font-regular" onClick={() => setNicknameModalOpen(true)}>
            {nickname} ›
          </span>
          <NicknameModal
            isOpen={isNicknameModalOpen}
            onClose={() => setNicknameModalOpen(false)}
            currentNickname={nickname}
            onNicknameUpdate={handleNicknameUpdate}
          />
        </div>
        <div className="flex justify-between p-[24px_0_24px_0]">
          <span className="text-neutral-900 text-subtitle1 font-medium">깃허브 링크 주소</span>
          <span className="text-neutral-700 text-body1 font-regular" onClick={() => setGithubUrlModalOpen(true)}>
            {githubUrl} ›
          </span>
          <GithubUrlModal
            isOpen={isGithubUrlModalOpen}
            onClose={() => setGithubUrlModalOpen(false)}
            currentGithubUrl={githubUrl}
            onGithubUrlUpdate={handleGithubUrlUpdate}
          />
        </div>
        <div onClick={() => setInfoModalOpen(true)} className="flex justify-between p-[24px_0_24px_0]">
          <span className="text-neutral-900 text-subtitle1 font-medium">자기소개</span>
          <span>›</span>
        </div>
        <p className="text-neutral-700 text-body1 font-regular line-clamp-5 whitespace-pre-wrap">{info}</p>
        <InfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setInfoModalOpen(false)}
          currentInfo={info}
          onInfoUpdate={handleInfoUpdate}
        />
      </div>
    </div>
  );
};

export default ProfileSetting;
