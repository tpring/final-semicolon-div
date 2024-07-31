import { POSTING_ERROR_MASSAGE } from '@/constants/upsert.api';
import { createClient } from '@/supabase/server';
import { NextRequest } from 'next/server';

type Tparams = { params: { id: string } };

export const GET = async (request: NextRequest, { params }: Tparams) => {
  const supabase = createClient();
  const post_id = params.id;
  const urlSearchParams = request.nextUrl.searchParams;
  const page = urlSearchParams.get('page') ? Number(urlSearchParams.get('page')) : 0;

  const { data, error: loadError } = await supabase
    .from('qna_comments')
    .select(`*,users(*),qna_reply(count)`)
    .eq('post_id', post_id)
    .order('created_at', { ascending: false })
    .range(page * 3, (page + 1) * 3 - 1);

  return loadError ? Response.json(POSTING_ERROR_MASSAGE) : Response.json({ data });
};
