import { DELETE_ERROR_MASSAGE, EDIT_ERROR_MASSAGE, POSTING_ERROR_MASSAGE } from '@/constants/upsert.api';
import { createClient } from '@/supabase/server';
import { NextRequest } from 'next/server';

type Tparams = { params: { id: string } };
type TanswerData = {
  user_id: string;
  comment: string;
};

export const GET = async (request: NextRequest, { params }: Tparams) => {
  const supabase = createClient();
  const post_id = params.id;
  const urlSearchParams = request.nextUrl.searchParams;
  const page = urlSearchParams.get('page') ? Number(urlSearchParams.get('page')) : 0;
  const selete_comment_id = urlSearchParams.get('selected');

  const { data, error: loadError } = await supabase
    .from('qna_comments')
    .select(`*,users(*),qna_reply(count),qna_comment_tag(tag)`)
    .eq('post_id', post_id)
    .order('created_at', { ascending: false })
    .range(page * 3, (page + 1) * 3 - 1);

  const unSelectedData = data?.filter((comment) => {
    return comment.id !== selete_comment_id;
  });

  if (selete_comment_id && page === 0) {
    const { data: selectedComment, error: loadSelectedError } = await supabase
      .from('qna_comments')
      .select(`*,users(*),qna_reply(count),qna_comment_tag(tag)`)
      .eq('id', selete_comment_id);

    selectedComment?.forEach((selectedComment) => {
      unSelectedData?.unshift(selectedComment);
    });
  }

  return loadError ? Response.json(POSTING_ERROR_MASSAGE) : Response.json({ data: unSelectedData });
};

export const POST = async (request: Request, { params }: Tparams) => {
  const supabase = createClient();
  const post_id = params.id;

  const answerData: TanswerData = await request.json();
  const { data, error: loadError } = await supabase
    .from('qna_comments')
    .insert({ ...answerData, post_id })
    .select();

  return loadError ? Response.json(POSTING_ERROR_MASSAGE) : Response.json({ data });
};

export const PATCH = async (request: Request, { params }: Tparams) => {
  const supabase = createClient();
  const comment_id = params.id;

  const answerData = await request.json();

  const { data, error: loadError } = await supabase
    .from('qna_comments')
    .update({ comment: answerData.comment })
    .eq('id', comment_id);

  const { error: deleteTagError } = await supabase.from(`qna_comment_tag`).delete().eq('comment_id', comment_id);

  Promise.all(
    answerData.tags.map(async (tag: Ttag) => {
      await supabase.from(`qna_comment_tag`).insert({ comment_id, tag: tag.name, user_id: answerData.user_id });
    })
  );
  console.log(loadError);
  return loadError || deleteTagError ? Response.json(EDIT_ERROR_MASSAGE) : Response.json({ data });
};

export const DELETE = async (request: Request, { params }: Tparams) => {
  const supabase = createClient();
  const comment_id = params.id;

  const { data, error: loadError } = await supabase.from('qna_comments').delete().eq('id', comment_id);

  return loadError ? Response.json(DELETE_ERROR_MASSAGE) : Response.json({ data });
};
