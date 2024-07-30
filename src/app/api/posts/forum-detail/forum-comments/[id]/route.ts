import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data } = await supabase.from('forum_comments').select('*, user: users(*)').eq('post_id', params.id);

  return NextResponse.json(data);
};
