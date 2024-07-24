'use client';

import useFetchForumPosts from '@/hooks/conference/useFetchForumPosts';

const ForumPosts = () => {
  const { data: posts = [], error, isPending, isStale } = useFetchForumPosts();

  if (isStale && isPending) return <div>Loading...</div>;

  if (error) return <div>Error Fetching Posts</div>;

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>{post.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForumPosts;
