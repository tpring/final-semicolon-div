import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const supabase = createClient();

  const { data: bookmark } = await supabase
    .from('forum_bookmarks')
    .insert({ post_id: data.post_id, user_id: data.user_id })
    .select();

  return NextResponse.json(bookmark);
};

export const DELETE = async (request: NextRequest) => {
  const data = await request.json();
  const user_id = data.user_id as string;
  const post_id = data.post_id as string;
  const supabase = createClient();
  const bookmarkDelete = await supabase.from('forum_bookmarks').delete().eq('user_id', user_id).eq('post_id', post_id);

  return NextResponse.json(bookmarkDelete);
};
