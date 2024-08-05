import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

const POSTS_PER_PAGE = 6;

const getSelectedQnaPosts = async (page: number, limit: number) => {
  const supabase = createClient();

  const { data: posts, error } = await supabase
    .from('qna_posts')
    .select(
      `*, qna_like: qna_likes(count), qna_comment:qna_comments!qna_comments_post_id_fkey(count), qna_tags(*), user:users(*)`
    )
    .not('selected_comment', 'is', null)
    .order('updated_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (error) {
    // console.log('qna', error);
  }

  const { count, error: countError } = await supabase
    .from('qna_posts')
    .select('*', { count: 'exact', head: true })
    .not('selected_comment', 'is', null);

  if (countError) {
    // console.log('countError', countError);
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
      `*, qna_like: qna_likes(count), qna_comment:qna_comments!qna_comments_post_id_fkey(count), qna_tags(*), user:users(*)`
    )
    .is('selected_comment', null)
    .order('updated_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (error) {
    // console.log('qna', error);
  }

  const { count, error: countError } = await supabase
    .from('qna_posts')
    .select('*', { count: 'exact', head: true })
    .is('selected_comment', null);

  if (countError) {
    // console.log('countError', countError);
  }

  if (!posts || posts.length === 0) {
    return NextResponse.json({ data: [], count: 0 });
  }

  return NextResponse.json({ data: posts, count, nextPage: posts.length === limit ? page + 1 : null });
};

const getPopularQnaPost = async (page: number, limit: number) => {
  const supabase = createClient();
  const oneYearAgo = dayjs().subtract(1, 'year').toISOString();

  const { data: posts, error } = await supabase
    .from('qna_posts')
    .select(`*, qna_like:qna_likes(count), qna_comment:qna_comments!qna_comments_post_id_fkey(count), user:users(*)`)
    .gte('updated_at', oneYearAgo)
    .order('updated_at', { ascending: false });

  if (error) {
    // console.error('error', error);
    return NextResponse.json({ data: [], error: error.message });
  }

  const sortedPosts = posts.sort((a, b) => (b.qna_like[0]?.count || 0) - (a.qna_like[0]?.count || 0));

  const paginatedPosts = sortedPosts.slice(page * limit, (page + 1) * limit);

  return NextResponse.json({
    data: paginatedPosts,
    count: 18,
    nextPage: paginatedPosts.length === limit ? page + 1 : null
  });
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '0');
  const limit = parseInt(searchParams.get('limit') || String(POSTS_PER_PAGE));
  const status = req.nextUrl.pathname.split('/').pop();

  if (status === 'selected') {
    return await getSelectedQnaPosts(page, limit);
  } else if (status === 'waiting') {
    return await getWaitingQnaPosts(page, limit);
  } else if (status === 'popular') {
    return await getPopularQnaPost(page, limit);
  } else {
    return NextResponse.json({ data: [], count: 0 });
  }
};
