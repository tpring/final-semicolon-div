import { Database } from '../supabase';

type Tables = Database['public']['Tables'];
type QnaPost = Tables['qna_posts']['Row'];
type QnaTag = Tables['qna_tags']['Row'];
type QnaImage = Tables['qna_images']['Row'];
type User = Tables['users']['Row'];

export type Post = QnaPost & {
  qna_like: { count: number }[];
  qna_comment: { count: number }[];
  qna_tags: QnaTag[];
  qna_images: QnaImage[];
  user: User;
};

export type FetchResult = {
  data: Post[];
  count: number;
  nextPage: number | null;
};

export type SortOption = 'latest' | 'mostComments' | 'mostLikes';
