'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/supabase/client';
import { usePathname } from 'next/navigation';

type AtherUser = {
  profileImage: string;
  nickname: string | null;
  email: string;
  githubUrl: string | null;
  info: string | null;
};

const AtherProfile = () => {
  const [atherUser, setAtherUser] = useState<AtherUser | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const profileId = pathname?.split('/')[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('users').select('*').eq('id', profileId).single();

        if (error) throw error;

        // 타입 변환
        const AtherUserData: AtherUser = {
          profileImage: data.profile_image,
          nickname: data.nickname,
          email: data.email,
          githubUrl: data.github_url,
          info: data.info
        };

        setAtherUser(AtherUserData);
      } catch (error) {
        console.error('error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [profileId]);

  if (loading) return <p>Loading...</p>;
  if (!atherUser) return <p>유저 정보를 찾기 못했습니다.</p>;

  return (
    <div>
      <p className="text-h5 font-bold text-neutral-900 mb-[8px]">프로필</p>
      <div className="center-alignment p-[20px_80px] border border-neutral-50 rounded-lg shadow-custom-light">
        <div className="w-[588px]">
          <div className="mb-4 center-alignment">
            <div className="relative w-32 h-32 border border-neutral-50 rounded-full overflow-hidden bg-white cursor-pointer">
              <Image
                src={atherUser.profileImage || '/default-profile.png'}
                alt="Profile"
                fill
                priority
                className="rounded-full object-cover"
                sizes="120px"
              />
            </div>
            <p className="text-neutral-900 text-h4 font-bold p-[24px_0_24px_0]">
              {atherUser.nickname || '익명'}님, 좋은 하루 보내세요!
            </p>
          </div>
          <div className="flex justify-between p-[16px_0]">
            <span className="text-neutral-900 text-subtitle1 font-medium">이메일</span>
            <span className="text-neutral-700 text-body1 font-regular">{atherUser.email}</span>
          </div>
          <p className="border-b border-neutral-50" />
          <div className="flex justify-between p-[16px_0]">
            <span className="text-neutral-900 text-subtitle1 font-medium">닉네임</span>
            <div className="flex">
              <span className="text-neutral-800 text-body1 font-regular">{atherUser.nickname || '미설정'}</span>
            </div>
          </div>
          <p className="border-b border-neutral-50" />
          <div className="flex justify-between p-[16px_0]">
            <span className="text-neutral-900 text-subtitle1 font-medium">깃허브 링크</span>
            {atherUser.githubUrl ? (
              <div className="flex">
                <a href={atherUser.githubUrl} className="text-blue-500 my-6">
                  연결됨
                </a>
              </div>
            ) : (
              <div className="flex">
                <span className="text-neutral-800 text-body1 font-regular">미연동</span>
              </div>
            )}
          </div>
          <p className="border-b border-neutral-50" />
          <div className="flex justify-between p-[16px_0]">
            <span className="text-neutral-900 text-subtitle1 font-medium">자기소개</span>
          </div>
          <p className="text-neutral-700 h-[143px] text-body1 font-regular line-clamp-5 whitespace-pre-wrap">
            {atherUser.info || '자기소개가 없습니다.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AtherProfile;
