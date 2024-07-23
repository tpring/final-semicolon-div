import Link from 'next/link';

const NavItem = ({ icon, label, nav }) => {
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
