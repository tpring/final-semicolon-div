import { Database } from './supabase';

export type TBOARD_ITEM = {
  category: TcategoryKR;
  content: string;
};

export type TcategoryEN = 'forum' | 'qna' | 'archive' | '';
export type TcategoryKR = '포럼' | 'QnA' | '라이브러리' | '';

export type TforumPost = Database['public']['Tables']['forum_posts']['Row'];
export type TqnaPost = Database['public']['Tables']['qna_posts']['Row'];
export type TarchivePost = Database['public']['Tables']['archive_posts']['Row'];

export type TforumTags = Database['public']['Tables']['forum_tags']['Row'];
export type TqnaTags = Database['public']['Tables']['qna_tags']['Row'];
export type TarchiveTags = Database['public']['Tables']['archive_tags']['Row'];

export type TpostFormData = { [key: string]: FormDataEntryValue };

export type TimageInfo = {
  name: string;
  url: string;
  storageName: string;
};

export type TeditForumData = TforumPost & { forum_tags: TforumTags[] };
export type TeditQnaData = TqnaPost & { qna_tags: TqnaTags[] };
export type TeditArchiveData = TarchivePost & { archive_tags: TarchiveTags[] };
