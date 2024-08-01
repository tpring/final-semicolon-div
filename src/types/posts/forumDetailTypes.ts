import { Tables } from '../supabase';

export type forumDetailType = Tables<'forum_posts'> & {
  user: Tables<'users'>;
};

type comments = Tables<'forum_comments'>[] & {
  user: Tables<'users'>;
};
type reply = Tables<'forum_reply'>[] & {
  user: Tables<'users'>;
};

export type forumCommentsType = {
  data: comments[];
  count: number;
};

export type userComment = {
  user_id: string | undefined;
  post_id: string;
  comment: string;
};

export type forumReplyType = {
  data: reply[];
  count: number;
};
