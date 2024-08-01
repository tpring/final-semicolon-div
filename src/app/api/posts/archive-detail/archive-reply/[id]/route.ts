import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const supabase = createClient();

  const { data: getReply } = await supabase.from('archive_reply').select('*, user:users(*)');

  const { count, error } = await supabase.from('archive_reply').select('*', { count: 'exact', head: true });

  return NextResponse.json({ getReply, count });
};

export const POST = async (request: Request) => {
  const supabase = createClient();
  const data = await request.json();
  const user_id = data.user_id as string;
  const comment_id = data.comment_id as string;
  const reply = data.reply as string;

  const { data: replyText } = await supabase.from('archive_reply').insert({ user_id, comment_id, reply });

  return NextResponse.json(replyText);
};

export const PATCH = async (request: Request) => {
  const supabase = createClient();
  const data = await request.json();
  const reply = data.replyRetouch as string;
  const id = data.id as string;
  const user = data.user_id as string;

  const { data: replyRetouch } = await supabase
    .from('archive_reply')
    .update({ reply })
    .eq('id', id)
    .eq('user_id', user);

  return NextResponse.json(replyRetouch);
};

export const DELETE = async (request: Request) => {
  const supabase = createClient();
  const data = await request.json();
  const id = data.id as string;
  const user = data.user_id as string;

  const { data: replyDelete } = await supabase.from('archive_reply').delete().eq('id', id).eq('user_id', user);
  return NextResponse.json(replyDelete);
};
