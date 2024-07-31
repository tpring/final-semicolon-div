import { Database } from '../supabase';

type Tables = Database['public']['Tables'];
type ArchivePost = Tables['archive_posts']['Row'];
type ArchiveTag = Tables['archive_tags']['Row'];
type ArchiveImage = Tables['archive_images']['Row'];
type User = Tables['users']['Row'];

export type Post = ArchivePost & {
  archive_like: { count: number }[];
  archive_comment: { count: number }[];
  archive_tags: ArchiveTag[];
  archive_images: ArchiveImage[];
  user: User;
};

export type FetchResult = {
  data: Post[];
  count: number;
  nextPage: number | null;
};

export type SortOption = 'latest' | 'mostComments' | 'mostLikes';
