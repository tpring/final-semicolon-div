'use client';

import FilledLike from '@/assets/images/like/FilledLike';
import UnfilledLike from '@/assets/images/like/UnfilledLike';
import { useAuth } from '@/context/auth.context';
import { useLike } from '@/hooks/like/useLike';
import { LikeButtonProps, LikeType } from '@/types/buttons/like';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const LikeButton = ({ id, type }: LikeButtonProps) => {
  const { me } = useAuth();
  const { likes, setLikes } = useLike();

  const likeMap: { [key in LikeType]: string[] } = {
    forum: likes.forumLikes,
    forumComment: likes.forumCommentLikes,
    qna: likes.qnaLikes,
    qnaComment: likes.qnaCommentLikes,
    archive: likes.archiveLikes,
    archiveComment: likes.archiveCommentLikes
  };

  const [likeCount, setLikeCount] = useState(0);
  const currentLikes = likeMap[type] || [];
  const isLiked = currentLikes.includes(id);

  useEffect(() => {
    const fetchLikeCount = async () => {
      const response = await fetch(`/api/common/like/like-count?type=${type}&id=${id}`);
      const result = await response.json();
      setLikeCount(result.count);
    };
    fetchLikeCount();
  }, [id, type]);

  const handleLike = async () => {
    if (!me) {
      toast.error('로그인 후 좋아요가 가능합니다.');
      return;
    }

    const previousLikes = { ...likes };
    const updatedLikes = isLiked ? currentLikes.filter((likeId) => likeId !== id) : [...currentLikes, id];

    setLikes((prev) => ({
      ...prev,
      [`${type}Likes`]: updatedLikes
    }));
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      const response = await fetch('/api/common/like/like?user_id=${id}', {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: me.id,
          post_id: type.includes('Comment') ? undefined : id,
          comment_id: type.includes('Comment') ? id : undefined,
          type
        })
      });
      if (!response.ok) {
        const errorResult = await response.json();
        console.error('likebutton', errorResult);
        throw new Error('Failed to update like');
      }
    } catch (error) {
      console.error('like 2', error);
      setLikes(previousLikes);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };
  return (
    <button onClick={handleLike}>
      {isLiked ? <FilledLike /> : <UnfilledLike />} {likeCount}
    </button>
  );
};

export default LikeButton;
