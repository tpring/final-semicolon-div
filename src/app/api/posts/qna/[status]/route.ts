import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const POSTS_PER_PAGE = 6;

const getSelectedQnaPosts = async (page: number, limit: number) => {
  const supabase = createClient();

  const { data: posts, error } = await supabase
    .from('qna_posts')
    .select(
      `*, qna_like: qna_likes(count), qna_comment:qna_comments!qna_comments_post_id_fkey(*), qna_tags(*), user:users(*)`
    )
    .not('selected_comment', 'is', null)
    .order('updated_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (error) {
    console.log('qna', error);
  }

  const { count, error: countError } = await supabase
    .from('qna_posts')
    .select('*', { count: 'exact', head: true })
    .not('selected_comment', 'is', null);

  if (countError) {
    console.log('countError', countError);
  }

  if (!posts || posts.length === 0) {
    return NextResponse.json({ data: [], count: 0 });
  }

  return NextResponse.json({ data: posts, count, nextPage: posts.length === limit ? page + 1 : null });
};

const getWaitingQnaPosts = async (page: number, limit: number) => {
  const supabase = createClient();

  const { data: posts, error } = await supabase
    .from('qna_posts')
    .select(
      `*, qna_like: qna_likes(count), qna_comment:qna_comments!qna_comments_post_id_fkey(*), qna_tags(*), user:users(*)`
    )
    .is('selected_comment', null)
    .order('updated_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (error) {
    console.log('qna', error);
  }

  const { count, error: countError } = await supabase
    .from('qna_posts')
    .select('*', { count: 'exact', head: true })
    .is('selected_comment', null);

  if (countError) {
    console.log('countError', countError);
  }

  if (!posts || posts.length === 0) {
    return NextResponse.json({ data: [], count: 0 });
  }

  return NextResponse.json({ data: posts, count, nextPage: posts.length === limit ? page + 1 : null });
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '0');
  const limit = parseInt(searchParams.get('limit') || String(POSTS_PER_PAGE));
  const status = req.nextUrl.pathname.split('/').pop();

  let result;
  if (status === 'selected') {
    return await getSelectedQnaPosts(page, limit);
  } else if (status === 'waiting') {
    return await getWaitingQnaPosts(page, limit);
  } else {
    return NextResponse.json({ data: [], count: 0 });
  }

  return NextResponse.json(result);
};
