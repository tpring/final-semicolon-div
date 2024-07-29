import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('qna_posts')
    .select('*')
    .order('created_at', {
      ascending: false
    })
    .limit(8);
  if (!data) {
    return NextResponse.json([]);
  }
  return NextResponse.json(data);
};
