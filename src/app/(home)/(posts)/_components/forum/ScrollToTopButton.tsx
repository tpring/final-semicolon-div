'use client';

import GoToTop from '@/assets/images/common/GoToTop';
import GoToTopHover from '@/assets/images/common/GoToTopHover';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);
  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`fixed bottom-4 right-20 transition-transform duration-500 ease-in-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          {isHovered ? <GoToTopHover /> : <GoToTop />}
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
