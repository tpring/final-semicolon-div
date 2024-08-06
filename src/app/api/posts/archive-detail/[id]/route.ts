import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data, count } = await supabase
    .from('archive_posts')
    .select('*, user: users(*), comment: archive_comments(count) ')
    .eq('id', params.id);

  // return NextResponse.json(data);
  return { data: data, count: count };
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const data = await request.json();
  const user = data.id as string;

  const { data: postDelete } = await supabase.from('archive_posts').delete().eq('user_id', user).eq('id', params.id);
  return NextResponse.json(postDelete);
};
