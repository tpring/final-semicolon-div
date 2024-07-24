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
    error
  } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  if (!user) return NextResponse.json('', { status: 401 });

  return NextResponse.json(user);
}
