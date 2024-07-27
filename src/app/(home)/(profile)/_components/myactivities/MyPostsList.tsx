import PostCard from './PostCard';
import CommentCard from './CommentCard';

const MyPostsList = () => {
  // const sortedPostsAndComments = postsAndComments.sort((a, b) => b.time.getTime() - a.time.getTime());
  return (
    <div>
      <h1>MyPostsList</h1>
      {/* {sortedPostsAndComments.map((item) => {
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
      })} */}
    </div>
  );
};

export default MyPostsList;
