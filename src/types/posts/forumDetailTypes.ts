import { Tables } from '../supabase';

export type forumDetailType = Tables<'forum_posts'> & {
  user: Tables<'users'>;
};
