import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { searchParams } = new URL(request.url);
  const searchType = searchParams.get('searchType');
  const keyword = searchParams.get('keyword');

  const searchPosts = [];
  if (searchType === 'title') {
    searchPosts.push(
      supabase.from('archive_posts').select(`*, tag:archive_tags(tag), user:users(*)`).ilike('title', `%${keyword}%`),

      supabase.from('forum_posts').select(`*, tag:forum_tags(tag), user:users(*)`).ilike('title', `%${keyword}%`),

      supabase.from('qna_posts').select(`*, tag:qna_tags(tag), user:users(*)`).ilike('title', `%${keyword}%`)
    );
  } else if (searchType === 'tag') {
    const tagFetches = [
      supabase.from('archive_tags').select('post_id, tag').in('tag', [keyword]),
      supabase.from('forum_tags').select('post_id, tag').in('tag', [keyword]),
      supabase.from('qna_tags').select('post_id, tag').in('tag', [keyword])
    ];

    const [archiveTag, forumTag, qnaTag] = await Promise.all(tagFetches);

    const archivePosts = archiveTag.data || [];
    const forumPosts = forumTag.data || [];
    const qnaPosts = qnaTag.data || [];

    const PostIds = [
      ...archivePosts.map((b) => b.post_id),
      ...forumPosts.map((b) => b.post_id),
      ...qnaPosts.map((b) => b.post_id)
    ];

    searchPosts.push(
      supabase.from('archive_posts').select(`*, tag:archive_tags(tag), user:users(*)`).in('id', PostIds),

      supabase.from('forum_posts').select(`*, tag:forum_tags(tag), user:users(*)`).in('id', PostIds),

      supabase.from('qna_posts').select(`*, tag:qna_tags(tag), user:users(*)`).in('id', PostIds)
    );
  }

  const [archiveSearch, forumSearch, qnaSearch] = await Promise.all(searchPosts);

  const archivePosts = archiveSearch.data || [];
  const forumPosts = forumSearch.data || [];
  const qnaPosts = qnaSearch.data || [];

  const PostIds = [...archivePosts.map((b) => b.id), ...forumPosts.map((b) => b.id), ...qnaPosts.map((b) => b.id)];

  const commentLikesCounts = [
    supabase.from('archive_likes').select('post_id', { count: 'exact' }).in('post_id', PostIds),
    supabase.from('forum_likes').select('post_id', { count: 'exact' }).in('post_id', PostIds),
    supabase.from('qna_likes').select('post_id', { count: 'exact' }).in('post_id', PostIds),
    supabase.from('archive_comments').select('post_id', { count: 'exact' }).in('post_id', PostIds),
    supabase.from('forum_comments').select('post_id', { count: 'exact' }).in('post_id', PostIds),
    supabase.from('qna_comments').select('post_id', { count: 'exact' }).in('post_id', PostIds)
  ];

  const [
    archiveLikesCounts,
    forumLikesCounts,
    qnaLikesCounts,
    archiveCommentCounts,
    forumCommentCounts,
    qnaCommentCounts
  ] = await Promise.all(commentLikesCounts);

  // 댓글 수 데이터 정리
  const createCommentMap = (Counts: { post_id: string }[]) =>
    Counts.reduce<Record<string, number>>((acc, { post_id }) => ((acc[post_id] = (acc[post_id] || 0) + 1), acc), {});

  const postData = {
    archivePosts: archivePosts.map((post) => ({
      ...post,
      commentsCount: createCommentMap(archiveCommentCounts.data!)[post.id] || 0,
      likescount: createCommentMap(archiveLikesCounts.data!)[post.id] || 0
    })),
    forumPosts: forumPosts.map((post) => ({
      ...post,
      commentsCount: createCommentMap(forumCommentCounts.data!)[post.id] || 0,
      likescount: createCommentMap(forumLikesCounts.data!)[post.id] || 0
    })),
    qnaPosts: qnaPosts.map((post) => ({
      ...post,
      commentsCount: createCommentMap(qnaCommentCounts.data!)[post.id] || 0,
      likescount: createCommentMap(qnaLikesCounts.data!)[post.id] || 0
    }))
  };
  const searchCombinedData = {
    archive: postData.archivePosts,
    forum: postData.forumPosts,
    qna: postData.qnaPosts
  };
  return NextResponse.json(searchCombinedData, { status: 200 });
}
