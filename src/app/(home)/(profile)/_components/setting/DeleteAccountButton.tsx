'use client';

import { useAuth } from '@/context/auth.context';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const DeleteAccountButton = () => {
  const { deleteUser } = useAuth();
  const router = useRouter();

  const handleDeleteUser = async () => {
    const { status, message } = await deleteUser();

    if (status === 200) {
      toast.success(message);
      router.push('/');
    } else {
      toast.error(message);
    }
  };

  return (
    <button onClick={handleDeleteUser} className="text-subtitle1 font-medium mt-6 hover:underline decoration-2 ">
      회원탈퇴
    </button>
  );
};

export default DeleteAccountButton;
