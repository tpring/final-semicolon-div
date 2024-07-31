import Image from 'next/image';
import React from 'react';

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
  user: {
    id: string;
    nickname: string;
    profile_image?: string;
  };
  tag?: { tag: string }[];
  likecount: { count: string }[];
  commentsCount: string;
};

const SearchPostCard = ({ post }: SearchPostCardProps) => {
  const formCategory = post.category === 'forum' ? post.forum_category : undefined;

  let tags: string[] = [];
  let likeCount = 0;

  if (post.category === 'archive') {
    tags = Array.isArray(post.tag) ? post.tag.map((tag) => tag.tag) : [];
    likeCount = Number(post.likecount[0]?.count) || 0;
  } else if (post.category === 'forum') {
    tags = Array.isArray(post.tag) ? post.tag.map((tag) => tag.tag) : [];
    likeCount = Number(post.likecount[0]?.count) || 0;
  } else if (post.category === 'qna') {
    tags = Array.isArray(post.tag) ? post.tag.map((tag) => tag.tag) : [];
    likeCount = Number(post.likecount[0]?.count) || 0;
  }

  return (
    <div className="w-[560px] h-[316px] border border-main-400 p-4 flex flex-col mb-4">
      <div className="flex-1">
        <p>카테고리: {post.category}</p>
        {formCategory && <p>{formCategory}</p>}
        <p>제목: {post.title}</p>
        <p className="line-clamp-4">내용: {post.content}</p>
        {post.thumbnail && <Image src={post.thumbnail} alt="Post Thumbnail" width={200} height={200} />}
        {tags.length > 0 && <p className="mb-2">{tags.join(', ')}</p>}
      </div>
      <div className="mt-auto">
        <div className="flex items-center">
          <Image src={post.user.profile_image!} alt="Profile Image" width={50} height={50} className="rounded-full" />
          <span className="ml-2">{post.user.nickname}</span>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <div>
            <span>♡ {likeCount}</span>
            <span> | 💭 {post.commentsCount}</span>
          </div>
          <div>
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPostCard;
