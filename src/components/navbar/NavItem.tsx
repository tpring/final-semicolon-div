import Link from 'next/link';
import { ReactNode } from 'react';

type NavItemProps = {
  icon: ReactNode;
  label: string;
  nav: string;
};

const NavItem = ({ icon, label, nav }: NavItemProps) => {
  return (
    <Link href={`${nav}`}>
      <div className="flex flex-col items-center">
        <div className="text-2xl">{icon}</div>
        <div className="text-xs">{label}</div>
      </div>
    </Link>
  );
};

export default NavItem;
