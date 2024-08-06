import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { currentPassword, email } = await request.json();

  try {
    // 이메일과 비밀번호로 로그인 시도
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email,
      password: currentPassword
    });

    if (loginError) {
      return NextResponse.json({ valid: false, message: '현재 비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    return NextResponse.json({ valid: true, message: '현재 비밀번호가 확인되었습니다.' });
  } catch (error) {
    console.error('error:', error);
    return NextResponse.json({ valid: false, message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
