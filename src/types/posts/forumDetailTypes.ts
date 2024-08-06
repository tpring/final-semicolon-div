import { Tables } from '../supabase';

export type forumDetailType = Tables<'forum_posts'> & {
  user: Tables<'users'>;
  comment: { count: number }[];
};

type comments = {
  id: string;
  comment: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  reply: { count: number }[];
  user: {
    nickname: string;
    profile_image: string;
  };
};

export type forumCommentsType = {
  id: string;
  data: comments[];
  comment: { id: string };
  count: number;
};

export type userComment = {
  user_id: string | undefined;
  post_id: string;
  comment: string;
};

export type commentRetouch = {
  id: string;
  user_id: string;
  mdEditorChange: string | undefined;
};

export type replyRetouch = {
  id: string;
  user_id: string;
  replyRetouch: string | undefined;
};

type reply = {
  id: string;
  reply: string;
  created_at: string;
  comment_id: string;
  updated_at: string;
  user_id: string;
  user: {
    nickname: string;
    profile_image: string;
  };
};

export type forumReplyType = {
  id: string;
  reply: reply[];
  created_at: string;
  comment_id: string;
  updated_at: string;
  user: string[];
  count: number;
  pageParams: number[];
};

export type CommentReply = {
  user_id: string | undefined;
  comment_id: string;
  reply: string;
};
