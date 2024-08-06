import React, { useEffect, useState } from 'react';
import ReverseExclamation from '@/assets/images/common/ReverseExclamation';
import X from '@/assets/images/common/X';
import { useAuth } from '@/context/auth.context';

type CheckCurrentPasswordProps = {
  onValidationChange: (message: string) => void;
};

const CheckCurrentPassword = ({ onValidationChange }: CheckCurrentPasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState<boolean>(true);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string>('');
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
        setValidationMessage('현재 비밀번호가 확인되었습니다.');
      } else {
        setIsCurrentPasswordValid(false);
        setValidationMessage('현재 비밀번호가 올바르지 않습니다.');
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

  return (
    <div className="h-[150px]">
      <p className="text-subtitle2 font-bold text-neutral-900 mb-1">기존 비밀번호</p>
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="block w-[421px] h-[56px] p-[16px] border rounded mb-2"
        placeholder="비밀번호를 입력해 주세요."
      />
      {currentPassword.length > 0 && (
        <>
          <div className="flex items-center h-6">
            <p className="mr-2">
              {isCurrentPasswordValid ? <ReverseExclamation stroke="#423EDF" /> : <ReverseExclamation />}
            </p>
            <p className={`text-body2 font-regular ${isCurrentPasswordValid ? 'text-main-400' : 'text-red'}`}>
              {validationMessage}
            </p>
          </div>
          {isValidating && (
            <div className="flex items-center h-6 ">
              <p className="mr-2 w-4 h-4 center-alignment border bg-neutral-300 rounded-full ">
                <X width={7} height={7} stroke="#FFFFFF" />
              </p>
              <p className="text-body2 font-regular text-gray-700">검증 중...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CheckCurrentPassword;
