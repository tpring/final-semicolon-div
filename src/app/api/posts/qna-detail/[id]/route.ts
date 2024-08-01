import { POSTING_ERROR_MASSAGE } from '@/constants/upsert.api';
import { createClient } from '@/supabase/server';
import { NextRequest } from 'next/server';

type Tparams = { params: { id: string } };

export const GET = async (request: NextRequest, { params }: Tparams) => {
  const supabase = createClient();
  const post_id = params.id;

  const { data, error: loadError } = await supabase
    .from('qna_posts')
    .select(`*,users(*),qna_post_reply(count),qna_comments!qna_comments_post_id_fkey(count)`)
    .eq('id', post_id)
    .single();

  return loadError ? Response.json(POSTING_ERROR_MASSAGE) : Response.json({ data });
};
