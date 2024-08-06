import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const supabase = createClient();

  //베스트 포럼 게시글
  const { data: forum_posts } = await supabase
    .from('forum_posts')
    .select(
      '*,users: user_id(*), like: forum_likes(*), comments: forum_comments(count), like_count:forum_likes(count)  '
    );
  const dataLikeSort = forum_posts?.sort((a, b) => (b.like_count[0]?.count || 0) - (a.like_count[0]?.count || 0));
  const bestForum = dataLikeSort?.slice(0, 6);

  //Q&A 게시글
  const { data: qna_posts } = await supabase
    .from('qna_posts')
    .select('*')
    .order('created_at', {
      ascending: false
    })
    .limit(8);

  return NextResponse.json({ forum_posts, qna_posts });
};
