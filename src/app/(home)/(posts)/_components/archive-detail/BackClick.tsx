'use client';
import BackArrowIcon from '@/assets/images/upsert_image/BackArrowIcon';
import { useRouter } from 'next/navigation';
import React from 'react';

const BackClick = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
      <button onClick={handleBackClick} className="mb-4 px-4 py-2 text-white rounded-md w-16">
        <BackArrowIcon />
      </button>
    </div>
  );
};

export default BackClick;
