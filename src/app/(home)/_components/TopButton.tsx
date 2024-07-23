'use client';

import { useEffect, useState } from 'react';

const TopButton = () => {
  const [topScroll, setTopScroll] = useState(false);

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
      {topScroll ? (
        <button type="button" onClick={MoveTop} className=" border py-2 px-4 rounded-xl  ">
          TOP
        </button>
      ) : null}
    </div>
  );
};

export default TopButton;
