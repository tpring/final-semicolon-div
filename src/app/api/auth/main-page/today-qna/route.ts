import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

<<<<<<< HEAD
export async function GET() {
  const supabase = createClient();

  const { data: qnaPosts, error } = await supabase
    .from('qna_posts')
    .select('*,users: user_id(*)')
=======
export const GET = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('qna_posts')
    .select('*')
>>>>>>> 48d452041d997f4df3543820bc9346ed7936e1dd
    .order('created_at', {
      ascending: false
    })
    .limit(8);
<<<<<<< HEAD

  return NextResponse.json(qnaPosts);
}
=======
  if (!data) {
    return NextResponse.json([]);
  }
  return NextResponse.json(data);
};
>>>>>>> 48d452041d997f4df3543820bc9346ed7936e1dd
