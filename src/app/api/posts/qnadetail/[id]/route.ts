import { POSTING_ERROR_MASSAGE } from '@/constants/upsert.api';
import { createClient } from '@/supabase/server';
import { Database } from '@/types/supabase';
import { NextRequest } from 'next/server';

type Tparams = { params: { id: string } };

export const GET = async (request: NextRequest, { params }: Tparams) => {
  const supabase = createClient();
  const post_id = params.id;

  //질문글, 질문글 라이크, 질문글 북마크
  const { data, error: loadError } = await supabase
    .from('qna_posts')
    .select(
      `*,qna_bookmarks(*),qna_likes(*),qna_post_reply(*,users(*)),users(*),qna_comments!qna_comments_post_id_fkey(*,users(*),qna_comment_likes(*),qna_comment_bookmarks(*),qna_reply(*,users(*)))`
    )
    .eq('id', post_id);

  return loadError ? Response.json(POSTING_ERROR_MASSAGE) : Response.json({ data });
};
