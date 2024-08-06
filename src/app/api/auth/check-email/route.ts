import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type CheckEmailRequest = {
  email: string;
};

type CheckEmailResponse = {
  error?: string;
  message?: string;
};

export async function POST(request: NextRequest) {
  const { email }: CheckEmailRequest = await request.json();
  const supabase = createClient();

  const { data: existingUsers, error: checkError } = await supabase.from('users').select('id').eq('email', email);

  if (checkError) {
    const response: CheckEmailResponse = { error: checkError.message };
    return NextResponse.json(response, { status: 500 });
  }

  if (existingUsers.length > 0) {
    const response: CheckEmailResponse = { error: '이미 사용 중인 이메일입니다.' };
    return NextResponse.json(response, { status: 409 });
  }

  const response: CheckEmailResponse = { message: '사용 가능한 이메일입니다.' };
  return NextResponse.json(response);
}
