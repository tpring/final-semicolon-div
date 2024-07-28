import PostCard from './PostCard';
import CommentCard from './CommentCard';
import { useLikesComments, useLikesPosts } from '@/hooks/useLikes';

type CombinedItem =
  | {
      type: 'post';
      id: string;
      title: string;
      content: string;
      thumbnail: string;
      tags: string[];
      created_at: string;
      category: string;
      forum_category: string;
      user: {
        id: string;
        nickname: string;
        profile_image: string;
      };
    }
  | {
      type: 'comment';
      id: string;
      title: string;
      tags: string[];
      comment: string;
      created_at: string;
      category: string;
      user: {
        id: string;
        nickname: string;
        profile_image: string;
      };
    };

const LikesList = () => {
  const {
    data: posts = { archivePosts: [], forumPosts: [], qnaPosts: [] },
    error: postError,
    isLoading: postLoading
  } = useLikesPosts();

  const {
    data: comments = {
      archive: { commentPosts: [], comments: [] },
      forum: { commentPosts: [], comments: [] },
      qna: { commentPosts: [], comments: [] }
    },
    error: commentError,
    isLoading: commentLoading
  } = useLikesComments();

  if (postLoading || commentLoading) return <div>Loading...</div>;
  if (postError || commentError) return <div>Error: {postError?.message || commentError?.message}</div>;

  const postArray = [...posts.archivePosts, ...posts.forumPosts, ...posts.qnaPosts];
  const commentPostArray = [...comments.archive.posts, ...comments.forum.posts, ...comments.qna.posts];
  const commentArray = [...comments.archive.comments, ...comments.forum.comments, ...comments.qna.comments];

  const postMap = new Map<string, { title: string; tags: string[] }>();
  commentPostArray.forEach((post) => {
    postMap.set(post.id, {
      title: post.title,
      tags: post.tags || []
    });
  });

  const combinedItems: CombinedItem[] = [
    ...postArray.map((post) => ({
      type: 'post' as const,
      id: post.id,
      title: post.title,
      content: post.content,
      thumbnail: post.thumbnail || '',
      category: post.category,
      tags: post.tags || [],
      created_at: post.created_at,
      forum_category: post.forum_category || '',
      user: {
        id: post.user.id,
        nickname: post.user.nickname,
        profile_image: post.user.profile_image
      }
    })),
    ...commentArray.map((comment) => {
      const postInfo = postMap.get(comment.post_id) || { title: '', tags: [] };
      return {
        type: 'comment' as const,
        id: comment.id,
        title: postInfo.title,
        tags: postInfo.tags,
        comment: comment.comment,
        created_at: comment.created_at,
        category: comment.category,
        user: {
          id: comment.user.id,
          nickname: comment.user.nickname,
          profile_image: comment.user.profile_image
        }
      };
    })
  ];

  combinedItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div>
      <h2>좋아요 목록</h2>
      {combinedItems.length === 0 ? (
        <div>좋아요를 추가해보세요</div>
      ) : (
        combinedItems.map((item) => (
          <div key={item.id} className="mb-6">
            {item.type === 'post' ? (
              <PostCard
                title={item.title}
                content={item.content}
                thumbnail={item.thumbnail}
                tags={item.tags}
                time={item.created_at}
                category={item.category}
                forum_category={item.forum_category}
                nickname={item.user.nickname}
                profile_image={item.user.profile_image}
              />
            ) : (
              <CommentCard
                title={item.title}
                tags={item.tags}
                comment={item.comment}
                time={new Date(item.created_at)}
                category={item.category}
                nickname={item.user.nickname}
                profile_image={item.user.profile_image}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default LikesList;
