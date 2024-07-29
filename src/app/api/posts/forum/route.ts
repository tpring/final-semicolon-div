import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const POSTS_PER_PAGE = 10;

const getForumPosts = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '0');
  const limit = parseInt(searchParams.get('limit') || String(POSTS_PER_PAGE));
  const supabase = createClient();
  const {
    data: posts,
    count,
    error
  } = await supabase
    .from('forum_posts')
    .select(
      `*, forum_like: forum_likes(count), forum_comment:forum_comments(count), forum_tags(*), forum_images(*), user:users(*)`
    )
    .order('updated_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);
  if (error) {
    console.error('Forum Posts API Error', error);
  }
  if (!posts || posts.length === 0) {
    return NextResponse.json({ data: [], count: 0 });
  }

  return NextResponse.json({ data: posts, count, nextPage: posts.length === limit ? page + 1 : null });
};

export async function GET(req: NextRequest) {
  const response = await getForumPosts(req);
  return response;
}
