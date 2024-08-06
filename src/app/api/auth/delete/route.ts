import supabaseAdmin from '@/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { user_id } = await req.json();

    const { error } = await supabaseAdmin.auth.admin.deleteUser(user_id);
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
