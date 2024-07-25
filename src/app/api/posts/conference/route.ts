import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

const getForumPosts = async () => {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from('forum_posts')
    .select(
      `*, forum_like: forum_likes(count), forum_comment:forum_comments(count), forum_tags(*), forum_images(*), user:users(*)`
    )
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Forum Posts API Error', error);
  }
  if (!posts || posts.length === 0) {
    return NextResponse.json({ data: [] });
  }

  return NextResponse.json({ data: posts });
};

export async function GET() {
  const response = await getForumPosts();
  return response;
}
