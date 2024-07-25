import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type RequestData = {
  email: string;
  password: string;
  nickname: string;
};

export async function POST(request: NextRequest) {
  const data: RequestData = await request.json();
  const email = data.email;
  const password = data.password;
  const nickname = data.nickname;
  const supabase = createClient();
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
