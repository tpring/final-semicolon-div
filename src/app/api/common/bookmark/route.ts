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

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  const supabase = createClient();

  if (!user_id) {
    return NextResponse.json({ isBookmarked: false });
  }

  const { data: bookmarks, error } = await supabase.from('forum_bookmarks').select('*').eq('user_id', user_id);

  if (error) return NextResponse.json({ bookmarks: [] });

  return NextResponse.json({ bookmarks: bookmarks.map((b) => b.post_id) });
};
