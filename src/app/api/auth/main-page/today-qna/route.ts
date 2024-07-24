import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('qna_posts')
    .select('*')
    .order('created_at', {
      ascending: false
    })
    .limit(8);

  return NextResponse.json(data);
}
