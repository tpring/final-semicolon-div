import { EDIT_ERROR_MASSAGE, EDIT_SUCCESS_MASSAGE, POST_LOAD_ERROR_MASSAGE } from '@/constants/upsert.api';
import { createClient } from '@/supabase/server';
import { TarchivePost, TforumPost, TqnaPost } from '@/types/upsert';
import { NextRequest } from 'next/server';

type Tparams = { params: { id: string } };
type TjsonDataForEdit =
  | (TforumPost & { path: string; tags: Ttag[] })
  | (TqnaPost & { path: string; tags: Ttag[] })
  | (TarchivePost & { path: string; tags: Ttag[] });

export const GET = async (request: NextRequest, { params }: Tparams) => {
  const supabase = createClient();
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const { id: post_id } = params;

  if (category === 'forum') {
    const { data, error } = await supabase.from('forum_posts').select(`*,forum_tags(*)`).eq('id', post_id).single();

    return error ? Response.json(POST_LOAD_ERROR_MASSAGE) : Response.json({ data });
  } else if (category === 'qna') {
    const { data, error } = await supabase.from('qna_posts').select(`*,qna_tags(*)`).eq('id', post_id).single();
    return error ? Response.json(POST_LOAD_ERROR_MASSAGE) : Response.json({ data });
  } else if (category === 'archive') {
    const { data, error } = await supabase.from('archive_posts').select(`*,archive_tags(*)`).eq('id', post_id).single();
    return error ? Response.json(POST_LOAD_ERROR_MASSAGE) : Response.json({ data });
  }
  return Response.json(POST_LOAD_ERROR_MASSAGE);
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
        forum_category: (jsonData as TforumPost).forum_category,
        thumbnail: jsonData.thumbnail
      })
      .eq('id', post_id)
      .eq('user_id', jsonData.user_id)
      .select();

    const { error: deleteTagError } = await supabase.from(`${category}_tags`).delete().eq('post_id', post_id);

    Promise.all(
      jsonData.tags.map(async (tag) => {
        await supabase.from(`${category}_tags`).insert({ post_id, tag: tag.name, user_id: jsonData.user_id });
      })
    );

    return error || deleteTagError
      ? Response.json(EDIT_ERROR_MASSAGE)
      : Response.json({ data, ...EDIT_SUCCESS_MASSAGE });
  } else if (jsonData.category && category === 'qna') {
    const { data, error } = await supabase
      .from(`${category}_posts`)
      .update({
        content: jsonData.content,
        title: jsonData.title,
        thumbnail: jsonData.thumbnail
      })
      .eq('id', post_id)
      .eq('user_id', jsonData.user_id)
      .select();

    const { error: deleteTagError } = await supabase.from(`${category}_tags`).delete().eq('post_id', post_id);

    Promise.all(
      jsonData.tags.map(async (tag) => {
        await supabase.from(`${category}_tags`).insert({ post_id, tag: tag.name, user_id: jsonData.user_id });
      })
    );

    return error || deleteTagError
      ? Response.json(EDIT_ERROR_MASSAGE)
      : Response.json({ data, ...EDIT_SUCCESS_MASSAGE });
  } else if (jsonData.category && category === 'archive') {
    const { data, error } = await supabase
      .from(`${category}_posts`)
      .update({
        content: jsonData.content,
        title: jsonData.title,
        thumbnail: jsonData.thumbnail
      })
      .eq('id', post_id)
      .eq('user_id', jsonData.user_id)
      .select();

    const { error: deleteTagError } = await supabase.from(`${category}_tags`).delete().eq('post_id', post_id);

    Promise.all(
      jsonData.tags.map(async (tag) => {
        await supabase.from(`${category}_tags`).insert({ post_id, tag: tag.name, user_id: jsonData.user_id });
      })
    );

    return error || deleteTagError
      ? Response.json(EDIT_ERROR_MASSAGE)
      : Response.json({ data, ...EDIT_SUCCESS_MASSAGE });
  }
  return Response.json(EDIT_ERROR_MASSAGE);
};
