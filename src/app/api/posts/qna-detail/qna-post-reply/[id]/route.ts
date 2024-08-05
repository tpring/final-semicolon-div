import { DELETE_ERROR_MASSAGE, EDIT_ERROR_MASSAGE, POSTING_ERROR_MASSAGE } from '@/constants/upsert.api';
import { createClient } from '@/supabase/server';
import { NextRequest } from 'next/server';

type Tparams = { params: { id: string } };

export const GET = async (request: NextRequest, { params }: Tparams) => {
  const supabase = createClient();
  const post_id = params.id;
  const urlSearchParams = request.nextUrl.searchParams;
  const page = urlSearchParams.get('page') ? Number(urlSearchParams.get('page')) : 0;

  const { data, error: loadError } = await supabase
    .from('qna_post_reply')
    .select(`*,users(*)`)
    .eq('post_id', post_id)
    .order('created_at', { ascending: false })
    .range(page * 5, (page + 1) * 5 - 1);

  return loadError ? Response.json(POSTING_ERROR_MASSAGE) : Response.json({ data });
};

export const POST = async (request: Request, { params }: Tparams) => {
  const supabase = createClient();
  const post_id = params.id;

  const qnaPostReplyData = await request.json();

  const { data, error: postError } = await supabase
    .from('qna_post_reply')
    .insert({ ...qnaPostReplyData, post_id })
    .select();

  return postError ? Response.json(POSTING_ERROR_MASSAGE) : Response.json({ data });
};

export const PATCH = async (request: Request, { params }: Tparams) => {
  const supabase = createClient();
  const post_reply_id = params.id;

  const qnaPostReplyData = await request.json();
  // console.log(qnaPostReplyData, post_reply_id);
  const { data, error: loadError } = await supabase
    .from('qna_post_reply')
    .update(qnaPostReplyData)
    .eq('id', post_reply_id);

  return loadError ? Response.json(EDIT_ERROR_MASSAGE) : Response.json({ data });
};

export const DELETE = async (request: Request, { params }: Tparams) => {
  const supabase = createClient();
  const post_reply_id = params.id;

  const { data, error: deleteError } = await supabase.from('qna_post_reply').delete().eq('id', post_reply_id);

  return deleteError ? Response.json(DELETE_ERROR_MASSAGE) : Response.json({ data });
};
