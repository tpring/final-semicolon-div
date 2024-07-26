import { Tables } from '../supabase';

export type ResumesType = {
  users: Tables<'users'>;
  like: Tables<'forum_likes'>;
  images: Tables<'forum_images'>;
  tags: Tables<'forum_tags'>;
  comments: Tables<'forum_comments'>;
};
