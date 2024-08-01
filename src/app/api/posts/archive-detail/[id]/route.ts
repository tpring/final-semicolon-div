import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data } = await supabase
    .from('archive_posts')
    .select(
      '*, user: users(*), bookmark: archive_bookmarks(count), likes: archive_likes(count), comment: archive_comments(count) '
    )
    .eq('id', params.id);

  return NextResponse.json(data);
};
