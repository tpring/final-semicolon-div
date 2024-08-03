'use client';

import BookmarkButton from '@/components/common/BookmarkButton';
import SortDropdown from '@/components/common/SortDropdownGrey';
import { useArchivePosts } from '@/hooks/archive/useFetchArchivePosts';
import { Post, SortOption } from '@/types/posts/archiveTypes';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ArchivePosts = () => {
  const [page, setPage] = useState(0);
  const [sortMethod, setSortMethod] = useState<SortOption>('latest');
  const POSTS_PER_PAGE = 6;

  const {
    data: archiveResult,
    error: archiveError,
    isPending: isPendingArchive,
    isError: isErrorArchive
  } = useArchivePosts(page, 6, sortMethod);

  const filterAndSortPosts = (posts: Post[], sortMethod: SortOption): Post[] => {
    switch (sortMethod) {
      case 'latest':
        return posts.sort((a, b) => dayjs(b.updated_at).unix() - dayjs(a.updated_at).unix());
      case 'mostComments':
        return posts.sort((a, b) => (b.archive_comment[0]?.count || 0) - (a.archive_comment[0]?.count || 0));
      case 'mostLikes':
        return posts.sort((a, b) => (b.archive_like[0]?.count || 0) - (a.archive_like[0]?.count || 0));
      default:
        return posts;
    }
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'latest', label: '최신순' },
    { value: 'mostComments', label: '댓글순' },
    { value: 'mostLikes', label: '좋아요순' }
  ];

  if (isPendingArchive) {
    return <div>Loading...</div>;
  }

  if (isErrorArchive) {
    return <div>Error: {archiveError?.message}</div>;
  }

  const archivePosts = archiveResult?.data || [];
  const sortedPosts = filterAndSortPosts(archivePosts, sortMethod);
  const totalPages = Math.ceil((archiveResult?.count || 0) / POSTS_PER_PAGE);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(event.target.value as SortOption);
  };

  return (
    <div>
      <p className="text-overline1 text-neutral-400 font-regular">Level Up Course</p>
      <p className="text-h3 text-neutral-900 font-bold">더 많은 코드를 만나보세요!</p>
      <div className="flex items-center justify-between text-caption1 text-neutral-700 font-medium mb-11">
        <p>전체 게시글 ({archiveResult.count})</p>
        <label>
          <SortDropdown sortBy={sortMethod} handleSortChange={handleSortChange} sortOptions={sortOptions} />
        </label>
      </div>

      {sortedPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {sortedPosts.map((post) => (
            <Link key={post.id} href={`/archive/${post.id}`}>
              <div key={post.id} className="flex flex-col justify-start items-start relative gap-4 rounded-xl">
                <div className="post-image">
                  <div className="flex-grow-0 flex-shrink-0 relative rounded-xl">
                    {post.thumbnail && (
                      <Image src={post.thumbnail} alt="Post Thumbnail" width={388} height={280} objectFit="cover" />
                    )}
                    <div className="absolute top-4 right-4">
                      <BookmarkButton id={post.id} type="archive" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2 px-5 py-2">
                  <h2 className="text-body1 font-bold text-neutral-900">
                    {post.title.length > 20 ? `${post.title.slice(0, 20)}...` : post.title}
                  </h2>
                  <p className="text-base text-body2 font-regular text-neutral-700">
                    {post.user.nickname
                      ? post.user.nickname.length > 20
                        ? `${post.user.nickname.slice(0, 20)}...`
                        : post.user.nickname
                      : 'unknown user'}
                  </p>
                </div>
                <div className="tags flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2 py-2 flex-wrap max-h-[40px] overflow-hidden">
                  {post.archive_tags.length > 0 ? (
                    post.archive_tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-neutral-50 px-3 py-1 rounded text-base font-medium text-neutral-700"
                        style={{ maxWidth: '100%' }}
                      >
                        #{tag.tag}
                      </span>
                    ))
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>No posts available.</div>
      )}
      <div className="flex justify-center items-center gap-4 mt-4">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              disabled={index === page}
              className={`w-[33px] h-[32px] flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 px-2 py-1 rounded-md ${
                index === page ? 'bg-main-50' : 'bg-neutral-100 border border-neutral-100'
              }`}
            >
              <p
                className={`flex-grow-0 flex-shrink-0 text-body1 font-medium text-center ${
                  index === page ? 'text-main-500' : 'text-neutral-500'
                }`}
              >
                {index + 1}
              </p>
            </button>
          ))}
      </div>
    </div>
  );
};

export default ArchivePosts;
