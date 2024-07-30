import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const userId = request.headers.get('user-id');

  if (!userId) {
    return NextResponse.json({ error: 'User ID가 없습니다.' }, { status: 400 });
  }

  // 내가 작성한 게시물 관련 데이터 가져오기
  const { data: archivePosts, error: archiveError } = await supabase
    .from('archive_posts')
    .select('*')
    .eq('user_id', userId);

  const { data: forumPosts, error: forumError } = await supabase.from('forum_posts').select('*').eq('user_id', userId);

  const { data: qnaPosts, error: qnaError } = await supabase.from('qna_posts').select('*').eq('user_id', userId);

  if (archiveError || forumError || qnaError) {
    return NextResponse.json({ error: '내가 작성한 게시물 가져오기 실패' }, { status: 500 });
  }

  const postIds = [...archivePosts.map((c) => c.id), ...forumPosts.map((c) => c.id), ...qnaPosts.map((c) => c.id)];

  const tagFetches = [
    supabase.from('archive_tags').select('post_id,tag').in('id', postIds),
    supabase.from('forum_tags').select('post_id,tag').in('id', postIds),
    supabase.from('qna_tags').select('post_id,tag').in('id', postIds)
  ];

  const [archiveTagsResponse, forumTagsResponse, qnaTagsResponse] = await Promise.all(tagFetches);

  if (archiveTagsResponse.error || forumTagsResponse.error || qnaTagsResponse.error) {
    return NextResponse.json({ error: '게시물 또는 태그 가져오기 실패' }, { status: 500 });
  }

  const postData = {
    archivePosts: archivePosts.map((post) => ({
      ...post,
      tags: archiveTagsResponse.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag)
    })),
    forumPosts: forumPosts.map((post) => ({
      ...post,
      tags: forumTagsResponse.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag)
    })),
    qnaPosts: qnaPosts.map((post) => ({
      ...post,
      tags: qnaTagsResponse.data.filter((tag) => tag.post_id === post.id).map((tag) => tag.tag)
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
  const { commentsToDelete } = await req.json();

  for (const comment of commentsToDelete) {
    const { category, id } = comment;

    // 댓글 삭제
    if (category === 'archive') {
      const { error } = await supabase.from('archive_posts').delete().eq('id', id);
      if (error) throw new Error(`댓글 삭제 실패 (archive): ${error.message}`);
    } else if (category === 'forum') {
      const { error } = await supabase.from('forum_posts').delete().eq('id', id);
      if (error) throw new Error(`댓글 삭제 실패 (forum): ${error.message}`);
    } else if (category === 'qna') {
      const { error } = await supabase.from('qna_posts').delete().eq('id', id);
      if (error) throw new Error(`댓글 삭제 실패 (qna): ${error.message}`);
    } else {
      throw new Error('유효하지 않은 카테고리');
    }
  }

  return NextResponse.json({ success: true });
}
