import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const supabase = createClient();

  // URL에서 쿼리 파라미터 가져오기
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '5', 10);
  const commentId = url.searchParams.get('comment_id');

  if (!commentId) {
    return NextResponse.json({ error: 'comment_id is required' }, { status: 400 });
  }

  // 오프셋 계산
  const offset = (page - 1) * limit;

  // 대댓글 가져오기 (페이지네이션)
  const { data: getReply, error } = await supabase
    .from('archive_reply')
    .select('*, user:users(*)')
    .eq('comment_id', commentId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  // 전체 대댓글 수 가져오기
  const { count, error: countError } = await supabase
    .from('archive_reply')
    .select('*', { count: 'exact', head: true })
    .eq('comment_id', commentId);

  if (error || countError) {
    return NextResponse.json({ error: error?.message || countError?.message }, { status: 500 });
  }

  return NextResponse.json({ getReply, count });
};

export const POST = async (request: Request) => {
  const supabase = createClient();
  const data = await request.json();
  const user_id = data.user_id as string;
  const comment_id = data.comment_id as string;
  const reply = data.reply as string;

  if (!comment_id) {
    return NextResponse.json({ error: 'comment_id is required' }, { status: 400 });
  }

  const { data: replyText, error } = await supabase.from('archive_reply').insert({ user_id, comment_id, reply });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(replyText);
};

export const PATCH = async (request: Request) => {
  const supabase = createClient();
  const data = await request.json();
  const reply = data.replyRetouch as string;
  const id = data.id as string;
  const user = data.user_id as string;
  const comment_id = data.comment_id as string;

  if (!comment_id) {
    return NextResponse.json({ error: 'comment_id is required' }, { status: 400 });
  }

  const { data: replyRetouch, error } = await supabase
    .from('archive_reply')
    .update({ reply })
    .eq('id', id)
    .eq('user_id', user)
    .eq('comment_id', comment_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(replyRetouch);
};

export const DELETE = async (request: Request) => {
  const supabase = createClient();
  const data = await request.json();
  const id = data.id as string;
  const user = data.user_id as string;

  const { data: replyDelete, error } = await supabase.from('archive_reply').delete().eq('id', id).eq('user_id', user);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(replyDelete);
};
