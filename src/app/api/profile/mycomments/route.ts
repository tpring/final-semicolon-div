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
  const postIds = [
    ...archiveComments.map((b) => b.post_id),
    ...forumComments.map((b) => b.post_id),
    ...qnaComments.map((b) => b.post_id)
  ];

  // 댓글 ID로 각 게시물 테이블에서 댓글 정보를 가져옵니다.
  const postFetches = [
    supabase.from('archive_posts').select('*').in('id', postIds),
    supabase.from('forum_posts').select('*').in('id', postIds),
    supabase.from('qna_posts').select('*').in('id', postIds)
  ];

  const tagFetches = [
    supabase.from('archive_tags').select('post_id, tag').in('post_id', postIds),
    supabase.from('forum_tags').select('post_id, tag').in('post_id', postIds),
    supabase.from('qna_tags').select('post_id, tag').in('post_id', postIds)
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

  const { data: postUsers, error: postUserError } = await supabase
    .from('users')
    .select('id, nickname, profile_image')
    .in('id', postUserIds);

  if (postUserError) {
    return NextResponse.json({ error: '게시글 유저 정보 가져오기 실패' }, { status: 500 });
  }

  const commentData = {
    archiveComments: archiveComments.map((comment) => ({
      ...comment
    })),
    forumComments: forumComments.map((comment) => ({
      ...comment
    })),
    qnaComments: qnaComments.map((comment) => ({
      ...comment
    }))
  };

  const postData = {
    archivePosts: archivePosts.data.map((post) => ({
      ...post,
      user: postUsers.find((user) => user.id === post.user_id),
      tags: archiveTags.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag)
    })),
    forumPosts: forumPosts.data.map((post) => ({
      ...post,
      user: postUsers.find((user) => user.id === post.user_id),
      tags: forumTags.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag)
    })),
    qnaPosts: qnaPosts.data.map((post) => ({
      ...post,
      user: postUsers.find((user) => user.id === post.user_id),
      tags: qnaTags.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag)
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
