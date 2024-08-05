import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // 좋아요 개수 조회
    const [archiveCommentLikes, qnaCommentLikes, forumCommentLikes, archiveLikes, qnaLikes, forumLikes] =
      await Promise.all([
        supabase.from('archive_comment_likes').select('*', { count: 'exact' }).eq('user_id', userId),
        supabase.from('qna_comment_likes').select('*', { count: 'exact' }).eq('user_id', userId),
        supabase.from('forum_comment_likes').select('*', { count: 'exact' }).eq('user_id', userId),
        supabase.from('archive_likes').select('*', { count: 'exact' }).eq('user_id', userId),
        supabase.from('qna_likes').select('*', { count: 'exact' }).eq('user_id', userId),
        supabase.from('forum_likes').select('*', { count: 'exact' }).eq('user_id', userId)
      ]);

    // 북마크 개수 조회
    const [
      archiveCommentBookmarks,
      qnaCommentBookmarks,
      forumCommentBookmarks,
      archiveBookmarks,
      qnaBookmarks,
      forumBookmarks
    ] = await Promise.all([
      supabase.from('archive_comment_bookmarks').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('qna_comment_bookmarks').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('forum_comment_bookmarks').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('archive_bookmarks').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('qna_bookmarks').select('*', { count: 'exact' }).eq('user_id', userId),
      supabase.from('forum_bookmarks').select('*', { count: 'exact' }).eq('user_id', userId)
    ]);

    const likeCount =
      (archiveCommentLikes.count || 0) +
      (qnaCommentLikes.count || 0) +
      (forumCommentLikes.count || 0) +
      (archiveLikes.count || 0) +
      (qnaLikes.count || 0) +
      (forumLikes.count || 0);

    const bookmarkCount =
      (archiveCommentBookmarks.count || 0) +
      (qnaCommentBookmarks.count || 0) +
      (forumCommentBookmarks.count || 0) +
      (archiveBookmarks.count || 0) +
      (qnaBookmarks.count || 0) +
      (forumBookmarks.count || 0);

    return NextResponse.json({ likeCount, bookmarkCount });
  } catch (error) {
    // console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

//users 테이블에 id 와 일치하는 사용자 정보 업데이트
export async function PUT(request: NextRequest) {
  const supabase = createClient();
  try {
    const { user_id, nickname, profile_image, info, github_url } = await request.json();

    // 사용자 정보를 업데이트
    const { data, error } = await supabase
      .from('users')
      .update({ nickname, profile_image, info, github_url })
      .eq('id', user_id);

    if (error) {
      // console.error('Error updating user data:', error);
      return NextResponse.json({ message: '업데이트 실패' }, { status: 500 });
    }

    return NextResponse.json({ message: '업데이트 성공' }, { status: 200 });
  } catch (error) {
    // console.error('Error in PUT request:', error);
    return NextResponse.json({ message: '서버 오류' }, { status: 500 });
  }
}
