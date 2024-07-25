import { createClient } from '@/supabase/server';
import { Post } from '@/types/posts/forum';
import { NextResponse } from 'next/server';

const getForumPosts = async () => {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from('forum_posts')
    .select(`*, forum_like: forum_likes(count), forum_comment:forum_comments(count)`)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Forum Posts API Error', error);
  }

  return NextResponse.json({ data: posts as Post[] });
};

export async function GET() {
  const response = await getForumPosts();
  return response;
}
