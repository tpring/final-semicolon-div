import React from 'react';

type PostCardProps = {
  title: string;
  content: string;
  image: string;
  tags: string[];
  time: Date;
};

const PostCard = ({ title, content, image, tags, time }: PostCardProps) => {
  return (
    <div>
      <p>{title}</p>
      <p>
        {content}
        <img src={image} alt="post Image" />
      </p>
      <p>{tags.join(', ')}</p>
      <p>{time.toLocaleString()}</p>
    </div>
  );
};

export default PostCard;
