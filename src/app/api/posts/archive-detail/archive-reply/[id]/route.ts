import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const urlSearchParams = request.nextUrl.searchParams;
  const page = urlSearchParams.get('page') ? Number(urlSearchParams.get('page')) : 0;

  const { data: reply } = await supabase
    .from('archive_reply')
    .select('*, user:users(*)')
    .eq('comment_id', params.id)
    .order('created_at', { ascending: false })
    .range(page * 5, (page + 1) * 5 - 1);

  const { count, error } = await supabase
    .from('archive_reply')
    .select('*', { count: 'exact', head: true })
    .eq('comment_id', params.id);

  return NextResponse.json({ reply, count });
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
