'use client';

import useFetchQnaPosts from '@/hooks/qna/useFetchQnaPosts';
import MDEditor from '@uiw/react-md-editor';
import Link from 'next/link';

const PopularQnaPosts = () => {
  const {
    data: popularPosts,
    error: popularError,
    isPending: isPendingPopular,
    isError: isErrorPopular,
    page: popularPage,
    totalPages: popularTotalPages,
    goToPage: goToPopularPage
  } = useFetchQnaPosts('popular');

  if (isPendingPopular) {
    return <div>Loading...</div>;
  }

  if (isErrorPopular) {
    return <div>Error: {popularError?.message}</div>;
  }
  return (
    <div>
      <h1>인기 Q&A 게시판</h1>
      {popularPosts && popularPosts.length > 0 ? (
        <ul>
          {popularPosts.map((post) => (
            <Link key={post.id} href={`/qna/${post.id}`}>
              <li key={post.id}>
                <div>
                  <h2>{post.title}</h2>
                  <MDEditor.Markdown source={post.content} />
                </div>
                <div>
                  <span>좋아요: {post.qna_like?.[0]?.count || 0}</span> |
                  <span>답변: {post.qna_comment?.[0]?.count || 0}</span>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <div>게시물이 없습니다.</div>
      )}
      <div>
        {Array.from({ length: popularTotalPages }, (_, index) => (
          <button key={index} onClick={() => goToPopularPage(index)} disabled={index === popularPage}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularQnaPosts;
