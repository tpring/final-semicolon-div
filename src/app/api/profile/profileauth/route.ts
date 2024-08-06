import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';

//users 테이블에 id 와 일치하는 사용자 정보 업데이트
export async function PUT(request: NextRequest) {
  const supabase = createClient();
  try {
    const { user_id, nickname, profile_image, info, github_url } = await request.json();

    // 사용자 정보를 업데이트
    const { data, error } = await supabase
      .from('users')
      .update({ nickname, profile_image, info, github_url })
      .eq('id', user_id);

    if (error) {
      // console.error('error:', error);
      return NextResponse.json({ message: '업데이트 실패' }, { status: 500 });
    }

    return NextResponse.json({ message: '업데이트 성공' }, { status: 200 });
  } catch (error) {
    // console.error('error:', error);
    return NextResponse.json({ message: '서버 오류' }, { status: 500 });
  }
}
