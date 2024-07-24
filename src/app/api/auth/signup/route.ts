import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type SignUpRequestData = {
  email: string;
  password: string;
  nickname: string;
};

export async function POST(request: NextRequest) {
  const data: SignUpRequestData = await request.json();
  const { email, password, nickname } = data;
  const supabase = createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.signUp({
    email,
    password
  });
  if (error) {
    console.log(error);
  }
  if (!user) return NextResponse.json('', { status: 401 });

  return NextResponse.json(user);
}
