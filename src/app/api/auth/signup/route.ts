import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type RequestData = {
  email: string;
  password: string;
  nickname: string;
  recaptchaToken: string;
};

const RECAPTCHA_SECRET_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY as string;

export async function POST(request: NextRequest) {
  const data: RequestData = await request.json();
  const { email, password, nickname, recaptchaToken } = data;
  const supabase = createClient();

  const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
  });

  const recaptchaData = await recaptchaResponse.json();
  if (!recaptchaData.success) {
    return NextResponse.json({ error: 'recaptcha 인증 실패' });
  }

  const {
    data: { user }
  } = await supabase.auth.signUp({
    email,
    password
  });
  if (!user) return NextResponse.json('', { status: 401 });

  const { error: updateError } = await supabase.from('users').update({ nickname }).eq('id', user.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json(user);
}
