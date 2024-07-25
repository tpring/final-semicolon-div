import { CATEGORY_LIST_EN } from '@/constants/upsert';
import { EDIT_ERROR_MASSAGE, EDIT_SUCCESS_MASSAGE, POST_LOAD_ERROR_MASSAGE } from '@/constants/upsert.api';
import { createClient } from '@/supabase/server';
import { TarchivePost, Tcategory, TforumPost, TqnaPost } from '@/types/upsert';
import { NextRequest } from 'next/server';

type Tparams = { params: { id: string } };
type TjsonDataForEdit =
  | (TforumPost & { path: string })
  | (TqnaPost & { path: string })
  | (TarchivePost & { path: string });

export const GET = async (request: NextRequest, { params }: Tparams) => {
  const supabase = createClient();
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const { id: post_id } = params;

  if (category === 'forum') {
    const { data, error } = await supabase.from('forum_posts').select('*').eq('id', post_id).single();
    return error ? Response.json(POST_LOAD_ERROR_MASSAGE) : Response.json({ data });
  } else if (category === 'qna') {
    const { data, error } = await supabase.from('qna_posts').select('*').eq('id', post_id).single();
    return error ? Response.json(POST_LOAD_ERROR_MASSAGE) : Response.json({ data });
  } else if (category === 'archive') {
    const { data, error } = await supabase.from('archive_posts').select('*').eq('id', post_id).single();
    return error ? Response.json(POST_LOAD_ERROR_MASSAGE) : Response.json({ data });
  }
  return Response.json(searchParams);
};

export const PATCH = async (request: NextRequest, { params }: Tparams) => {
  const supabase = createClient();
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const { id: post_id } = params;

  const jsonData: TjsonDataForEdit = await request.json();

  if (jsonData.category !== category) {
    return Response.json(EDIT_ERROR_MASSAGE);
  }

  if (jsonData.category && category === 'forum') {
    const { data, error } = await supabase
      .from(`${category}_posts`)
      .update({
        content: jsonData.content,
        title: jsonData.title,
        forum_category: (jsonData as TforumPost).forum_category
      })
      .eq('id', post_id)
      .eq('user_id', jsonData.user_id)
      .select();
    return error ? Response.json(EDIT_ERROR_MASSAGE) : Response.json({ data, ...EDIT_SUCCESS_MASSAGE });
  } else if (jsonData.category && category === 'qna') {
    const { data, error } = await supabase
      .from(`${category}_posts`)
      .update({
        content: jsonData.content,
        title: jsonData.title
      })
      .eq('id', post_id)
      .eq('user_id', jsonData.user_id)
      .select();
    return error ? Response.json(EDIT_ERROR_MASSAGE) : Response.json({ data, ...EDIT_SUCCESS_MASSAGE });
  } else if (jsonData.category && category === 'archive') {
    const { data, error } = await supabase
      .from(`${category}_posts`)
      .update({
        content: jsonData.content,
        title: jsonData.title
      })
      .eq('id', post_id)
      .eq('user_id', jsonData.user_id)
      .select();
    return error ? Response.json(EDIT_ERROR_MASSAGE) : Response.json({ data, ...EDIT_SUCCESS_MASSAGE });
  }
  return Response.json(EDIT_ERROR_MASSAGE);
};
