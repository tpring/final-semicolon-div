import { CombinedItem, PostsData, CommentsData, MyCombinedItem, MyPost } from '@/types/profile/profileType';

export const combineItems = (posts: PostsData, comments: CommentsData): CombinedItem[] => {
  const postArray = [...posts.archivePosts, ...posts.forumPosts, ...posts.qnaPosts];
  const commentPostArray = [...comments.archive.posts, ...comments.forum.posts, ...comments.qna.posts];
  const commentArray = [...comments.archive.comments, ...comments.forum.comments, ...comments.qna.comments];

  const postMap = new Map<string, { title: string; tags: string[]; category: string; forum_category: string }>();
  commentPostArray.forEach((post) => {
    postMap.set(post.id, {
      title: post.title,
      tags: post.tags || [],
      category: post.category,
      forum_category: post.forum_category || ''
    });
  });

  return [
    ...postArray.map((post) => ({
      type: 'post' as const,
      id: post.id,
      title: post.title,
      content: post.content,
      thumbnail: post.thumbnail || '',
      tags: post.tags || [],
      created_at: post.created_at,
      category: post.category,
      forum_category: post.forum_category || '',
      user: {
        id: post.user.id,
        nickname: post.user.nickname,
        profile_image: post.user.profile_image
      }
    })),
    ...commentArray.map((comment) => {
      const postInfo = postMap.get(comment.post_id) || { title: '', tags: [], category: '', forum_category: '' };
      return {
        type: 'comment' as const,
        id: comment.id,
        post_id: comment.post_id,
        title: postInfo.title,
        tags: postInfo.tags,
        comment: comment.comment,
        created_at: comment.created_at,
        category: postInfo.category,
        forum_category: postInfo.forum_category,
        user: {
          id: comment.user.id,
          nickname: comment.user.nickname,
          profile_image: comment.user.profile_image
        }
      };
    })
  ];
};

export const myCombineItems = (posts: PostsData, comments: CommentsData): MyCombinedItem[] => {
  const postArray = [...posts.archivePosts, ...posts.forumPosts, ...posts.qnaPosts];

  const commentPostArray = [...comments.archive.posts, ...comments.forum.posts, ...comments.qna.posts];
  const commentArray = [...comments.archive.comments, ...comments.forum.comments, ...comments.qna.comments];

  const postMap = new Map<string, MyPost>();
  commentPostArray.forEach((post) => {
    postMap.set(post.id, {
      type: 'post',
      id: post.id,
      title: post.title,
      content: post.content,
      thumbnail: post.thumbnail || '',
      tags: post.tags || [],
      created_at: post.created_at,
      category: post.category,
      forum_category: post.forum_category || ''
    });
  });

  return [
    ...postArray.map((post) => ({
      type: 'post' as const,
      id: post.id,
      title: post.title,
      content: post.content,
      thumbnail: post.thumbnail || '',
      tags: post.tags || [],
      created_at: post.created_at,
      category: post.category,
      forum_category: post.forum_category || ''
    })),
    ...commentArray.map((comment) => {
      const postInfo = postMap.get(comment.post_id) || {
        title: '',
        tags: [],
        category: '',
        forum_category: ''
      };

      return {
        type: 'comment' as const,
        id: comment.id,
        post_id: comment.post_id,
        title: postInfo.title,
        tags: postInfo.tags,
        comment: comment.comment,
        created_at: comment.created_at,
        category: postInfo.category,
        forum_category: postInfo.forum_category,
        user: comment.user
      };
    })
  ];
};
