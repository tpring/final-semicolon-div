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
import Right from '@/assets/images/common/Right';
import PasswordModal from './setting/PasswordModal';
import OAuthLoginStatus from '../../(auth)/_components/OAuthLoginStatus';

const ProfileSetting = () => {
  const { userData, me, updateUserData } = useAuth();
  const [profileImage, setProfileImage] = useState<string>('');
  const [githubUrl, setGithubUrl] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [info, setInfo] = useState<string>('');
  const [isPasswordModalOpen, setPasswordModalOpen] = useState<boolean>(false);
  const [isGithubUrlModalOpen, setGithubUrlModalOpen] = useState<boolean>(false);
  const [isNicknameModalOpen, setNicknameModalOpen] = useState<boolean>(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState<boolean>(false);
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

  const handleImageClick = () => inputRef.current?.click();

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !me?.id) return;

    newProfileRef.current = file;

    const userId = me.id;
    const defaultProfileImage =
      'https://jtorewqfshytdtgldztv.supabase.co/storage/v1/object/public/profile_images/default_profile_image.png';
    const oldPath = profileImage.split('/').slice(-1)[0];
    const filePath = `${userId}_${Date.now()}.png`;

    try {
      const publicUrl =
        profileImage === defaultProfileImage
          ? await uploadImage(file, filePath)
          : await upDateImage(file, filePath, oldPath);

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

  const handleGithubUrlUpdate = async (newGithubUrl: string) => {
    setGithubUrl(newGithubUrl);
    await updateProfile({ github_url: newGithubUrl });
    updateUserData({ github_url: newGithubUrl });
  };
  const handleNicknameUpdate = async (newNickname: string) => {
    setNickname(newNickname);
    await updateProfile({ nickname: newNickname });
    updateUserData({ nickname: newNickname });
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

    try {
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
        toast.error('프로필 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('프로필 업데이트 실패:', (error as Error).message);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <p className="text-h5 font-bold text-neutral-900 mb-[8px]">프로필 관리</p>
      <p className="text-body1 font-regular text-neutral-600 mb-[36px]">
        서비스에서 사용하는 내 계정 정보를 관리할 수 있습니다.
      </p>
      <div className="center-alignment p-[20px_80px] border border-neutral-50 rounded-3xl shadow-custom-light">
        <div className="w-[588px]">
          <div className="mb-4 center-alignment">
            <div
              className="relative w-32 h-32 border border-neutral-50 rounded-full overflow-hidden bg-white cursor-pointer"
              onClick={handleImageClick}
            >
              {profileImage && (
                <Image
                  src={profileImage}
                  alt="Profile"
                  fill
                  priority
                  className="rounded-full object-cover"
                  sizes="120px"
                />
              )}
              <input type="file" className="hidden" ref={inputRef} onChange={handleImageUpload} accept=".png" />
              <div className="absolute inset-0 center-alignment opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-30 rounded-full">
                <span className="text-white text-title">+</span>
              </div>
            </div>
            <div className="relative">
              <div
                onClick={handleImageClick}
                className="absolute cursor-pointer border border-sub-50 rounded-full right-[-75px] top-[-50px]"
              >
                <EditIcon />
              </div>
            </div>
            <p className="text-neutral-900 text-h4 font-bold p-[24px_0_24px_0]">{nickname}님, 좋은 하루 보내세요!</p>
          </div>
          <div className="flex justify-between p-[16px_0]">
            <span className="text-neutral-900 text-subtitle1 font-medium">이메일</span>
            <span className="text-neutral-700 text-body1 font-regular">{me?.email}</span>
          </div>
          <p className="border-b border-neutral-50 " />
          <OAuthLoginStatus />
          <p className="border-b border-neutral-50 " />
          <div className="flex justify-between p-[16px_0]">
            <span className="text-neutral-900 text-subtitle1 font-medium">깃허브 링크</span>
            {githubUrl ? (
              <div className="flex">
                <span className="text-neutral-800 text-body1 font-regular">{githubUrl}</span>
                <div className="mt-[5px] ml-3 cursor-pointer" onClick={() => setGithubUrlModalOpen(true)}>
                  <Right width={10} height={18} />
                </div>
              </div>
            ) : (
              <div className="flex">
                <span className="text-neutral-800 text-body1 font-regular ">추가하기</span>
                <div className="mt-[5px] ml-3 cursor-pointer" onClick={() => setGithubUrlModalOpen(true)}>
                  <Right width={10} height={18} />
                </div>
              </div>
            )}
          </div>
          <p className="border-b border-neutral-50 " />
          <div className="flex justify-between p-[16px_0]">
            <span className="text-neutral-900 text-subtitle1 font-medium">닉네임</span>
            <div className="flex">
              <span className="text-neutral-800 text-body1 font-regular">{nickname}</span>
              <div className="mt-[5px] ml-3 cursor-pointer" onClick={() => setNicknameModalOpen(true)}>
                <Right width={10} height={18} />
              </div>
            </div>
          </div>
          <p className="border-b border-neutral-50 " />
          <div className="flex justify-between p-[16px_0]">
            <span className="text-neutral-900 text-subtitle1 font-medium">비밀번호</span>
            <div className="flex">
              <span className="text-neutral-800 text-body1 font-regular">변경하기</span>
              <div className="mt-[5px] ml-3 cursor-pointer" onClick={() => setPasswordModalOpen(true)}>
                <Right width={10} height={18} />
              </div>
            </div>
          </div>
          <p className="border-b border-neutral-50 " />
          <div onClick={() => setInfoModalOpen(true)} className="flex justify-between p-[16px_0]">
            <span className="text-neutral-900 text-subtitle1 font-medium">자기소개</span>
            <div className="mt-[5px] cursor-pointer">
              <Right width={10} height={18} />
            </div>
          </div>
          <p className="text-neutral-700 h-[143px] text-body1 font-regular line-clamp-5 whitespace-pre-wrap">{info}</p>
        </div>
      </div>

      <GithubUrlModal
        isOpen={isGithubUrlModalOpen}
        onClose={() => setGithubUrlModalOpen(false)}
        currentGithubUrl={githubUrl}
        onGithubUrlUpdate={handleGithubUrlUpdate}
      />
      <PasswordModal isOpen={isPasswordModalOpen} onClose={() => setPasswordModalOpen(false)} />
      <NicknameModal
        isOpen={isNicknameModalOpen}
        onClose={() => setNicknameModalOpen(false)}
        currentNickname={nickname}
        onNicknameUpdate={handleNicknameUpdate}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        currentInfo={info}
        onInfoUpdate={handleInfoUpdate}
      />
      <ToastContainer />
    </div>
  );
};

export default ProfileSetting;
