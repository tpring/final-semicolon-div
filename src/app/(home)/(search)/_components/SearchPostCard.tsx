import CommentBubble from '@/assets/images/common/CommentBubble';
import LikeButton from '@/components/common/LikeButton';
import Link from 'next/link';

type SearchPostCardProps = {
  post: Post;
};

type Post = {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  created_at: string;
  category: 'archive' | 'forum' | 'qna';
  forum_category?: string;
  likescount: string;
  commentsCount: string;
  user: {
    id: string;
    nickname: string;
    profile_image?: string;
  };
  tag?: { tag: string }[];
};

const SearchPostCard = ({ post }: SearchPostCardProps) => {
  const formCategory = post.category === 'forum' ? post.forum_category : undefined;

  let tags: string[] = [];

  if (post.category === 'archive') {
    tags = Array.isArray(post.tag) ? post.tag.map((tag) => tag.tag) : [];
  } else if (post.category === 'forum') {
    tags = Array.isArray(post.tag) ? post.tag.map((tag) => tag.tag) : [];
  } else if (post.category === 'qna') {
    tags = Array.isArray(post.tag) ? post.tag.map((tag) => tag.tag) : [];
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString();
  const cleanDate = formattedDate.endsWith('.') ? formattedDate.slice(0, -1) : formattedDate;

  const handleLikeButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation;
  };

  return (
    <Link href={`/${post.category}/${post.id}`}>
      <div className="p-[20px_24px] w-[592px] h-[381px] border border-neutral-100 rounded-2xl flex flex-col">
        <div className="flex-1">
          <div className=" mb-7">
            <div className="flex items-center text-body1 font-regular text-neutral-500">
              {post.category === 'qna' ? <p> Q&A </p> : post.category === 'forum' ? <p> 포럼</p> : <p> 아카이브 </p>}
              {formCategory && <p className="ml-4 text-body2">{formCategory}</p>}
            </div>
            <p className="text-body1 font-bold text-neutral-800 "> {post.title}</p>
          </div>

          {tags.length === 0 ? (
            <div className=" text-body1 font-regular text-neutral-500 overflow-hidden line-clamp-6 break-words whitespace-pre-wrap">
              {post.content}
            </div>
          ) : (
            <div className="text-body1 font-regular text-neutral-500 overflow-hidden line-clamp-5 break-words whitespace-pre-wrap">
              {post.content}
            </div>
          )}
        </div>
        {tags.length > 0 && (
          <div className="my-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className=" bg-neutral-50 text-neutral-700 text-subtitle2 font-medium rounded-[4px] p-[4px_12px] mr-[6px]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center">
          <span className="text-body1 font-medium text-neutral-800">{post.user.nickname}</span>
        </div>

        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="mr-5" onClick={handleLikeButtonClick}>
              <LikeButton id={post.id} type={post.category} />
            </span>
            <CommentBubble stroke="#8F8F8F" />
            <span className="flex ml-1">{post.commentsCount}</span>
          </div>
          <div>
            <span>{cleanDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchPostCard;
