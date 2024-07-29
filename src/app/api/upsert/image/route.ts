import { POST_IMAGE_URL } from '@/constants/upsert';
import { createClient } from '@/supabase/server';

export const POST = async (request: Request) => {
  const supabase = createClient();
  const formData = await request.formData();
  const name = formData.get('name');
  const file = formData.get('file') as File;

  const { data, error: uploadError } = await supabase.storage.from('posts_image').upload(`posts/${name}`, file);

  return uploadError
    ? Response.json({ message: '이미지 업로드에 실패했습니다!' })
    : Response.json({
        name: file.name,
        storageName: name,
        url: POST_IMAGE_URL + data?.fullPath
      });
};
