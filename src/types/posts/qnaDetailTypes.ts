import { Database } from '../supabase';

// type TqnaPostReply=Database["public"]["Tables"]["qna_post_reply"][]

export type TqnaLikes = Database['public']['Tables']['qna_likes']['Row'];

export type TqnaComments = Database['public']['Tables']['qna_comments']['Row'];

export type TqnaBookMarks = Database['public']['Tables']['qna_bookmarks']['Row'];

export type TqnacommentLikes = Database['public']['Tables']['qna_comment_likes']['Row'];

export type TqnacommentBookmarks = Database['public']['Tables']['qna_comment_bookmarks']['Row'];

export type TqnaPosts = Database['public']['Tables']['qna_posts']['Row'];

export type TqnaReply = Database['public']['Tables']['qna_reply']['Row'];

export type TqnaTags = Database['public']['Tables']['qna_tags']['Row'];

export type TqnaUser = Database['public']['Tables']['users']['Row'];

export type TqnaPostReplyWithUser = TqnaPostReply & { users: TqnaUser };

export type TqnaReplyWithUser = TqnaReply & { users: TqnaUser };

export type TqnaPostReply = {
  id: string;
  user_id: string;
  post_id: string;
  post_reply_content: string;
  created_at: string;
  updated_at: string;
};

export type Tcount = { count: number };

export type qnaData = TqnaPosts & {
  qna_comments: TallComments[];
  qna_bookmarks: TqnaBookMarks[];
  qna_likes: TqnaLikes[];
  qna_post_reply: TqnaPostReplyWithUser[];
  users: TqnaUser;
};

export type TallComments = TqnaComments & {
  qna_comment_bookmarks: TqnacommentBookmarks[];
  qna_comment_likes: TqnacommentLikes[];
  users: TqnaUser;
  qna_reply: TqnaReplyWithUser[];
};

export type TqnaData = TqnaPosts & {
  qna_comments: Tcount[];
  qna_post_reply: Tcount[];
  users: TqnaUser;
};
export type TqnaCommentsWithReplyCount = TqnaComments & {
  users: TqnaUser;
  qna_reply: Tcount[];
};

export type Treply = TqnaReply & { users: TqnaUser };
export type TpostReply = TqnaPostReply & { users: TqnaUser };
