import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

const getForumPosts = async () => {
  const supabase = createClient();
  const { data: posts, error } = await supabase
    .from('forum_posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Forum Posts API Error', error);
  }

  return NextResponse.json({ data: posts });
};

export async function GET() {
  const response = await getForumPosts();

  return response;
}
