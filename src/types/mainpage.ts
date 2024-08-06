import { Tables } from './supabase';

export type BestForumType = Tables<'forum_posts'> & {
  users: Tables<'users'>;
  comments: { count: string }[];
  like: Tables<'forum_likes'>;
  like_count: { count: string }[];
  tags: { id: string; tag: string }[];
};
