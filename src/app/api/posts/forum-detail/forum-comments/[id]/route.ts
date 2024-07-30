import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data } = await supabase.from('forum_comments').select('*, user: users(*)').eq('post_id', params.id);

  return NextResponse.json(data);
};

export const POST = async (request: Request) => {
  const data = await request.json();
  const comment = data.comments.comment as string;
  const user_id = data.comments.user_id as string;
  const post_id = data.comments.post_id as string;
  const supabase = createClient();

  const { data: comments } = await supabase.from('forum_comments').insert({ comment, user_id, post_id });

  return NextResponse.json(comments);
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const data = await request.json();
  const comment = data.comments.comment as string;
  const user_id = data.comments.user_id as string;
  const post_id = data.comments.post_id as string;

  const { data: Retouch } = await supabase
    .from('forum_comments')
    .update({ comment })
    .eq('post_id', post_id)
    .eq('user_id', user_id);
};
