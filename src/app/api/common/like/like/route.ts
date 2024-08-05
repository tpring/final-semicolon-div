import { createClient } from '@/supabase/server';
import { LikeType, TABLES } from '@/types/buttons/like';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') as LikeType;
  const user_id = searchParams.get('user_id');
  const supabase = createClient();

  if (!user_id) {
    return NextResponse.json({ likes: {} });
  }

  const [forumLikes, forumCommentLikes, qnaLikes, qnaCommentLikes, archiveLikes, archiveCommentLikes] =
    await Promise.all([
      supabase.from(TABLES.forum).select('post_id').eq('user_id', user_id),
      supabase.from(TABLES.forumComment).select('comment_id').eq('user_id', user_id),
      supabase.from(TABLES.qna).select('post_id').eq('user_id', user_id),
      supabase.from(TABLES.qnaComment).select('comment_id').eq('user_id', user_id),
      supabase.from(TABLES.archive).select('post_id').eq('user_id', user_id),
      supabase.from(TABLES.archiveComment).select('comment_id').eq('user_id', user_id)
    ]);

  return NextResponse.json({
    forumLikes: forumLikes.data || [],
    forumCommentLikes: forumCommentLikes.data || [],
    qnaLikes: qnaLikes.data || [],
    qnaCommentLikes: qnaCommentLikes.data || [],
    archiveLikes: archiveLikes.data || [],
    archiveCommentLikes: archiveCommentLikes.data || []
  });
};

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const { user_id, post_id, comment_id, type } = data as {
    user_id: string;
    post_id?: string;
    comment_id?: string;
    type: LikeType;
  };
  const supabase = createClient();

  try {
    if (!user_id || (!post_id && !comment_id)) {
      return NextResponse.json({ error: 'user_id and either post_id or comment_id are required' }, { status: 400 });
    }

    let record: { post_id: string; user_id: string } | { comment_id: string; user_id: string };

    let table: (typeof TABLES)[keyof typeof TABLES];

    switch (type) {
      case 'forum':
      case 'qna':
      case 'archive':
        if (!post_id) {
          return NextResponse.json({ error: 'post_id is required' }, { status: 400 });
        }
        record = { post_id, user_id };
        table = TABLES[type];
        break;
      case 'forumComment':
      case 'qnaComment':
      case 'archiveComment':
        if (!comment_id) {
          return NextResponse.json({ error: 'comment_id is required' }, { status: 400 });
        }
        record = { comment_id, user_id };
        table = TABLES[type];
        break;
      default:
        return NextResponse.json({ error: 'Invalid like type' }, { status: 400 });
    }

    const { data: like, error } = await supabase.from(table).insert(record).select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(like);
  } catch (error) {
    // console.error('likeRoute', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const data = await request.json();
  const { user_id, post_id, comment_id, type } = data as {
    user_id: string;
    post_id?: string;
    comment_id?: string;
    type: LikeType;
  };
  const supabase = createClient();
  let table: (typeof TABLES)[keyof typeof TABLES];

  switch (type) {
    case 'forum':
    case 'qna':
    case 'archive':
      if (!post_id) {
        return NextResponse.json({ error: 'post_id is required' }, { status: 400 });
      }
      table = TABLES[type];
      break;
    case 'forumComment':
    case 'qnaComment':
    case 'archiveComment':
      if (!comment_id) {
        return NextResponse.json({ error: 'comment_id is required' }, { status: 400 });
      }
      table = TABLES[type];
      break;
    default:
      return NextResponse.json({ error: 'Invalid bookmark type' }, { status: 400 });
  }

  const column = post_id ? 'post_id' : 'comment_id';
  const value = post_id || comment_id;

  const { data: bookmark, error } = await supabase
    .from(table)
    .delete()
    .eq('user_id', user_id)
    .eq(column, value as string);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(bookmark);
};
