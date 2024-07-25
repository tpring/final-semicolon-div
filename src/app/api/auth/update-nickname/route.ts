import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type RequestData = {
  userId: string;
  nickname: string;
};

export async function POST(request: NextRequest) {
  const data: RequestData = await request.json();
  const { userId, nickname } = data;
  const supabase = createClient();

  // Update nickname in users table
  const { error: updateError } = await supabase.from('users').update({
    id: userId,
    nickname
  });

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update nickname' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
