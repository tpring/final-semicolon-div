import React from 'react';
import PostCard from './PostCard';
import CommentCard from './CommentCard';

//임시
type PostType = {
  id: string;
  type: 'post';
  title: string;
  content: string;
  image: string;
  tags: string[];
  time: Date;
};

type CommentType = {
  id: string;
  type: 'comment';
  title: string;
  postId: string;
  comment: string;
  userNickname: string;
  userImage: string;
  time: Date;
};

type PostOrComment = PostType | CommentType;

const MyPostsList = (filter: any) => {
  // 예시 데이터
  const postsAndComments: PostOrComment[] = [
    // 게시글과 댓글 데이터가 여기에 들어갑니다.
  ];
  const sortedPostsAndComments = postsAndComments.sort((a, b) => b.time.getTime() - a.time.getTime());
  return (
    <div>
      {sortedPostsAndComments.map((item) => {
        if (item.type === 'post') {
          return (
            <PostCard
              key={item.id}
              title={item.title}
              content={item.content}
              image={item.image}
              tags={item.tags}
              time={item.time}
            />
          );
        } else if (item.type === 'comment') {
          return (
            <CommentCard
              key={item.id}
              title={item.title}
              comment={item.comment}
              userNickname={item.userNickname}
              userImage={item.userImage}
              time={item.time}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default MyPostsList;
