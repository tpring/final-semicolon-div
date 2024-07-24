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

  return (
    <div className="mb-4">
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={agreeAll}
          onChange={(e) => handleAgreeAllChange(e.target.checked)}
          className="mr-2"
        />
        <label className="text-sm text-gray-600">모두 확인하였으며 동의합니다.</label>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => handleIndividualChange('terms', e.target.checked)}
          className="mr-2"
        />
        <label className="text-sm text-gray-600">활용 서비스 이용약관 (필수)</label>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={agreePrivacy}
          onChange={(e) => handleIndividualChange('privacy', e.target.checked)}
          className="mr-2"
        />
        <label className="text-sm text-gray-600">개인정보수집 및 이용동의 (필수)</label>
      </div>
    </div>
  );
};

export default CheckboxGroup;
