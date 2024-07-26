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
  const commentIds = [
    ...archiveCommentBookmarks.map((b) => b.comment_id),
    ...forumCommentBookmarks.map((b) => b.comment_id),
    ...qnaCommentBookmarks.map((b) => b.comment_id)
  ];

  // comment_id로 각 게시물 테이블에서 게시물 정보를 가져옵니다.
  const commentsFetches = [
    supabase.from('archive_comments').select('*').in('id', commentIds),
    supabase.from('forum_comments').select('*').in('id', commentIds),
    supabase.from('qna_comments').select('*').in('id', commentIds)
  ];

  const [archiveComment, forumComment, qnaComment] = await Promise.all(commentsFetches);

  // 댓글을 가져오는 데 실패한 경우, 오류 응답을 반환합니다.
  if (archiveComment.error || forumComment.error || qnaComment.error) {
    return NextResponse.json({ error: '댓글 가져오기 실패' }, { status: 500 });
  }

  // 댓글 데이터
  const commentData = {
    archiveComments: archiveComment.data,
    forumComments: forumComment.data,
    qnaComments: qnaComment.data
  };

  // 게시물 ID 추출
  const postIds = [
    ...archiveComment.data.map((c) => c.post_id),
    ...forumComment.data.map((c) => c.post_id),
    ...qnaComment.data.map((c) => c.post_id)
  ];

  // 게시물 정보를 가져옵니다.
  const postFetches = [
    supabase.from('archive_posts').select('*, archive_tags(tag)').in('id', postIds),
    supabase.from('forum_posts').select('*, forum_tags(tag)').in('id', postIds),
    supabase.from('qna_posts').select('*, qna_tags(tag)').in('id', postIds)
  ];

  const [archivePosts, forumPosts, qnaPosts] = await Promise.all(postFetches);

  // 게시물을 가져오는 데 실패한 경우, 오류 응답을 반환합니다.
  if (archivePosts.error || forumPosts.error || qnaPosts.error) {
    return NextResponse.json({ error: '포스트 가져오기 실패' }, { status: 500 });
  }

  // 게시물 데이터
  const postData = {
    archivePosts: archivePosts.data,
    forumPosts: forumPosts.data,
    qnaPosts: qnaPosts.data
  };

  // 댓글과 게시물 데이터를 통합합니다.
  const combinedData = {
    archive: {
      posts: postData.archivePosts,
      comments: commentData.archiveComments
    },
    forum: {
      posts: postData.forumPosts,
      comments: commentData.forumComments
    },
    qna: {
      posts: postData.qnaPosts,
      comments: commentData.qnaComments
    }
  };

  return NextResponse.json(combinedData, { status: 200 });
}
