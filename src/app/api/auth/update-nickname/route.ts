import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type UpdateNicknameRequest = {
  userId: string;
  newNickname: string;
};

export async function POST(request: NextRequest) {
  const { userId, newNickname }: UpdateNicknameRequest = await request.json();
  const supabase = createClient();

  const { data, error } = await supabase.from('users').update({ nickname: newNickname }).eq('id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: '닉네임이 성공적으로 업데이트되었습니다.', data });
}
