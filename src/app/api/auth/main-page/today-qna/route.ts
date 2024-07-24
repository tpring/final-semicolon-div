import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const { data: qnaPosts, error } = await supabase
    .from('qna_posts')
    .select('*,users: user_id(*)')
    .order('created_at', {
      ascending: false
    })
    .limit(8);

  return NextResponse.json(qnaPosts);
}
