import { createClient } from '@/supabase/server';
import { LikeType, TABLES } from '@/types/buttons/like';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') as LikeType;
  const id = searchParams.get('id');
  const supabase = createClient();

  if (!type || !id) {
    return NextResponse.json({ count: 0 }, { status: 400 });
  }

  let column = type.includes('Comment') ? 'comment_id' : 'post_id';
  const { count, error } = await supabase.from(TABLES[type]).select('*', { count: 'exact' }).eq(column, id);

  if (error) {
    return NextResponse.json({ count: 0 }, { status: 500 });
  }

  return NextResponse.json({ count });
};
