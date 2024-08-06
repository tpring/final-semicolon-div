'use client';
import React, { useEffect } from 'react';

type CheckboxGroupProps = {
  agreeAll: boolean;
  setAgreeAll: (value: boolean) => void;
  agreeTerms: boolean;
  setAgreeTerms: (value: boolean) => void;
  agreePrivacy: boolean;
  setAgreePrivacy: (value: boolean) => void;
};

const CheckboxGroup = ({
  agreeAll,
  setAgreeAll,
  agreeTerms,
  setAgreeTerms,
  agreePrivacy,
  setAgreePrivacy
}: CheckboxGroupProps) => {
  const handleAgreeAllChange = (checked: boolean) => {
    setAgreeAll(checked);
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
  };

  const handleIndividualChange = (type: string, checked: boolean) => {
    if (type === 'terms') {
      setAgreeTerms(checked);
    } else if (type === 'privacy') {
      setAgreePrivacy(checked);
    }

    if (agreeTerms && agreePrivacy && !checked) {
      setAgreeAll(false);
    } else if (checked && agreeTerms && type === 'privacy') {
      setAgreeAll(true);
    } else if (checked && agreePrivacy && type === 'terms') {
      setAgreeAll(true);
    }
  };

  useEffect(() => {
    if (agreeTerms && agreePrivacy) {
      setAgreeAll(true);
    }
  }, [agreeTerms, agreePrivacy, setAgreeAll]);

  //약관 클릭 시 새로운 창으로 보여주기
  const handleLabelClick = (url: string, e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    window.open(url, '_blank');
  };

  return (
    <div className="mb-4 ml-4">
      <div className="flex items-center mb-4">
        <input
          id="agreeAll"
          type="checkbox"
          checked={agreeAll}
          onChange={(e) => handleAgreeAllChange(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="agreeAll" className="text-sm text-gray-600">
          모두 확인하였으며 동의합니다.
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          id="agreeTerms"
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => handleIndividualChange('terms', e.target.checked)}
          className="mr-2"
        />
        <label
          htmlFor="agreeTerms"
          className="text-sm text-gray-600"
          onClick={(e) => handleLabelClick('/legal/terms', e)}
        >
          활용 서비스 이용약관 (필수)
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          id="agreePrivacy"
          type="checkbox"
          checked={agreePrivacy}
          onChange={(e) => handleIndividualChange('privacy', e.target.checked)}
          className="mr-2"
        />
        <label
          htmlFor="agreePrivacy"
          className="text-sm text-gray-600"
          onClick={(e) => handleLabelClick('/legal/privacy', e)}
        >
          개인정보수집 및 이용동의 (필수)
        </label>
      </div>
    </div>
  );
};

export default CheckboxGroup;
