import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const userId = request.headers.get('user-id');

  if (!userId) {
    return NextResponse.json({ error: 'User ID가 없습니다.' }, { status: 400 });
  }

  // userId를 사용하여 북마크를 가져옵니다.
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

  if (archiveCommentError || forumCommentError || qnaCommentError) {
    return NextResponse.json({ error: '댓글 북마크 가져오기 실패' }, { status: 500 });
  }

  // 댓글 ID를 추출합니다.
  const bookmarksCommentIds = [
    ...archiveCommentBookmarks.map((b) => b.comment_id),
    ...forumCommentBookmarks.map((b) => b.comment_id),
    ...qnaCommentBookmarks.map((b) => b.comment_id)
  ];

  // 댓글 ID로 각 게시물 테이블에서 댓글 정보를 가져옵니다.
  const commentsFetches = [
    supabase.from('archive_comments').select('*').in('id', bookmarksCommentIds),
    supabase.from('forum_comments').select('*').in('id', bookmarksCommentIds),
    supabase.from('qna_comments').select('*').in('id', bookmarksCommentIds)
  ];

  const [archiveComments, forumComments, qnaComments] = await Promise.all(commentsFetches);

  if (archiveComments.error || forumComments.error || qnaComments.error) {
    return NextResponse.json({ error: '댓글 가져오기 실패' }, { status: 500 });
  }
  // 게시물 ID를 추출합니다.
  const bookmarksPostIds = [
    ...archiveComments.data.map((c) => c.post_id),
    ...forumComments.data.map((c) => c.post_id),
    ...qnaComments.data.map((c) => c.post_id)
  ];
  // 유저 ID를 추출합니다.
  const commentUserIds = [
    ...archiveComments.data.map((c) => c.user_id),
    ...forumComments.data.map((c) => c.user_id),
    ...qnaComments.data.map((c) => c.user_id)
  ];

  const { data: commentUsers, error: commentUserError } = await supabase
    .from('users')
    .select('id, nickname, profile_image')
    .in('id', commentUserIds);

  if (commentUserError) {
    return NextResponse.json({ error: '댓글 유저 정보 가져오기 실패' }, { status: 500 });
  }
  // 댓글 데이터
  const bookmarksCommentData = {
    archiveBookmarksComments: archiveComments.data.map((comment) => ({
      ...comment,
      user: commentUsers.find((user) => user.id === comment.user_id)
    })),
    forumBookmarksComments: forumComments.data.map((comment) => ({
      ...comment,
      user: commentUsers.find((user) => user.id === comment.user_id)
    })),
    qnaBookmarksComments: qnaComments.data.map((comment) => ({
      ...comment,
      user: commentUsers.find((user) => user.id === comment.user_id)
    }))
  };

  // 게시물 정보를 가져옵니다.
  const postFetches = [
    supabase
      .from('archive_posts')
      .select('id, title, content, thumbnail, created_at, updated_at, category')
      .in('id', bookmarksPostIds),
    supabase
      .from('forum_posts')
      .select('id, title, content, thumbnail, created_at, updated_at, category, forum_category')
      .in('id', bookmarksPostIds),
    supabase
      .from('qna_posts')
      .select('id, title, content, thumbnail, created_at, updated_at, category')
      .in('id', bookmarksPostIds)
  ];

  const tagFetches = [
    supabase.from('archive_tags').select('post_id, tag').in('post_id', bookmarksPostIds),
    supabase.from('forum_tags').select('post_id, tag').in('post_id', bookmarksPostIds),
    supabase.from('qna_tags').select('post_id, tag').in('post_id', bookmarksPostIds)
  ];

  const [archivePosts, forumPosts, qnaPosts] = await Promise.all(postFetches);
  const [archiveTags, forumTags, qnaTags] = await Promise.all(tagFetches);

  if (
    archivePosts.error ||
    forumPosts.error ||
    qnaPosts.error ||
    archiveTags.error ||
    forumTags.error ||
    qnaTags.error
  ) {
    return NextResponse.json({ error: '게시물 또는 태그 가져오기 실패' }, { status: 500 });
  }

  const postData = {
    archivePosts: archivePosts.data.map((post) => ({
      ...post,
      tags: archiveTags.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag)
    })),
    forumPosts: forumPosts.data.map((post) => ({
      ...post,
      tags: forumTags.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag)
    })),
    qnaPosts: qnaPosts.data.map((post) => ({
      ...post,
      tags: qnaTags.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag)
    }))
  };
  console.log(':');
  // 댓글과 게시물 데이터를 통합합니다.
  const bookmarksCombinedData = {
    archive: {
      posts: postData.archivePosts,
      comments: bookmarksCommentData.archiveBookmarksComments
    },
    forum: {
      posts: postData.forumPosts,
      comments: bookmarksCommentData.forumBookmarksComments
    },
    qna: {
      posts: postData.qnaPosts,
      comments: bookmarksCommentData.qnaBookmarksComments
    }
  };

  return NextResponse.json(bookmarksCombinedData, { status: 200 });
}
