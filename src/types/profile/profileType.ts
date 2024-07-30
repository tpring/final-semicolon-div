import { Database } from '../supabase';

type Tables = Database['public']['Tables'];
export type User = Tables['users']['Row'];

export type Post = {
  type: 'post';
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  created_at: string;
  category: string;
  forum_category: string;
  user: {
    id: string;
    nickname: string;
    profile_image: string;
  };
};

export type Comment = {
  type: 'comment';
  id: string;
  post_id: string;
  title: string;
  tags: string[];
  comment: string;
  created_at: string;
  category: string;
  forum_category: string;
  user: {
    id: string;
    nickname: string;
    profile_image: string;
  };
};

export type CombinedItem = Post | Comment;

export type MyPost = {
  type: 'post';
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  created_at: string;
  category: string;
  forum_category: string;
};

export type MyComment = {
  type: 'comment';
  id: string;
  post_id: string;
  title: string;
  tags: string[];
  comment: string;
  created_at: string;
  category: string;
  forum_category: string;
  user: {
    id: string;
    nickname: string;
    profile_image: string;
  };
};

export type MyCombinedItem = MyPost | MyComment;

export type PostsData = {
  archivePosts: Post[];
  forumPosts: Post[];
  qnaPosts: Post[];
};

export type CommentsData = {
  archive: { posts: Post[]; comments: Comment[] };
  forum: { posts: Post[]; comments: Comment[] };
  qna: { posts: Post[]; comments: Comment[] };
};
