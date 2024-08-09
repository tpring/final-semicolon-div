import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const getTopLikesPosts = async (req: NextRequest) => {
  const supabase = createClient();

  const { data: posts, error } = await supabase.from('forum_posts').select(
    `
      *,
      forum_likes:forum_likes(count),
      forum_comments(count),
      forum_tags(*),
      forum_images(*),
      user:users(*)
    `
  );

  if (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ data: [], error: 'Error Fetching Posts' }, { status: 500 });
  }
  const sortedPosts = posts.sort((a, b) => {
    const aLikes = a.forum_likes[0]?.count || 0;
    const bLikes = b.forum_likes[0]?.count || 0;
    return bLikes - aLikes;
  });

  return NextResponse.json({ data: sortedPosts });
};

export async function GET(req: NextRequest) {
  const response = await getTopLikesPosts(req);
  return response;
}
