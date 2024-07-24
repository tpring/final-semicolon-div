import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const email = data.email as string;
  const password = data.password as string;
  const nickname = data.nickname as string;
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
