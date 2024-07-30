'use client';

import FilledLike from '@/assets/images/like/FilledLike';
import UnfilledLike from '@/assets/images/like/UnfilledLike';
import { useAuth } from '@/context/auth.context';
import { useLike } from '@/hooks/like/useLike';
import { LikeButtonProps, LikeType } from '@/types/buttons/like';
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

  const currentLikes = likeMap[type] || [];
  const isLiked = currentLikes.includes(id);

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

    try {
      const response = await fetch('api/common/like', {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          'Context-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: me.id,
          post_id: type.includes('Comment') ? undefined : id,
          comment_id: type.includes('Comment') ? id : undefined
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
    }
  };
  return <button onClick={handleLike}>{isLiked ? <FilledLike /> : <UnfilledLike />}</button>;
};

export default LikeButton;
