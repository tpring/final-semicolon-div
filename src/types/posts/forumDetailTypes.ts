import { Tables } from '../supabase';

export type forumDetailType = Tables<'forum_posts'> & {
  user: Tables<'users'>;
};

type comments = {
  id: string;
  comment: string;
  updated_at: string;
  user_id: string;
  user: {
    nickname: string;
    profile_image: string;
  };
};

export type forumCommentsType = {
  id: string;
  data: comments[];
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
  count: number;
};
