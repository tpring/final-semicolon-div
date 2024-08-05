'use client';

import { createClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const supabase = createClient();

const DeleteAccountButton = () => {
  const router = useRouter();

  const handleDeleteUser = async () => {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();

    if (error || !session) {
      console.error('Error getting session or no session found:', error);
      return;
    }

    const user = session.user;

    if (user) {
      const response = await fetch('/api/auth/delete', {
        method: 'POST',
        headers: {
          'Context-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.id })
      });

      if (response.ok) {
        toast.success('회원 탈퇴가 완료되었습니다.');
        await supabase.auth.signOut();
        router.push('/');
      } else {
        try {
          const error = await response.json();
          console.error('Error deleting user:', error.message);
        } catch (jsonError) {
          console.error('Failed to parse JSON response:', jsonError);
        }
      }
    }
  };

  return (
    <button onClick={handleDeleteUser} className=" p-2 rounded">
      Delete Account
    </button>
  );
};

export default DeleteAccountButton;
