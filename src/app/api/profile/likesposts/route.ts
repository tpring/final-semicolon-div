import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const userId = request.headers.get('user-id');

  if (!userId) {
    return NextResponse.json({ error: 'User ID가 없습니다.' }, { status: 400 });
  }

  // 게시물 좋아요 관련 데이터 가져오기
  const { data: archiveLikedPosts, error: archiveLikesError } = await supabase
    .from('archive_likes')
    .select('post_id')
    .eq('user_id', userId);

  const { data: forumLikedPosts, error: forumLikesError } = await supabase
    .from('forum_likes')
    .select('post_id')
    .eq('user_id', userId);

  const { data: qnaLikedPosts, error: qnaLikesError } = await supabase
    .from('qna_likes')
    .select('post_id')
    .eq('user_id', userId);

  if (archiveLikesError || forumLikesError || qnaLikesError) {
    return NextResponse.json({ error: '좋아요 가져오기 실패' }, { status: 500 });
  }

  const postIds = [
    ...archiveLikedPosts.map((like) => like.post_id),
    ...forumLikedPosts.map((like) => like.post_id),
    ...qnaLikedPosts.map((like) => like.post_id)
  ];

  // 게시물 및 태그 데이터 가져오기
  const postFetches = [
    supabase
      .from('archive_posts')
      .select('id, user_id, title, content, thumbnail, created_at, updated_at, category')
      .in('id', postIds),
    supabase
      .from('forum_posts')
      .select('id, user_id, title, content, thumbnail, created_at, updated_at, category, forum_category')
      .in('id', postIds),
    supabase
      .from('qna_posts')
      .select('id, user_id, title, content, thumbnail, created_at, updated_at, category')
      .in('id', postIds)
  ];

  const tagFetches = [
    supabase.from('archive_tags').select('post_id, tag').in('post_id', postIds),
    supabase.from('forum_tags').select('post_id, tag').in('post_id', postIds),
    supabase.from('qna_tags').select('post_id, tag').in('post_id', postIds)
  ];

  const [archivePostsResponse, forumPostsResponse, qnaPostsResponse] = await Promise.all(postFetches);
  const [archiveTagsResponse, forumTagsResponse, qnaTagsResponse] = await Promise.all(tagFetches);

  if (
    archivePostsResponse.error ||
    forumPostsResponse.error ||
    qnaPostsResponse.error ||
    archiveTagsResponse.error ||
    forumTagsResponse.error ||
    qnaTagsResponse.error
  ) {
    return NextResponse.json({ error: '게시물 또는 태그 가져오기 실패' }, { status: 500 });
  }

  const postUserIds = [
    ...archivePostsResponse.data.map((c) => c.user_id),
    ...forumPostsResponse.data.map((c) => c.user_id),
    ...qnaPostsResponse.data.map((c) => c.user_id)
  ];

  const { data: commentUsers, error: commentUserError } = await supabase
    .from('users')
    .select('id, nickname, profile_image')
    .in('id', postUserIds);

  if (commentUserError) {
    return NextResponse.json({ error: '댓글 유저 정보 가져오기 실패' }, { status: 500 });
  }

  // 좋아요 수 및 댓글 수 가져오기
  const likeAndCommentCountFetches = [
    supabase.from('archive_likes').select('post_id', { count: 'exact' }).in('post_id', postIds),
    supabase.from('forum_likes').select('post_id', { count: 'exact' }).in('post_id', postIds),
    supabase.from('qna_likes').select('post_id', { count: 'exact' }).in('post_id', postIds),

    supabase.from('archive_comments').select('post_id', { count: 'exact' }).in('post_id', postIds),
    supabase.from('forum_comments').select('post_id', { count: 'exact' }).in('post_id', postIds),
    supabase.from('qna_comments').select('post_id', { count: 'exact' }).in('post_id', postIds)
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

  const countOrDefault = (response: any[], postId: string) => {
    const item = response.find((item) => item.post_id === postId);
    return item ? item.count : 0;
  };

  const postData = {
    archivePosts: archivePostsResponse.data.map((post) => ({
      ...post,
      user: commentUsers.find((user) => user.id === post.user_id),
      tags: archiveTagsResponse.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag),
      likesCount: countOrDefault(archiveLikesCountResponse.data, post.id),
      commentsCount: countOrDefault(archiveCommentCountResponse.data, post.id)
    })),
    forumPosts: forumPostsResponse.data.map((post) => ({
      ...post,
      user: commentUsers.find((user) => user.id === post.user_id),
      tags: forumTagsResponse.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag),
      likesCount: countOrDefault(forumLikesCountResponse.data, post.id),
      commentsCount: countOrDefault(forumCommentCountResponse.data, post.id)
    })),
    qnaPosts: qnaPostsResponse.data.map((post) => ({
      ...post,
      user: commentUsers.find((user) => user.id === post.user_id),
      tags: qnaTagsResponse.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag),
      likesCount: countOrDefault(qnaLikesCountResponse.data, post.id),
      commentsCount: countOrDefault(qnaCommentCountResponse.data, post.id)
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

// 좋아요 포스트 배열 삭제로직
export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const { postsToDelete } = await req.json();

  for (const post of postsToDelete) {
    const { category, id } = post;

    // 포스트 삭제
    if (category === 'archive') {
      const { error } = await supabase.from('archive_likes').delete().eq('post_id', id);
      if (error) throw new Error(`포스트 삭제 실패 (archive): ${error.message}`);
    } else if (category === 'forum') {
      const { error } = await supabase.from('forum_likes').delete().eq('post_id', id);
      if (error) throw new Error(`포스트 삭제 실패 (forum): ${error.message}`);
    } else if (category === 'qna') {
      const { error } = await supabase.from('qna_likes').delete().eq('post_id', id);
      if (error) throw new Error(`포스트 삭제 실패 (qna): ${error.message}`);
    } else {
      throw new Error('유효하지 않은 카테고리');
    }
  }

  return NextResponse.json({ success: true });
}
