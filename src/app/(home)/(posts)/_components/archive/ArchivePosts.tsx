'use client';

import BookmarkButton from '@/components/common/BookmarkButton';
import { useArchivePosts } from '@/hooks/archive/useFetchArchivePosts';
import { Post, SortOption } from '@/types/posts/archiveTypes';
import MDEditor from '@uiw/react-md-editor';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

  if (isPendingArchive) {
    return <div>Loading...</div>;
  }

  if (isErrorArchive) {
    return <div>Error: {archiveError?.message}</div>;
  }

  const archivePosts = archiveResult?.data || [];
  const sortedPosts = filterAndSortPosts(archivePosts, sortMethod);
  const totalPages = Math.ceil((archiveResult?.count || 0) / POSTS_PER_PAGE);
  return (
    <div>
      <h1>Archive Posts</h1>
      <div>
        <label>
          <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value as SortOption)}>
            <option value="latest">최신순</option>
            <option value="mostComments">답변순</option>
            <option value="mostLikes">좋아요순</option>
          </select>
        </label>
      </div>
      {sortedPosts.length > 0 ? (
        <ul>
          {sortedPosts.map((post) => (
            <li key={post.id}>
              <div className="post-image">
                {post.thumbnail && (
                  <Image src={post.thumbnail} alt="Post Thumbnail" width={300} height={300} objectFit="cover" />
                )}
                <div>
                  <BookmarkButton id={post.id} type="archive" />
                </div>
              </div>
              <h2>{post.title}</h2>
              <div>
                <strong>{post.user.nickname}</strong>
              </div>
              <MDEditor.Markdown source={post.content} />
              <div>
                <p>Tags: </p>
                {post.archive_tags.length > 0 ? (
                  post.archive_tags.map((tag) => <span key={tag.id}>{tag.tag}</span>)
                ) : (
                  <span>No tags</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No posts available.</div>
      )}
      <div>
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setPage(index)}>
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default ArchivePosts;
