import { POSTING_ERROR_MASSAGE, POSTING_SUCCESS_MASSAGE } from '@/constants/upsert.api';
import { createClient } from '@/supabase/server';

type Tparams = { params: { id: string } };

export const POST = async (request: Request, { params }: Tparams) => {
  const supabase = createClient();
  const jsonData = await request.json();
  const post_id = params.id;

  if (jsonData.category === 'forum') {
    const tagList = jsonData.tags;

    const promiseArr = tagList.map(async (tag: Ttag) => {
      return await supabase
        .from('forum_tags')
        .insert([
          {
            user_id: jsonData.user_id,
            tag: tag.name,
            post_id
          }
        ])
        .select();
    });
    try {
      const result = await Promise.all(promiseArr);
    } catch (error) {
      return Response.json(POSTING_ERROR_MASSAGE);
    }

    return Response.json(POSTING_SUCCESS_MASSAGE);
  } else if (jsonData.category === 'qna') {
    const tagList = jsonData.tags;

    const promiseArr = tagList.map(async (tag: Ttag) => {
      return await supabase
        .from('qna_tags')
        .insert([
          {
            user_id: jsonData.user_id,
            tag: tag.name,
            post_id
          }
        ])
        .select();
    });
    try {
      const result = await Promise.all(promiseArr);
    } catch (error) {
      return Response.json(POSTING_ERROR_MASSAGE);
    }

    return Response.json(POSTING_SUCCESS_MASSAGE);
  } else if (jsonData.category === 'archive') {
    const tagList = jsonData.tags;

    const promiseArr = tagList.map(async (tag: Ttag) => {
      return await supabase
        .from('archive_tags')
        .insert([
          {
            user_id: jsonData.user_id,
            tag: tag.name,
            post_id
          }
        ])
        .select();
    });
    try {
      const result = await Promise.all(promiseArr);
    } catch (error) {
      return Response.json(POSTING_ERROR_MASSAGE);
    }

    return Response.json(POSTING_SUCCESS_MASSAGE);
  } else if (jsonData.category === 'comment') {
    const tagList = jsonData.tags;

    const promiseArr = tagList.map(async (tag: Ttag) => {
      return await supabase
        .from('qna_comment_tag')
        .insert([
          {
            user_id: jsonData.user_id,
            tag: tag.name,
            comment_id: jsonData.comment_id
          }
        ])
        .select();
    });

    try {
      const result = await Promise.all(promiseArr);
    } catch (error) {
      console.log(error);
      return Response.json(POSTING_ERROR_MASSAGE);
    }

    return Response.json(POSTING_SUCCESS_MASSAGE);
  }
};
