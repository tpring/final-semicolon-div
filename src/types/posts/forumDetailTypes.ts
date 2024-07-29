import { Tables } from '../supabase';

export type forumDetailType = Tables<'forum_posts'> & {
  user: Tables<'users'>;
};

export type forumCommentsType = Tables<'forum_comments'> & {
  user: Tables<'users'>;
};
