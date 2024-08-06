import CommentBubble from '@/assets/images/common/CommentBubble';
import Dot from '@/assets/images/common/Dot';
import Share from '@/assets/images/common/Share';
import BookmarkButton from '@/components/common/BookmarkButton';
import LikeButton from '@/components/common/LikeButton';
import { cutText, filterSlang, markdownCutText, markdownFilterSlang } from '@/utils/markdownCut';
import TagBlock from '@/components/common/TagBlock';
import { handleLinkCopy } from '@/components/handleLinkCopy';
import { PostCardProps } from '@/types/posts/forumTypes';
import { timeForToday } from '@/utils/timeForToday';
import MDEditor from '@uiw/react-md-editor';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

const removeImageLinks = (markdown: string) => {
  return markdown.replace(/!\[.*?\]\(.*?\)/g, '');
};

const PostCard = ({ post }: PostCardProps) => {
  const processedContent = removeImageLinks(post.content);
  return (
    <div className="post-card max-w-[844px] mx-auto p-4 bg-white mb-1 border-b-2 border-b-neutral-50">
      <Link href={`/forum/${post.id}`}>
        <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 h-[48px] relative gap-4 py-1">
          <div className="relative w-10 h-10">
            {post.user.profile_image && (
              <Image
                src={post.user.profile_image}
                alt="User Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col justify-start items-start self-stretch flex-grow gap-1">
            <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1">
              <p className="flex-grow font-medium text-body1 text-left text-neutral-900">{post.user.nickname}</p>
            </div>
            <div className="flex justify-start items-center self-stretch flex-grow relative gap-2">
              <p className="flex-grow-0 font-regular flex-shrink-0 text-body2 text-left text-neutral-300">
                {post.forum_category}
              </p>
              <Dot />
              <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative">
                <p className="flex-grow-0 font-regular flex-shrink-0 text-body2 text-left text-neutral-300">
                  {timeForToday(post.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="post-image mt-2">
          {post.thumbnail && (
            <Image src={post.thumbnail} alt="Post Thumbnail" width={300} height={300} objectFit="cover" />
          )}
        </div>
        <h2 className="text-h4 font-bold text-neutral-900 mt-3">{filterSlang(post.title)}</h2>
        <div className="post-content mt-2 custom-markdown" data-color-mode="light">
          <MDEditor.Markdown source={markdownFilterSlang(markdownCutText(processedContent, 500))} />
        </div>

        <div className="post-tags mt-2">
          {post.forum_tags &&
            post.forum_tags.map((tag) => (
              <div
                key={tag.id}
                className="inline-block border bg-neutral-50 border-neutral-50 m-1 flex-wrap max-h-[40px] overflow-hidden"
              >
                <span
                  key={tag.id}
                  className="inline-block text-body2 text-neutral-700 px-1 whitespace-nowrap "
                  style={{ maxWidth: '100%' }}
                >
                  #{tag.tag}
                </span>
              </div>
            ))}
        </div>
      </Link>
      <div className="flex items-center justify-between max-w-[844px] mx-auto">
        <div className="post-date mt-1 text-sm text-neutral-300">
          {dayjs(post.created_at).format('YYYY-MM-DD HH:mm')}
        </div>
        <div className="post-stats mt-2 flex items-center">
          <div className="flex items-center justify-center mr-2">
            <LikeButton id={post.id} type="forum" />
          </div>
          <div className="flex items-center justify-center mr-1">
            <BookmarkButton id={post.id} type="forum" />
          </div>
          <div className="flex items-center justify-center">
            <button onClick={() => handleLinkCopy(`${process.env.NEXT_PUBLIC_BASE_URL}/forum/${post.id}`)}>
              <Share />
            </button>
          </div>
          <span className="flex items-center justify-center ml-2">
            <CommentBubble />
            <span className="ml-1">{post.forum_comment[0]?.count || 0}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
