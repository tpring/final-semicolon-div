import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const userId = request.headers.get('user-id');

  if (!userId) {
    return NextResponse.json({ error: 'User ID가 없습니다.' }, { status: 400 });
  }

  // userId를 사용하여 좋아요를 가져옵니다.
  const { data: archiveComments, error: archiveCommentError } = await supabase
    .from('archive_comments')
    .select('*')
    .eq('user_id', userId);

  const { data: forumComments, error: forumCommentError } = await supabase
    .from('forum_comments')
    .select('*')
    .eq('user_id', userId);

  const { data: qnaComments, error: qnaCommentError } = await supabase
    .from('qna_comments')
    .select('*')
    .eq('user_id', userId);

  if (archiveCommentError || forumCommentError || qnaCommentError) {
    return NextResponse.json({ error: '댓글북마크 가져오기 실패' }, { status: 500 });
  }

  // 댓글 ID를 추출합니다.
  const archiveCommentIds = archiveComments.map((comment) => comment.id);
  const forumCommentIds = forumComments.map((comment) => comment.id);
  const qnaCommentIds = qnaComments.map((comment) => comment.id);

  const likesCounts = [
    supabase.from('archive_comment_likes').select('comment_id').in('comment_id', archiveCommentIds),
    supabase.from('forum_comment_likes').select('comment_id').in('comment_id', forumCommentIds),
    supabase.from('qna_comment_likes').select('comment_id').in('comment_id', qnaCommentIds)
  ];

  const [archiveLikesCounts, forumLikesCounts, qnaLikesCounts] = await Promise.all(likesCounts);

  // post ID를 추출합니다.
  const archivePostId = archiveComments.map((post) => post.post_id);
  const forumPostId = forumComments.map((post) => post.post_id);
  const qnaPostId = qnaComments.map((post) => post.post_id);

  // 댓글 ID로 각 게시물 테이블에서 댓글 정보를 가져옵니다.
  const postFetches = [
    supabase.from('archive_posts').select('*').in('id', archivePostId),
    supabase.from('forum_posts').select('*').in('id', forumPostId),
    supabase.from('qna_posts').select('*').in('id', qnaPostId)
  ];

  const tagFetches = [
    supabase.from('archive_tags').select('post_id, tag').in('post_id', archivePostId),
    supabase.from('forum_tags').select('post_id, tag').in('post_id', forumPostId),
    supabase.from('qna_tags').select('post_id, tag').in('post_id', qnaPostId)
  ];
  const commentCounts = [
    supabase.from('archive_comments').select('post_id').in('post_id', archivePostId),
    supabase.from('forum_comments').select('post_id').in('post_id', forumPostId),
    supabase.from('qna_comments').select('post_id').in('post_id', qnaPostId)
  ];

  const [archivePosts, forumPosts, qnaPosts] = await Promise.all(postFetches);
  const [archiveTags, forumTags, qnaTags] = await Promise.all(tagFetches);

  const [archiveCommentCounts, forumCommentCounts, qnaCommentCounts] = await Promise.all(commentCounts);

  const postUserIds = [
    ...archivePosts.data!.map((c) => c.user_id),
    ...forumPosts.data!.map((c) => c.user_id),
    ...qnaPosts.data!.map((c) => c.user_id)
  ];

  const { data: postUsers, error: postUserError } = await supabase
    .from('users')
    .select('id, nickname, profile_image')
    .in('id', postUserIds);

  if (postUserError) {
    return NextResponse.json({ error: '게시글 유저 정보 가져오기 실패' }, { status: 500 });
  }

  // 수 데이터 정리
  const createCommentMap = (Counts: { post_id: string }[]) =>
    Counts.reduce<Record<string, number>>((acc, { post_id }) => ((acc[post_id] = (acc[post_id] || 0) + 1), acc), {});

  const createlikeMap = (Counts: { comment_id: string }[]) =>
    Counts.reduce<Record<string, number>>(
      (acc, { comment_id }) => ((acc[comment_id] = (acc[comment_id] || 0) + 1), acc),
      {}
    );

  const commentData = {
    archiveComments: archiveComments.map((comment) => ({
      ...comment,
      likesCount: createlikeMap(archiveLikesCounts.data!)[comment.id] || 0
    })),
    forumComments: forumComments.map((comment) => ({
      ...comment,
      likesCount: createlikeMap(forumLikesCounts.data!)[comment.id] || 0
    })),
    qnaComments: qnaComments.map((comment) => ({
      ...comment,
      likesCount: createlikeMap(qnaLikesCounts.data!)[comment.id] || 0
    }))
  };

  const postData = {
    archivePosts: archivePosts.data!.map((post) => ({
      ...post,
      user: postUsers.find((user) => user.id === post.user_id),
      tags: archiveTags.data!.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag),
      commentsCount: createCommentMap(archiveCommentCounts.data!)[post.id] || 0
    })),
    forumPosts: forumPosts.data!.map((post) => ({
      ...post,
      user: postUsers.find((user) => user.id === post.user_id),
      tags: forumTags.data!.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag),
      commentsCount: createCommentMap(forumCommentCounts.data!)[post.id] || 0
    })),
    qnaPosts: qnaPosts.data!.map((post) => ({
      ...post,
      user: postUsers.find((user) => user.id === post.user_id),
      tags: qnaTags.data!.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag),
      commentsCount: createCommentMap(qnaCommentCounts.data!)[post.id] || 0
    }))
  };

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

export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const { commentsToDelete } = await req.json();

  for (const comment of commentsToDelete) {
    const { category, id } = comment;

    // 댓글 삭제
    if (category === 'archive') {
      const { error } = await supabase.from('archive_comments').delete().eq('id', id);
      if (error) throw new Error(`댓글 삭제 실패 (archive): ${error.message}`);
    } else if (category === 'forum') {
      const { error } = await supabase.from('forum_comments').delete().eq('id', id);
      if (error) throw new Error(`댓글 삭제 실패 (forum): ${error.message}`);
    } else if (category === 'qna') {
      const { error } = await supabase.from('qna_comments').delete().eq('id', id);
      if (error) throw new Error(`댓글 삭제 실패 (qna): ${error.message}`);
    } else {
      throw new Error('유효하지 않은 카테고리');
    }
  }

  return NextResponse.json({ success: true });
}
