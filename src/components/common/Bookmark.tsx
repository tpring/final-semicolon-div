'use client';

import { useAuth } from '@/context/auth.context';

const Bookmark = ({ params }: { params: { id: string } }) => {
  const { me } = useAuth();
  //현재 유저 정보, 포스트 아이디 가져와서
  const addBookmark = { user_id: me?.id, post_id: params.id };

  //현재 유저가 게시글 북마크 유무 파악

  // 북마크 추가
  const handleBookmark = async (data: { user_id: string | undefined; post_id: string }) => {
    if (!me) {
      alert('로그인');
      return;
    }

    const response = await fetch('/api/common/bookmark', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log(result);
  };

  // 북마크 삭제
  const deleteBookmark = async (data: { user_id: string | undefined; post_id: string }) => {
    const response = await fetch('/api/common/bookmark', {
      method: 'DELETE',
      body: JSON.stringify(data)
    });
  };

  return (
    <div>
      <button onClick={() => handleBookmark(addBookmark)}>북마크</button>
      <button onClick={() => deleteBookmark(addBookmark)}>삭제</button>
    </div>
  );
};

export default Bookmark;
