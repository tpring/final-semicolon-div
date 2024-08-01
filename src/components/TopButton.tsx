'use client';

import UpButton from '@/assets/images/common/UpButton';
import { useEffect, useState } from 'react';

const TopButton = () => {
  const [topScroll, setTopScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setTopScroll(true);
      } else {
        setTopScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const MoveTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className=" fixed right-16 bottom-5">
      {topScroll && (
        <button type="button" onClick={MoveTop} className=" py-2 px-4  ">
          <UpButton />
        </button>
      )}
    </div>
  );
};

export default TopButton;
