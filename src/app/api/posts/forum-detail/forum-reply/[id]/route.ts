import { createClient } from '@/supabase/client';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const supabase = createClient();

  const { data: reply } = await supabase.from('forum_reply').select('*, user: users(*)');

  return NextResponse.json(reply);
};
