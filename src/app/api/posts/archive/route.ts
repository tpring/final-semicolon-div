import { createClient } from '@/supabase/client';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

const POSTS_PER_PAGE = 6;

const getArchivePosts = async (page: number, limit: number) => {
  const supabase = createClient();

  const {
    data: posts,
    count,
    error
  } = await supabase
    .from('archive_posts')
    .select(
      `*,archive_like:archive_likes(count), archive_comment:archive_comments(count),archive_tags(*), user:users(*)`,
      { count: 'exact' }
    )
    .order('updated_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (error) {
    // console.log('archive', error);
    return { data: [], count: 0, error: error.message };
  }

  return {
    data: posts,
    count: count,
    nextPage: posts.length === limit ? page + 1 : null,
    error: null
  };
};

const getPopularArchivePosts = async () => {
  const supabase = createClient();
  const oneYearAgo = dayjs().subtract(1, 'year').toISOString();

  const { data: posts, error } = await supabase
    .from('archive_posts')
    .select(
      `*,archive_like:archive_likes(count), archive_comment:archive_comments(count), archive_tags(*), user:users(*)`
    )
    .gte('created_at', oneYearAgo)
    .order('created_at', { ascending: false });

  if (error) {
    // console.error('error', error);
    return { data: [], error: error.message };
  }

  const sortedPosts = posts
    .sort((a, b) => (b.archive_like[0]?.count || 0) - (a.archive_like[0]?.count || 0))
    .slice(0, 15);

  return { data: sortedPosts, error: null };
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '0', 10);
  const limit = parseInt(searchParams.get('limit') || POSTS_PER_PAGE.toString(), 10);

  const [archiveResult, popularResult] = await Promise.all([getArchivePosts(page, limit), getPopularArchivePosts()]);

  if (archiveResult.error) {
    return NextResponse.json({ data: [], error: archiveResult.error });
  }

  if (popularResult.error) {
    return NextResponse.json({ data: [], error: popularResult.error });
  }

  return NextResponse.json({
    archivePosts: archiveResult.data,
    archiveCount: archiveResult.count,
    nextPage: archiveResult.nextPage,
    popularPosts: popularResult.data,
    error: null
  });
}
