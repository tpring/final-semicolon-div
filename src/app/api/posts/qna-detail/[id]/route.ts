import { POSTING_ERROR_MASSAGE } from '@/constants/upsert.api';
import { createClient } from '@/supabase/server';
import { NextRequest } from 'next/server';

type Tparams = { params: { id: string } };

export const GET = async (request: NextRequest, { params }: Tparams) => {
  const supabase = createClient();
  const post_id = params.id;

  const { data: questionData, error: loadError } = await supabase
    .from('qna_posts')
    .select(`*,users(*),qna_post_reply(count),qna_comments!qna_comments_post_id_fkey(count)`)
    .eq('id', post_id)
    .single();

  return loadError ? Response.json(POSTING_ERROR_MASSAGE) : Response.json({ questionData });
};

export const PATCH = async (request: NextRequest, { params }: Tparams) => {
  const supabase = createClient();
  const post_id = params.id;
  const comment_id = request.nextUrl.searchParams.get('comment_id');

  const { data, error: updateError } = await supabase
    .from('qna_posts')
    .update({ selected_comment: comment_id })
    .eq('id', post_id)
    .single();

  return updateError ? Response.json(POSTING_ERROR_MASSAGE) : Response.json({ data });
};
