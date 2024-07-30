'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ArchivingDetailForm = () => {
  const router = useRouter();
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const handleBackClick = () => {
    router.back();
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <button onClick={handleBackClick} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          뒤로가기
        </button>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">포스팅 제목</h1>
          <p className="text-gray-700 mb-4">
            여기에는 포스팅 내용이 나옵니다. 포스팅 내용은 여러 문장으로 구성될 수 있으며, 다양한 정보를 담고 있습니다.
          </p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button className="text-blue-500">좋아요</button>
              <button className="text-blue-500">공유하기</button>
              <button className="text-blue-500">북마크</button>
            </div>
            <div className="text-gray-500 text-sm">댓글 수: {comments.length}</div>
          </div>
          <div className="mt-6">
            <form onSubmit={handleCommentSubmit} className="flex items-center mb-4">
              <input
                type="text"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="댓글을 입력하세요..."
                className="flex-1 px-4 py-2 border rounded-md"
              />
              <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                댓글 달기
              </button>
            </form>
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-md">
                  {comment}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchivingDetailForm;
