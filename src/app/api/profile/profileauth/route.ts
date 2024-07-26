import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/client';

const supabase = createClient();

// 좋아요 및 북마크 개수 조회
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // 좋아요 개수 조회
    const [
      { count: archiveCommentLikes = 0 },
      { count: qnaCommentLikes = 0 },
      { count: forumCommentLikes = 0 },
      { count: archiveLikes = 0 },
      { count: qnaLikes = 0 },
      { count: forumLikes = 0 }
    ] = await Promise.all([
      supabase.from('archive_comment_likes').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('qna_comment_likes').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('forum_comment_likes').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('archive_likes').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('qna_likes').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('forum_likes').select('*', { count: 'exact' }).eq('user_id', userId)
    ]);

    // 북마크 개수 조회
    const [
      { count: archiveCommentBookmarks = 0 },
      { count: qnaCommentBookmarks = 0 },
      { count: forumCommentBookmarks = 0 },
      { count: archiveBookmarks = 0 },
      { count: qnaBookmarks = 0 },
      { count: forumBookmarks = 0 }
    ] = await Promise.all([
      supabase.from('archive_comment_bookmarks').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('qna_comment_bookmarks').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('forum_comment_bookmarks').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('archive_bookmarks').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('qna_bookmarks').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('forum_bookmarks').select('*', { count: 'exact' }).eq('user_id', userId)
    ]);

    const likeCount =
      (archiveCommentLikes || 0) +
      (qnaCommentLikes || 0) +
      (forumCommentLikes || 0) +
      (archiveLikes || 0) +
      (qnaLikes || 0) +
      (forumLikes || 0);
    const bookmarkCount =
      (archiveCommentBookmarks || 0) +
      (qnaCommentBookmarks || 0) +
      (forumCommentBookmarks || 0) +
      (archiveBookmarks || 0) +
      (qnaBookmarks || 0) +
      (forumBookmarks || 0);

    return NextResponse.json({ likeCount, bookmarkCount });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 사용자 정보 업데이트
export async function PATCH(request: NextRequest) {
  try {
    const { userId, profile_image, nickname, github_url, info } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (
      typeof profile_image !== 'string' ||
      typeof nickname !== 'string' ||
      typeof github_url !== 'string' ||
      typeof info !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid field types' }, { status: 400 });
    }

    const { error } = await supabase
      .from('users')
      .update({ profile_image, nickname, github_url, info })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
