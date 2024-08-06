'use client';

import { useAuth } from '@/context/auth.context';
import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const supabase = createClient();

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
    <button onClick={handleDeleteUser} className="p-2 rounded">
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
