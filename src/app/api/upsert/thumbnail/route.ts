import { POST_IMAGE_URL } from '@/constants/upsert';
import { createClient } from '@/supabase/server';
import { Tcategory } from '@/types/upsert';

export const POST = async (request: Request) => {
  const supabase = createClient();
  const thumbnailFormData = await request.formData();

  const name = thumbnailFormData.get('name') as string;
  const thumbnail = thumbnailFormData.get('thumbnail') as File;
  const category = thumbnailFormData.get('category') as Tcategory;

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

export const PATCH = async (request: Request) => {
  const supabase = createClient();
  const formData = await request.formData();

  const name = formData.get('name') as string;
  const thumbnail = formData.get('thumbnail') as File;
  const prevUrl = formData.get('prevUrl') as string;
  const category = formData.get('category');
  const prevName = prevUrl.split(`/${category}/`)[1];
  const isThumbnailUrlDeleted = formData.get('isThumbnailUrlDeleted');

  if (!category) {
    return Response.json({ message: '카테고리가 없습니다' });
  }
  if (thumbnail.size === 0 && isThumbnailUrlDeleted === 'false') {
    return Response.json({ url: prevUrl });
  }

  if (thumbnail.size !== 0 && isThumbnailUrlDeleted === 'false') {
    const { data, error: uploadError } = await supabase.storage
      .from('posts_image')
      .upload(`${category}/${name}`, thumbnail);
    return uploadError
      ? Response.json({ message: '썸네일 업로드에 실패했습니다' })
      : Response.json({ url: POST_IMAGE_URL + data?.fullPath });
  } else if (thumbnail.size === 0 && isThumbnailUrlDeleted === 'true') {
    const { data: _, error: thumbnailDeleteError } = await supabase.storage
      .from('posts_image')
      .remove([`${category}/${prevName}`]);
    return thumbnailDeleteError
      ? Response.json({ message: '썸네일 삭제에 실패했습니다' })
      : Response.json({ url: null });
  } else if (thumbnail.size !== 0 && isThumbnailUrlDeleted === 'true') {
    const { data: _, error: thumbnailDeleteError } = await supabase.storage
      .from('posts_image')
      .remove([`${category}/${prevName}`]);

    const { data, error: uploadError } = await supabase.storage
      .from('posts_image')
      .upload(`${category}/${name}`, thumbnail);

    return uploadError || thumbnailDeleteError
      ? Response.json({ message: '썸네일 업로드에 실패했습니다' })
      : Response.json({ url: POST_IMAGE_URL + data?.fullPath });
  }

  return Response.json({ url: prevUrl });
};
