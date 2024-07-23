import { Database } from './supabase';

export type TBOARD_ITEM = {
  category: string;
  title: string;
  content: string;
};

export type Tcategory = string | undefined;

export type TforumPost = Database['public']['Tables']['forum_posts']['Row'];
export type TarchivePost = Database['public']['Tables']['archive_posts']['Row'];
export type TqnaPost = Database['public']['Tables']['qna_posts']['Row'];
