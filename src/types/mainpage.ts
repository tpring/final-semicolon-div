import { Tables } from './supabase';

export type BestForumType = Tables<'forum_posts'> & {
  users: Tables<'users'>;
  comments: Tables<'forum_comments'>;
  like: Tables<'forum_likes'>;
};
