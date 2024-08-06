import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

const getCommentCount = async (postId: string) => {
  const supabase = createClient();
  const { count, error } = await supabase
    .from('archive_comments')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);
  if (error) {
    return 0;
  }
  return count;
};

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('archive_posts').select(`*,user:users(*)`).eq('id', params.id);
  if (error) {
    console.error('error', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const commentCount = await getCommentCount(params.id);

  const responseData = { ...data, commentCount };
  return NextResponse.json(responseData);
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const data = await request.json();
  const user = data.id as string;

  const { data: postDelete } = await supabase.from('archive_posts').delete().eq('user_id', user).eq('id', params.id);
  return NextResponse.json(postDelete);
};
