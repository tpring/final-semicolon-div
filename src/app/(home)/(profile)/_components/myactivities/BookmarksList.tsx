import React from 'react';
import PostCard from './PostCard';
import CommentCard from './CommentCard';
import { useBookmarksComments, useBookmarksPosts } from '@/hooks/useBookmarks';

//임시 이동 예정
type Tag = {
  id: string;
  post_id: string;
  tag: string;
};

//임시 이동 예정
type CombinedItem =
  | {
      type: 'post';
      id: string;
      title: string;
      content: string;
      image: string;
      tags: string[];
      created_at: string;
    }
  | {
      type: 'comment';
      id: string;
      title: string;
      tags: string[];
      comment: string;
      created_at: string;
    };

const BookmarksList = () => {
  const {
    data: posts = { archivePosts: [], forumPosts: [], qnaPosts: [] },
    error: postError,
    isLoading: postLoading
  } = useBookmarksPosts();

  const {
    data: comments = {
      archive: { posts: [], comments: [] },
      forum: { posts: [], comments: [] },
      qna: { posts: [], comments: [] }
    },
    error: commentError,
    isLoading: commentLoading
  } = useBookmarksComments();

  if (postLoading || commentLoading) return <div>Loading...</div>;
  if (postError || commentError) return <div>Error: {postError?.message || commentError?.message}</div>;

  // 게시물과 댓글을 하나의 배열로 병합
  const postArray = [...posts.archivePosts, ...posts.forumPosts, ...posts.qnaPosts];
  const commentArray = [...comments.archive.comments, ...comments.forum.comments, ...comments.qna.comments];

  // 게시물 데이터를 ID를 기준으로 맵핑하여 조회할 수 있도록 합니다.
  const postMap = new Map<string, { title: string; tags: string[] }>();
  postArray.forEach((post) => {
    postMap.set(post.id, {
      title: post.title,
      tags: Array.isArray(post.tags) ? post.tags.map((tag: Tag) => tag.tag) : []
    });
  });

  // CombinedItem 배열을 생성합니다.
  const combinedItems: CombinedItem[] = [
    ...postArray.map((post) => ({
      type: 'post' as const,
      id: post.id,
      title: post.title,
      content: post.content,
      image: (post.images && post.images.length > 0 ? post.images[0]?.image_url : '') || '',
      tags: Array.isArray(post.tags) ? post.tags.map((tag: Tag) => tag.tag) : [],
      created_at: post.created_at
    })),
    ...commentArray.map((comment) => {
      // 댓글이 참조하는 게시물의 정보를 가져옵니다.
      const postInfo = postMap.get(comment.post_id) || { title: '', tags: [] };
      return {
        type: 'comment' as const,
        id: comment.id,
        title: postInfo.title,
        tags: postInfo.tags,
        comment: comment.comment,
        created_at: comment.created_at
      };
    })
  ];

  // combinedItems를 생성일 기준으로 내림차순 정렬합니다.
  combinedItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div>
      <h2>북마크 목록</h2>
      {combinedItems.length === 0 ? (
        <div>북마크를 추가해보세요</div>
      ) : (
        combinedItems.map((item) => (
          <div key={item.id} className="mb-6">
            {item.type === 'post' ? (
              <PostCard
                title={item.title}
                content={item.content}
                image={item.image}
                tags={item.tags}
                time={item.created_at}
              />
            ) : (
              <CommentCard
                title={item.title}
                tags={item.tags}
                comment={item.comment}
                time={new Date(item.created_at)}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarksList;
