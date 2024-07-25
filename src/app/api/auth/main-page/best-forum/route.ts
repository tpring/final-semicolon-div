import { createClient } from '@/supabase/server';

import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('forum_posts')
    .select('*,users: user_id(*), like: forum_likes(*), comments: forum_comments(*)')
    .order('created_at', {
      ascending: false
    })
    .limit(6);

  console.log(data);
  return NextResponse.json(data);
}
