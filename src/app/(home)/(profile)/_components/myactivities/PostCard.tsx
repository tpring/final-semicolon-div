import React from 'react';

interface PostCardProps {
  title: string;
  content: string;
  tags: string[];
  time: Date;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, tags, time }) => {
  return (
    <div>
      <p>{title}</p>
      <p>{content}</p>
      <p>{tags.join(', ')}</p>
      <p>{time.toLocaleString()}</p>
    </div>
  );
};

export default PostCard;
