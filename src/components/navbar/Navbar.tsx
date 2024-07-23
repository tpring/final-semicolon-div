import Link from 'next/link';
import NavItem from './NavItem';
import { FaHome } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="bg-white max-w-[1920px] min-w-[375px] bottom-0 fixed grid grid-cols-5 items-center p-2 shadow-md lg:hidden w-full">
      <NavItem icon={<FaHome />} label="홈" nav="/" />
      <NavItem icon={<FaHome />} label="포럼" nav="/conference" />
      <NavItem icon={<FaHome />} label="Q&A" nav="/qna" />
      <NavItem icon={<FaHome />} label="아카이브" nav="/archiving" />
      <NavItem icon={<FaHome />} label="공지" nav="/notification" />
    </div>
  );
};

export default Navbar;
