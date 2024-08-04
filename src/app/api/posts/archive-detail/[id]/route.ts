import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();

  const { data } = await supabase
    .from('archive_posts')
    .select(
      '*, user: users(*), bookmark: archive_bookmarks(count), likes: archive_likes(count), comment: archive_comments(count) '
    )
    .eq('id', params.id)
    .single();

  return NextResponse.json(data);
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { userId } = await request.json();

  const { data: post, error: postError } = await supabase
    .from('archive_posts')
    .select('user_id')
    .eq('id', params.id)
    .single();

  if (postError || !post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  if (post.user_id !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { error: deleteError } = await supabase.from('archive_posts').delete().eq('id', params.id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ message: '게시글이 삭제되었습니다.' }, { status: 200 });
};
