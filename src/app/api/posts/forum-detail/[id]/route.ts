import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data } = await supabase
    .from('forum_posts')
    .select(
      '*, user: users(*), bookmark: forum_bookmarks(count), likes: forum_likes(count), comment:forum_comments(count) '
    )
    .eq('id', params.id);

  return NextResponse.json(data);
};
