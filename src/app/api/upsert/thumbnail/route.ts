import { POST_IMAGE_URL } from '@/constants/upsert';
import { createClient } from '@/supabase/server';

export const POST = async (request: Request) => {
  const supabase = createClient();
  const formData = await request.formData();

  const name = formData.get('name') as string;
  const thumbnail = formData.get('thumbnail') as File;
  const category = formData.get('category') as 'forum' | 'category' | 'archive';
  if (thumbnail.size === 0) {
    return Response.json({ url: null });
  }

  const { data, error: uploadError } = await supabase.storage
    .from('posts_image')
    .upload(`${category}/${name}`, thumbnail);

  return uploadError
    ? Response.json({ message: '썸네일 업로드 실패!' })
    : Response.json({ url: POST_IMAGE_URL + data.fullPath });
};

export const PATCH = (request: Request) => {
  const supabase = createClient();
};
