import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/client';

const supabase = createClient();

export async function GET(request: NextRequest) {
  // 임시 사용자 ID
  const userId = 'd8e37eff-f7fa-4aea-9382-dd224d9fcd07';

  // 사용자 ID로 좋아요를 가져옵니다.
  const { data: archiveLikes, error: archiveError } = await supabase
    .from('archive_likes')
    .select('post_id')
    .eq('user_id', userId);

  const { data: forumLikes, error: forumError } = await supabase
    .from('forum_likes')
    .select('post_id')
    .eq('user_id', userId);

  const { data: qnaLikes, error: qnaError } = await supabase.from('qna_likes').select('post_id').eq('user_id', userId);

  // 좋아요를 가져오는 데 실패한 경우, 오류 응답을 반환합니다.
  if (archiveError || forumError || qnaError) {
    return NextResponse.json({ error: '좋아요 가져오기 실패' }, { status: 500 });
  }

  // 좋아요에서 게시물 ID를 추출합니다.
  const postIds = [
    ...archiveLikes.map((b) => b.post_id),
    ...forumLikes.map((b) => b.post_id),
    ...qnaLikes.map((b) => b.post_id)
  ];

  // 게시물 ID로 각 게시물 테이블에서 게시물 정보를 가져옵니다.
  const postFetches = [
    supabase.from('archive_posts').select('*, archive_tags(tag)').in('id', postIds),
    supabase.from('forum_posts').select('*, forum_tags(tag)').in('id', postIds),
    supabase.from('qna_posts').select('*, qna_tags(tag)').in('id', postIds)
  ];

  const [archivePosts, forumPosts, qnaPosts] = await Promise.all(postFetches);

  // 게시물을 가져오는 데 실패한 경우, 오류 응답을 반환합니다.
  if (archivePosts.error || forumPosts.error || qnaPosts.error) {
    return NextResponse.json({ error: '게시물 가져오기 실패' }, { status: 500 });
  }

  // 게시물 데이터를 통합합니다.
  const allPosts = {
    archivePosts: archivePosts.data,
    forumPosts: forumPosts.data,
    qnaPosts: qnaPosts.data
  };

  // 최종 결과를 응답으로 반환합니다.
  return NextResponse.json(allPosts, { status: 200 });
}
