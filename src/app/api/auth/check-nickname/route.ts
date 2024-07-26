import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type CheckNicknameRequest = {
  nickname: string;
};

type CheckNicknameResponse = {
  error?: string;
  message?: string;
};

export async function POST(request: NextRequest) {
  const { nickname }: CheckNicknameRequest = await request.json();
  const supabase = createClient();

  // 닉네임 중복 확인
  const { data: existingUsers, error: checkError } = await supabase.from('users').select('id').eq('nickname', nickname);

  if (checkError) {
    const response: CheckNicknameResponse = { error: checkError.message };
    return NextResponse.json(response, { status: 500 });
  }

  if (existingUsers.length > 0) {
    const response: CheckNicknameResponse = { error: '닉네임이 이미 사용 중입니다.' };
    return NextResponse.json(response, { status: 409 });
  }

  const response: CheckNicknameResponse = { message: '사용 가능한 닉네임입니다.' };
  return NextResponse.json(response);
}
