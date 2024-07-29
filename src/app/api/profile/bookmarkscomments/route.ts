import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/client';

const supabase = createClient();

export async function GET(request: NextRequest) {
  // 임시 사용자 ID
  const userId = 'd8e37eff-f7fa-4aea-9382-dd224d9fcd07';

  // 사용자 ID로 댓글북마크를 가져옵니다.
  const { data: archiveCommentBookmarks, error: archiveCommentError } = await supabase
    .from('archive_comment_bookmarks')
    .select('comment_id')
    .eq('user_id', userId);

  const { data: forumCommentBookmarks, error: forumCommentError } = await supabase
    .from('forum_comment_bookmarks')
    .select('comment_id')
    .eq('user_id', userId);

  const { data: qnaCommentBookmarks, error: qnaCommentError } = await supabase
    .from('qna_comment_bookmarks')
    .select('comment_id')
    .eq('user_id', userId);

  // 북마크를 가져오는 데 실패한 경우, 오류 응답을 반환합니다.
  if (archiveCommentError || forumCommentError || qnaCommentError) {
    return NextResponse.json({ error: '댓글북마크 가져오기 실패' }, { status: 500 });
  }

  // 댓글 ID 추출
  const bookmarkscommentIds = [
    ...archiveCommentBookmarks.map((b) => b.comment_id),
    ...forumCommentBookmarks.map((b) => b.comment_id),
    ...qnaCommentBookmarks.map((b) => b.comment_id)
  ];

  // comment_id로 각 게시물 테이블에서 게시물 정보 가져오기
  const bookmarkscommentsFetches = [
    supabase.from('archive_comments').select('*').in('id', bookmarkscommentIds),
    supabase.from('forum_comments').select('*').in('id', bookmarkscommentIds),
    supabase.from('qna_comments').select('*').in('id', bookmarkscommentIds)
  ];

  const [archiveBookmarksComment, forumBookmarksComment, qnaBookmarksComment] =
    await Promise.all(bookmarkscommentsFetches);

  // 게시물을 가져오는 데 실패한 경우, 오류 응답을 반환합니다.
  if (archiveBookmarksComment.error || forumBookmarksComment.error || qnaBookmarksComment.error) {
    return NextResponse.json({ error: '댓글 가져오기 실패' }, { status: 500 });
  }

  // 댓글 데이터
  const bookmarksCommentData = {
    archiveBookmarksComments: archiveBookmarksComment.data,
    forumBookmarksComments: forumBookmarksComment.data,
    qnaBookmarksCommentts: qnaBookmarksComment.data
  };

  // 게시물 ID 추출
  const bookmarksPostIds = [
    ...archiveBookmarksComment.data.map((c) => c.post_id),
    ...forumBookmarksComment.data.map((c) => c.post_id),
    ...qnaBookmarksComment.data.map((c) => c.post_id)
  ];

  // 게시물 정보를 가져옵니다.
  const postFetches = [
    supabase.from('archive_posts').select('*, archive_tags(tag)').in('id', bookmarksPostIds),
    supabase.from('forum_posts').select('*, forum_tags(tag)').in('id', bookmarksPostIds),
    supabase.from('qna_posts').select('*, qna_tags(tag)').in('id', bookmarksPostIds)
  ];

  const [archiveBookmarksPosts, forumBookmarksPosts, qnaBookmarksPosts] = await Promise.all(postFetches);

  // 게시물을 가져오는 데 실패한 경우, 오류 응답을 반환합니다.
  if (archiveBookmarksPosts.error || forumBookmarksPosts.error || qnaBookmarksPosts.error) {
    return NextResponse.json({ error: '포스트 가져오기 실패' }, { status: 500 });
  }

  // 게시물 데이터
  const bookmarksPostData = {
    archivePosts: archiveBookmarksPosts.data,
    forumPosts: forumBookmarksPosts.data,
    qnaPosts: qnaBookmarksPosts.data
  };

  // 댓글과 게시물 데이터를 통합합니다.
  const bookmarkscombinedData = {
    archive: {
      posts: bookmarksPostData.archivePosts,
      comments: bookmarksCommentData.archiveBookmarksComments
    },
    forum: {
      posts: bookmarksPostData.forumPosts,
      comments: bookmarksCommentData.forumBookmarksComments
    },
    qna: {
      posts: bookmarksPostData.qnaPosts,
      comments: bookmarksCommentData.qnaBookmarksCommentts
    }
  };

  return NextResponse.json(bookmarkscombinedData, { status: 200 });
}
