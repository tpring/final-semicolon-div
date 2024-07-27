import { createClient } from '@/supabase/server';
import { NextRequest } from 'next/server';

export const POST = async (request: Request) => {
  const supabase = createClient();
  const formData = await request.formData();
  const name = formData.get('name');
  const file = formData.get('file') as File;

  const { data, error: uploadError } = await supabase.storage.from('posts_image').upload(`posts/${name}`, file);

  return uploadError
    ? Response.json({ message: '업로드 실패!' })
    : Response.json({ url: `https://jtorewqfshytdtgldztv.supabase.co/storage/v1/object/public/${data?.fullPath}` });
};
