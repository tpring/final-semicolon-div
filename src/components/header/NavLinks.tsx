import { NavLinksProps } from '@/types/header/headerTypes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = ({ getLinkClasses }: NavLinksProps) => {
  const pathname = usePathname();
  return (
    <div className="flex space-x-8 mt-10">
      <Link href={'/'}>
        <h1 className={`border-0 rounded-md p-2 font-bold ${getLinkClasses('/')}`}>메인</h1>
      </Link>
      <Link href={'/forum'}>
        <h1 className={`border-0 rounded-md p-2 font-bold ${getLinkClasses('/forum')}`}>포럼</h1>
      </Link>
      <Link href={'/qna'}>
        <h1 className={`border-0 rounded-md p-2 font-bold ${getLinkClasses('/qna')}`}>Q&A</h1>
      </Link>
      <Link href={'/archiving'}>
        <h1 className={`border-0 rounded-md p-2 font-bold ${getLinkClasses('/archive')}`}>아카이브</h1>
      </Link>
    </div>
  );
};

export default NavLinks;
