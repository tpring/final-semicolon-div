import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data } = await supabase
    .from('forum_posts')
    .select('*, user: users(*), comment:forum_comments(count), tags:forum_tags(*) ')
    .eq('id', params.id);

  return NextResponse.json(data);
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const data = await request.json();
  const user = data.id as string;

  const { data: postDelete } = await supabase.from('forum_posts').delete().eq('user_id', user).eq('id', params.id);

  return NextResponse.json(postDelete);
};
