import React from 'react';

type CommentCardProps = {
  title: string;
  comment: string;
  userNickname: string;
  userImage: string;
  time: Date;
};

const CommentCard = ({ title, comment, userNickname, userImage, time }: CommentCardProps) => {
  return (
    <div>
      <p>{title}</p>
      <p>{comment}</p>
      <p>
        <img src={userImage} alt="user Image" />
      </p>{' '}
      <p>
        <img src={userNickname} alt="user Nickname" />
      </p>
      <p>{time.toLocaleString()}</p>
    </div>
  );
};

export default CommentCard;
