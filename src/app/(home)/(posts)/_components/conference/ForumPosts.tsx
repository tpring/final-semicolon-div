'use client';

import { UUID } from 'crypto';
import { useEffect, useState } from 'react';

type Post = {
  id: UUID;
  title: string;
  content: string;
  created_at: string;
};

const fetchForumPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch('/api/posts/conference');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error Fetching Forum Posts', error);
    return [];
  }
};

const ForumPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchForumPosts();
      setPosts(fetchedPosts);
    };
    getPosts();
  }, []);

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
