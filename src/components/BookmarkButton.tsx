'use client';

import FilledBookmark from '@/assets/images/bookmark/FilledBookmark';
import UnfilledBookmark from '@/assets/images/bookmark/UnfilledBookmark';
import { useAuth } from '@/context/auth.context';
import { useBookmark } from '@/hooks/bookmark/useBookmark';
import { bookmarkButton } from '@/types/buttons/bookmark';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BookmarkButton = ({ postId }: bookmarkButton) => {
  const { me } = useAuth();
  const { bookmarks, setBookmarks } = useBookmark();
  const [loading, setLoading] = useState(false);

  const isBookmarked = bookmarks.includes(postId);

  const handleBookmark = async () => {
    if (!me) {
      toast.error('로그인 후 북마크가 가능합니다.');
      return;
    }

    const previousState = bookmarks;
    const updatedBookmarks = isBookmarked ? bookmarks.filter((id) => id! == postId) : [...bookmarks, postId];

    setBookmarks(updatedBookmarks);

    setLoading(true);

    try {
      const response = await fetch('api/common/bookmark', {
        method: isBookmarked ? 'DELETE' : 'POST',
        headers: {
          'Context-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: me.id, post_id: postId })
      });
      const result = await response.json();
      if (response.ok) {
        setBookmarks((prev) => (isBookmarked ? prev.filter((id) => id !== postId) : [...prev, postId]));
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('bookmark 2', error);
      setBookmarks(previousState);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button onClick={handleBookmark} disabled={loading}>
      {isBookmarked ? <FilledBookmark /> : <UnfilledBookmark />}
    </button>
  );
};

export default BookmarkButton;
