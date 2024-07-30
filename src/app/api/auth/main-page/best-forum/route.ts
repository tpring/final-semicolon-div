import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('forum_posts')
    .select('*,users: user_id(*), like: forum_likes(*), comments: forum_comments(*), like_count:forum_likes(count)');
  // .order('created_at', {
  //   ascending: false
  // })
  // .limit(6);

  const dataLikeSort = data?.sort((a, b) => (b.like_count[0]?.count || 0) - (a.like_count[0]?.count || 0));
  const bestForum = dataLikeSort?.slice(0, 6);

  if (!data) {
    return NextResponse.json([]);
  }
  return NextResponse.json(bestForum);
};
