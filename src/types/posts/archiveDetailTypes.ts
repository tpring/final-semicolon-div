import { Tables } from '../supabase';

export type archiveDetailType = Tables<'archive_posts'> & {
  user: {
    email: string;
    github_url: string | null;
    id: string;
    info: string | null;
    nickname: string | null;
    profile_image: string;
  } | null;
  commentsCount: number;
  tags: { id: string; tag: string }[];
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

export type archiveCommentsType = {
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

export type archiveReplyType = {
  id: string;
  reply: reply[];
  created_at: string;
  comment_id: string;
  updated_at: string;
  user: string[];
  count: number;
  pageParams: number[];
};

export type archiveReplyInputProps = {
  comment_id: string;
  toggle: (id: string, count: number) => void;
  count: number;
};

export type userReply = {
  user_id: string | undefined;
  comment_id: string;
  reply: string;
};

export type archiveCommentInputProps = {
  comment_id: string;
  toggle: (id: string) => void;
};
