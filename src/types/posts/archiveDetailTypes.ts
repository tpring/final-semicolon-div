import { Tables } from '../supabase';

export type archiveDetailType = Tables<'archive_posts'> & {
  user: Tables<'users'>;
};

export type forumCommentsType = Tables<'archive_comments'> & {
  user: Tables<'users'>;
};

export type userComment = {
  user_id: string | undefined;
  post_id: string;
  comment: string;
};
