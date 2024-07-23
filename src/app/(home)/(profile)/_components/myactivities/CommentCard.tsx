import React from 'react';

interface CommentCardProps {
  content: string;
  profilePicture: string;
  image: string;
  time: Date;
}

const CommentCard: React.FC<CommentCardProps> = ({ content, profilePicture, image, time }) => {
  return (
    <div>
      <p>{content}</p>
      <p>
        <img src={profilePicture} alt="Profile" />
      </p>
      <p>
        <img src={image} alt="Comment Image" />
      </p>
      <p>{time.toLocaleString()}</p>
    </div>
  );
};

export default CommentCard;
