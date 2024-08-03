import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

// GET 요청 처리: 특정 게시글의 세부 정보를 가져옵니다.
export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('archive_posts')
    .select(
      '*, user: users(*), bookmark: archive_bookmarks(count), likes: archive_likes(count), comment: archive_comments(count) '
    )
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};

// DELETE 요청 처리: 특정 게시글을 삭제합니다.
export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { userId } = await request.json(); // 클라이언트에서 보낸 사용자 ID

  // 삭제할 게시글의 작성자 ID와 비교
  const { data: post, error: postError } = await supabase
    .from('archive_posts')
    .select('user_id')
    .eq('id', params.id)
    .single();

  if (postError || !post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  if (post.user_id !== userId) {
    // 전송된 userId와 작성자 ID 비교
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 게시글 삭제
  const { error: deleteError } = await supabase.from('archive_posts').delete().eq('id', params.id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ message: '게시글이 삭제되었습니다.' }, { status: 200 });
};
