import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  console.log(params);

  const supabase = createClient();
  const { data } = await supabase.from('archive_comments').select('*, user: users(*)').eq('post_id', params.id);
  const { count, error } = await supabase.from('archive_comments').select('*', { count: 'exact', head: true });

  return NextResponse.json({ data, count });
};

export const POST = async (request: Request) => {
  const supabase = createClient();
  const data = await request.json();
  const comment = data.userComment.comment as string;
  const user_id = data.userComment.user_id as string;
  const post_id = data.userComment.post_id as string;

  const { data: comments } = await supabase.from('archive_comments').insert({ comment, user_id, post_id });

  return NextResponse.json(comments);
};

export const PATCH = async (request: Request) => {
  const supabase = createClient();
  const data = await request.json();
  const comment = data.mdEditorChange as string;
  const user_id = data.user_id as string;
  const id = data.id as string;

  const { data: Retouch } = await supabase
    .from('archive_comments')
    .update({ comment })
    .eq('id', id)
    .eq('user_id', user_id);

  return NextResponse.json(Retouch);
};

export const DELETE = async (request: Request) => {
  const supabase = createClient();
  const data = await request.json();
  const comment_id = data.id as string;
  const user_id = data.user_id as string;

  const { data: commentDelete } = await supabase
    .from('archive_comments')
    .delete()
    .eq('user_id', user_id)
    .eq('id', comment_id);

  return NextResponse.json(commentDelete);
};
