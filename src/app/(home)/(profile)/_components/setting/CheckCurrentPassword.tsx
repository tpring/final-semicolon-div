import React, { useEffect, useState } from 'react';
import ReverseExclamation from '@/assets/images/common/ReverseExclamation';
import X from '@/assets/images/common/X';
import { useAuth } from '@/context/auth.context';
import CircleX from '@/assets/images/common/CircleX';

type CheckCurrentPasswordProps = {
  onValidationChange: (message: string) => void;
};

const CheckCurrentPassword = ({ onValidationChange }: CheckCurrentPasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState<boolean>(true);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [isCapsLockOn, setIsCapsLockOn] = useState<boolean>(false);
  const { me } = useAuth();

  // 현재 비밀번호 확인 요청
  const handleValidatePassword = async (password: string) => {
    setIsValidating(true);

    try {
      const response = await fetch('/api/profile/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPassword: password, email: me?.email })
      });

      const result = await response.json();
      if (result.valid) {
        setIsCurrentPasswordValid(true);
        setValidationMessage('기존 비밀번호가 확인되었습니다.');
      } else {
        setIsCurrentPasswordValid(false);
        setValidationMessage('기존 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('error:', error);
      setIsCurrentPasswordValid(false);
      setValidationMessage('서버 오류가 발생했습니다.');
    } finally {
      setIsValidating(false);
    }
  };

  // 입력값이 변경될 때마다 유효성 검사 수행
  useEffect(() => {
    if (currentPassword.length > 0) {
      handleValidatePassword(currentPassword);
    } else {
      setIsCurrentPasswordValid(true);
      setValidationMessage('');
    }
    onValidationChange(validationMessage);
  }, [currentPassword, validationMessage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setIsCapsLockOn(event.getModifierState('CapsLock'));
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="h-[150px]">
      <p className="text-subtitle2 font-bold text-neutral-900 mb-1">기존 비밀번호</p>
      <div
        className={`relative flex items-center justify-between w-[421px] h-[56px] p-[16px] border rounded mb-2 ${currentPassword.length === 0 ? 'text-neutral-700 outline-neutral-400 border border-neutral-300' : isCurrentPasswordValid ? 'text-neutral-900 outline-main-400 border border-main-400' : 'text-red outline-red border border-red'}`}
      >
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-[370px] outline-transparent"
          placeholder="비밀번호를 입력해 주세요."
        />
        {currentPassword && (
          <button type="button" onClick={() => setCurrentPassword('')} className="absolute right-4 text-gray-600">
            <X />
          </button>
        )}
      </div>

      <div className="ml-1 my-2 flex items-center">
        <span>{isCapsLockOn ? <ReverseExclamation /> : <ReverseExclamation stroke="#423edf" />}</span>
        <span className={`ml-1 text-body2 font-regular ${isCapsLockOn ? 'text-red' : 'text-main-400'}`}>
          Caps Lock on
        </span>
      </div>

      {currentPassword.length > 3 && (
        <>
          <div className="flex items-center h-6">
            <span>{isCurrentPasswordValid ? <CircleX fill="#423EDF" /> : <CircleX fill="#f66161" />}</span>
            <span className={`text-body2 font-regular ${isCurrentPasswordValid ? 'text-main-400' : 'text-red'}`}>
              {validationMessage}
            </span>
          </div>
          {/* {isValidating && (
            <div className="flex items-center h-6 ">
              <p className="text-body2 font-regular text-gray-700">검증 중...</p>
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default CheckCurrentPassword;
