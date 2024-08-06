import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  try {
    const { newPassword } = await request.json();

    // 비밀번호 변경
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (updateError) {
      console.error('비밀번호 변경 실패:', updateError);
      return NextResponse.json({ error: '비밀번호 변경에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
