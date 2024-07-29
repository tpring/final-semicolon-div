'use client';

import useFetchQnaPosts from '@/hooks/qna/useFetchQnaPosts';
import { Post, SortOption } from '@/types/posts/qnaTypes';
import MDEditor from '@uiw/react-md-editor';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ResentQnaPosts = () => {
  const [status, setStatus] = useState('waiting');
  const [waitingPage, setWaitingPage] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [sortMethod, setSortMethod] = useState<SortOption>('latest');

  const {
    data: waitingPosts,
    error: waitingError,
    isPending: isPendingWaiting,
    isError: isErrorWaiting,
    totalPages: waitingTotalPages,
    goToPage: goToWaitingPage
  } = useFetchQnaPosts('waiting');

  const {
    data: selectedPosts,
    error: selectedError,
    isPending: isPendingSelected,
    isError: isErrorSelected,
    totalPages: selectedTotalPages,
    goToPage: goToSelectedPage
  } = useFetchQnaPosts('selected');

  const handleTabClick = (newStatus: string) => {
    setStatus(newStatus);
    if (newStatus === 'waiting') {
      goToWaitingPage(waitingPage);
    } else {
      goToSelectedPage(selectedPage);
    }
  };

  useEffect(() => {
    if (status === 'waiting') {
      goToWaitingPage(waitingPage);
    } else {
      goToSelectedPage(selectedPage);
    }
  }, [status, waitingPage, selectedPage, goToWaitingPage, goToSelectedPage]);

  const filterAndSortPosts = (posts: Post[], sortMethod: SortOption): Post[] => {
    switch (sortMethod) {
      case 'latest':
        return posts.sort((a, b) => dayjs(b.updated_at).unix() - dayjs(a.updated_at).unix());
      case 'mostComments':
        return posts.sort((a, b) => (b.qna_comment[0]?.count || 0) - (a.qna_comment[0]?.count || 0));
      case 'mostLikes':
        return posts.sort((a, b) => (b.qna_like[0]?.count || 0) - (a.qna_like[0]?.count || 0));
      default:
        return posts;
    }
  };

  if (status === 'waiting' && isPendingWaiting) {
    return <div>Loading...</div>;
  }

  if (status === 'selected' && isPendingSelected) {
    return <div>Loading...</div>;
  }

  if (status === 'waiting' && isErrorWaiting) {
    return <div>Error: {waitingError?.message}</div>;
  }

  if (status === 'selected' && isErrorSelected) {
    return <div>Error: {selectedError?.message}</div>;
  }

  const posts = status === 'waiting' ? waitingPosts : selectedPosts;
  const totalPages = status === 'waiting' ? waitingTotalPages : selectedTotalPages;
  const setPage = status === 'waiting' ? setWaitingPage : setSelectedPage;

  const sortedPosts = posts ? filterAndSortPosts(posts, sortMethod) : [];

  return (
    <div>
      <h1>최신 Q&A 게시판</h1>
      <div>
        <button onClick={() => setStatus('waiting')}>채택을 기다리는 질문글</button>
        <button onClick={() => setStatus('selected')}>채택된 질문글</button>
      </div>
      <div>
        <label>
          정렬 기준:
          <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value as SortOption)}>
            <option value="latest">최신순</option>
            <option value="mostComments">댓글 많은순</option>
            <option value="mostLikes">좋아요 많은순</option>
          </select>
        </label>
      </div>
      {sortedPosts && sortedPosts.length > 0 ? (
        <ul>
          {sortedPosts.map((post) => (
            <li key={post.id}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={post.user.profile_image}
                  alt={post.user.nickname || 'Unknown User'}
                  width={50}
                  height={50}
                />
                <div>
                  <strong>{post.user.nickname}</strong>
                  <p>{dayjs(post.updated_at).format('YYYY-MM-DD')}</p>
                </div>
              </div>
              <h2>{post.title}</h2>
              <MDEditor.Markdown source={post.content} />
              <div>
                <p>태그: </p>
                {post.qna_tags.length > 0 ? (
                  post.qna_tags.map((tag) => <span key={tag.id}>{tag.tag}</span>)
                ) : (
                  <span>null</span>
                )}
              </div>
              <div>
                <span>좋아요: {post.qna_like[0]?.count || 0}</span> |<span>답변:{post.qna_comment[0]?.count || 0}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>게시물이 없습니다.</div>
      )}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setPage(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResentQnaPosts;
