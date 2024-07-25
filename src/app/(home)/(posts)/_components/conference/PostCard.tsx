import { PostCardProps } from '@/types/posts/forum';
import MDEditor from '@uiw/react-md-editor';
import dayjs from 'dayjs';
import Image from 'next/image';

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          {post.user.profile_image && (
            <Image src={post.user.profile_image} alt="User Profile" width={40} height={40} className="user-profile" />
          )}
          <span>{post.user.nickname}</span>
        </div>
        <span className="post-type">{post.category}</span>
      </div>
      <h2>{post.title}</h2>
      {post.forum_image && post.forum_image.length > 0 && (
        <div className="post-image">
          {post.forum_image.map(
            (image) =>
              image.image_url && (
                <Image
                  key={image.id}
                  src={image.image_url}
                  alt="Post Image"
                  width={300}
                  height={300}
                  objectFit="cover"
                />
              )
          )}
        </div>
      )}
      <div className="post-content">
        <MDEditor.Markdown source={post.content} />
      </div>
      <div className="post-stats">
        <span>댓글:{post.forum_comment[0]?.count || 0}</span>
        <span>좋아요:{post.forum_like[0]?.count || 0}</span>
      </div>
      <div className="post-date">{dayjs(post.updated_at).format('YYYY-MM-DD')}</div>
      <div className="post-tags">
        {post.forum_tags &&
          post.forum_tags.map((tag) => (
            <span key={tag.id} className="tag">
              {tag.tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default PostCard;
