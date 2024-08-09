'use client';

import Info from '@/assets/images/forum/Info';
import King from '@/assets/images/forum/King';
import Tooltip from '@/assets/images/forum/Tooltip';

import useFetchTopLikedPosts from '@/hooks/forum/useFetchTopLikedPosts';
import { Post } from '@/types/posts/forumTypes';
import { cutText } from '@/utils/markdownCut';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const BestForumPosts = () => {
  const { data, error, isPending } = useFetchTopLikedPosts();
  const [topPosts, setTopPosts] = useState<Post[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipToggle = () => {
    setShowTooltip(!showTooltip);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const sortedPosts = data.slice(0, 3);
      setTopPosts(sortedPosts);
    }
  }, [data]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  return (
    <div className="sticky top-10">
      <div className="border rounded-2xl px-6 py-5 min-w-80 max-w-80 min-h-[291px] max-h-[291px] border-neutral-100">
        <div className="flex items-center justify-between  border-b-2">
          <div className="mb-5">
            <div className="flex items-center font-bold text-body1 border-neutral-200">
              <div className="mr-2">
                <King />
              </div>
              <div className="mt-1">베짱 포럼</div>
            </div>
          </div>
          <div className="flex items-center mb-5 ">
            <button onClick={handleTooltipToggle}>
              <Info />
            </button>
            {showTooltip && (
              <div
                className="absolute top-10 left-[96%] transform -translate-x-1/2 mt-2 z-50
                "
              >
                <Tooltip />
              </div>
            )}
          </div>
        </div>
        <div></div>
        <div className="mb-5">
          {topPosts.map((post) => (
            <div className="mt-5 min-h-12" key={post.id}>
              <Link href={`/forum/${post.id}`}>
                <p className="text-neutral-700 font-medium text-body2 mb-5">{cutText(post.title, 45)}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestForumPosts;
