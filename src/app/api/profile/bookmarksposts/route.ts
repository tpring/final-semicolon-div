import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const userId = request.headers.get('user-id');

  if (!userId) {
    return NextResponse.json({ error: 'User ID가 없습니다.' }, { status: 400 });
  }

  const { data: archiveBookmarks, error: archiveError } = await supabase
    .from('archive_bookmarks')
    .select('post_id')
    .eq('user_id', userId);

  const { data: forumBookmarks, error: forumError } = await supabase
    .from('forum_bookmarks')
    .select('post_id')
    .eq('user_id', userId);

  const { data: qnaBookmarks, error: qnaError } = await supabase
    .from('qna_bookmarks')
    .select('post_id')
    .eq('user_id', userId);

  if (archiveError || forumError || qnaError) {
    return NextResponse.json({ error: '북마크 가져오기 실패' }, { status: 500 });
  }

  const bookmarksPostIds = [
    ...archiveBookmarks.map((b) => b.post_id),
    ...forumBookmarks.map((b) => b.post_id),
    ...qnaBookmarks.map((b) => b.post_id)
  ];

  const postFetches = [
    supabase
      .from('archive_posts')
      .select('id, user_id, title, content, thumbnail, created_at, updated_at, category')
      .in('id', bookmarksPostIds),
    supabase
      .from('forum_posts')
      .select('id, user_id, title, content, thumbnail, created_at, updated_at, category, forum_category')
      .in('id', bookmarksPostIds),
    supabase
      .from('qna_posts')
      .select('id, user_id, title, content, thumbnail, created_at, updated_at, category')
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

  const postUserIds = [
    ...archivePosts.data.map((c) => c.user_id),
    ...forumPosts.data.map((c) => c.user_id),
    ...qnaPosts.data.map((c) => c.user_id)
  ];

  const { data: commentUsers, error: commentUserError } = await supabase
    .from('users')
    .select('id, nickname, profile_image')
    .in('id', postUserIds);

  if (commentUserError) {
    return NextResponse.json({ error: '댓글 유저 정보 가져오기 실패' }, { status: 500 });
  }

  const likeAndCommentCountFetches = [
    supabase.from('archive_likes').select('post_id', { count: 'exact' }).in('post_id', bookmarksPostIds),
    supabase.from('forum_likes').select('post_id', { count: 'exact' }).in('post_id', bookmarksPostIds),
    supabase.from('qna_likes').select('post_id', { count: 'exact' }).in('post_id', bookmarksPostIds),

    supabase.from('archive_comments').select('post_id', { count: 'exact' }).in('post_id', bookmarksPostIds),
    supabase.from('forum_comments').select('post_id', { count: 'exact' }).in('post_id', bookmarksPostIds),
    supabase.from('qna_comments').select('post_id', { count: 'exact' }).in('post_id', bookmarksPostIds)
  ];

  const [
    archiveLikesCountResponse,
    forumLikesCountResponse,
    qnaLikesCountResponse,
    archiveCommentCountResponse,
    forumCommentCountResponse,
    qnaCommentCountResponse
  ] = await Promise.all(likeAndCommentCountFetches);

  if (
    archiveLikesCountResponse.error ||
    forumLikesCountResponse.error ||
    qnaLikesCountResponse.error ||
    archiveCommentCountResponse.error ||
    forumCommentCountResponse.error ||
    qnaCommentCountResponse.error
  ) {
    return NextResponse.json({ error: '좋아요 수 또는 댓글 수 가져오기 실패' }, { status: 500 });
  }

  const countOrDefault = (response: any, postId: string) =>
    response.data?.find((item: any) => item.post_id === postId)?.count || 0;

  const postData = {
    archivePosts: archivePosts.data.map((post) => ({
      ...post,
      user: commentUsers.find((user) => user.id === post.user_id),
      tags: archiveTags.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag),
      likesCount: countOrDefault(archiveLikesCountResponse, post.id),
      commentsCount: countOrDefault(archiveCommentCountResponse, post.id)
    })),
    forumPosts: forumPosts.data.map((post) => ({
      ...post,
      user: commentUsers.find((user) => user.id === post.user_id),
      tags: forumTags.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag),
      likesCount: countOrDefault(forumLikesCountResponse, post.id),
      commentsCount: countOrDefault(forumCommentCountResponse, post.id)
    })),
    qnaPosts: qnaPosts.data.map((post) => ({
      ...post,
      user: commentUsers.find((user) => user.id === post.user_id),
      tags: qnaTags.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag),
      likesCount: countOrDefault(qnaLikesCountResponse, post.id),
      commentsCount: countOrDefault(qnaCommentCountResponse, post.id)
    }))
  };

  return NextResponse.json(
    {
      archivePosts: postData.archivePosts,
      forumPosts: postData.forumPosts,
      qnaPosts: postData.qnaPosts
    },
    { status: 200 }
  );
}

export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const { postsToDelete } = await req.json();

  for (const post of postsToDelete) {
    const { category, id } = post;

    // 포스트 삭제
    if (category === 'archive') {
      const { error } = await supabase.from('archive_bookmarks').delete().eq('post_id', id);
      if (error) throw new Error(`포스트 삭제 실패 (archive): ${error.message}`);
    } else if (category === 'forum') {
      const { error } = await supabase.from('forum_bookmarks').delete().eq('post_id', id);
      if (error) throw new Error(`포스트 삭제 실패 (forum): ${error.message}`);
    } else if (category === 'qna') {
      const { error } = await supabase.from('qna_bookmarks').delete().eq('post_id', id);
      if (error) throw new Error(`포스트 삭제 실패 (qna): ${error.message}`);
    } else {
      throw new Error('유효하지 않은 카테고리');
    }
  }

  return NextResponse.json({ success: true });
}
