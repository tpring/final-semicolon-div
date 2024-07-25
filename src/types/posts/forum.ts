import { Database } from '../supabase';

type ForumPost = Database['public']['Tables']['forum_posts']['Row'];

export type Post = ForumPost & {
  forum_like: { count: number }[];
  forum_comment: { count: number }[];
};

export type SortOption = 'latest' | 'mostComments' | 'mostLikes';
export type ForumCategory = '전체' | '일상' | '커리어' | '자기개발' | '토론' | '코드리뷰';
