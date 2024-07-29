'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const PostQnaButton = () => {
  const router = useRouter();

  const handleWriteButtonClick = () => {
    router.push('/posting');
  };
  return (
    <button onClick={handleWriteButtonClick} className="write-button">
      글쓰기
    </button>
  );
};

export default PostQnaButton;
