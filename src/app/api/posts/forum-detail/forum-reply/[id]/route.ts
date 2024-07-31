import { createClient } from '@/supabase/client';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const supabase = createClient();

  const { data: reply } = await supabase.from('forum_reply').select('*, user:users(*)');

  const { count, error } = await supabase.from('forum_reply').select('*', { count: 'exact', head: true });

  return NextResponse.json({ reply, count });
};

export const POST = async (request: Request) => {
  const supabase = createClient();
  const data = await request.json();
  console.log(data);
  const user_id = data.userReply.user_id as string;
  const comment_id = data.userReply.comment_id as string;
  const reply = data.userReply.reply as string;

  const { data: replyText } = await supabase.from('forum_reply').insert({ user_id, comment_id, reply });

  return NextResponse.json(replyText);
};
