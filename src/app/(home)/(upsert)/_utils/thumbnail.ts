import { TcategoryEN } from '@/types/upsert';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export const uploadThumbnail = async (thumbnail: File, category: TcategoryEN): Promise<string | null> => {
  const thumbnailFormData = new FormData();
  thumbnailFormData.append('category', category);
  thumbnailFormData.append('name', uuidv4());
  thumbnailFormData.append('thumbnail', thumbnail);

  const response = await fetch('/api/upsert/thumbnail', {
    method: 'POST',
    body: thumbnailFormData
  });

  const { url, message: thumbnailMessage } = await response.json();

  if (thumbnailMessage) {
    toast.error(thumbnailMessage);
    return null;
  } else {
    return url;
  }
};

export const deleteThumbnail = async (
  thumbnail: File,
  category: TcategoryEN,
  prevUrl: string
): Promise<string | null> => {
  const thumbnailFormData = new FormData();
  thumbnailFormData.append('category', category);
  thumbnailFormData.append('name', uuidv4());
  thumbnailFormData.append('thumbnail', thumbnail);
  thumbnailFormData.append('prevUrl', prevUrl);

  const response = await fetch('/api/upsert/thumbnail', {
    method: 'PATCH',
    body: thumbnailFormData
  });

  const { url, message: thumbnailMessage } = await response.json();

  if (thumbnailMessage) {
    toast.error(thumbnailMessage);
    return null;
  } else {
    return url;
  }
};

export const patchThumbnail = async (
  thumbnail: File,
  category: TcategoryEN,
  prevUrl: string,
  isThumbnailUrlDeleted: boolean
): Promise<string | null> => {
  const thumbnailFormData = new FormData();
  thumbnailFormData.append('category', category);
  thumbnailFormData.append('name', uuidv4());
  thumbnailFormData.append('thumbnail', thumbnail);
  thumbnailFormData.append('prevUrl', prevUrl);
  if (isThumbnailUrlDeleted) {
    thumbnailFormData.append('isThumbnailUrlDeleted', `${isThumbnailUrlDeleted}`);
  }

  const response = await fetch('/api/upsert/thumbnail', {
    method: 'PATCH',
    body: thumbnailFormData
  });

  const { url, message: thumbnailMessage } = await response.json();

  if (thumbnailMessage) {
    toast.error(thumbnailMessage);
    return null;
  } else {
    return url;
  }
};
