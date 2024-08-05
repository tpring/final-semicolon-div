import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type RequestData = {
  email: string;
  password: string;
};

export async function POST(request: NextRequest) {
  const data: RequestData = await request.json();
  const email = data.email;
  const password = data.password;
  const supabase = createClient();

  const {
    data: { user },
    error: signInError
  } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (signInError || !user) {
    return NextResponse.json({ error: 'Wrong information.' }, { status: 401 });
  }
  // console.log('유저정보', user);

  // 로그인 성공 시 users 테이블에서 닉네임 가져오기
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('nickname,profile_image,info,github_url')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: 'Failed to retrieve user profile.' }, { status: 500 });
  }

  // 유저 정보와 닉네임 반환
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      nickname: profile.nickname,
      profile_image: profile.profile_image,
      info: profile.info,
      github_url: profile.github_url
    }
  });
}
