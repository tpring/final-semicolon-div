'use client';

import Link from 'next/link';
import SearchButton from '../common/SearchButton';
import Logo from '../common/Logo';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href={'/'}>
            <Logo />
          </Link>
          <div className="flex space-x-4">
            <Link href={'/'}>
              <h1>홈</h1>
            </Link>
            <Link href={'/conference'}>
              <h1>컨퍼런스</h1>
            </Link>
            <Link href={'/qna'}>
              <h1>Q&A</h1>
            </Link>
            <Link href={'/archiving'}>
              <h1>아카이브</h1>
            </Link>
            <Link href={'/notification'}>
              <h1 className="hidden sm:inline">공지</h1>
            </Link>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <Link href={'/search'}>
            <SearchButton />
          </Link>
          <Link href={'/signin'}>
            <h1>로그인</h1>
          </Link>
          <Link href={'/signup'}>
            <h1>회원가입</h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
