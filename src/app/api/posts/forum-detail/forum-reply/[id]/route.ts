import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const supabase = createClient();

  const { data: getReply } = await supabase.from('forum_reply').select('*, user:users(*)');

  const { count, error } = await supabase.from('forum_reply').select('*', { count: 'exact', head: true });

  return NextResponse.json({ getReply, count });
};

export const POST = async (request: Request) => {
  const supabase = createClient();
  const data = await request.json();
  console.log(data);
  const user_id = data.user_id as string;
  const comment_id = data.comment_id as string;
  const reply = data.reply as string;

  const { data: replyText } = await supabase.from('forum_reply').insert({ user_id, comment_id, reply });

  return NextResponse.json(replyText);
};
