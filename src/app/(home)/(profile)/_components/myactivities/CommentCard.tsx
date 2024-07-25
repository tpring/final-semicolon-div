import React from 'react';

//임시 이동 예정
type CommentCardProps = {
  title: string;
  comment: string;
  tags: string[];
  time: Date;
};

const CommentCard = ({ title, comment, tags, time }: CommentCardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {tags ? <p className="mb-2">{tags.join(', ')}</p> : <div></div>}
      <p className="mt-2">{comment}</p>
      <p className="text-sm text-gray-500 mt-1">{time.toLocaleString()}</p>
    </div>
  );
};

export default CommentCard;
