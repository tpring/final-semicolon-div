import React from 'react';
import Image from 'next/image';

type PostCardProps = {
  title: string;
  content: string;
  image?: string;
  tags: string[];
  time: string;
};

const PostCard = ({ title, content, image, tags, time }: PostCardProps) => {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-2">{content}</p>
      {image ? <Image src={image} alt="Post" width={600} height={400} /> : <div></div>}
      {tags ? <p className="mb-2">{tags.join(', ')}</p> : <div></div>}
      <p className="text-gray-600">{new Date(time).toLocaleString()}</p>
    </div>
  );
};

export default PostCard;
