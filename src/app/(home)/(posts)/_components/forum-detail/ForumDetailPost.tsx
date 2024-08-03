'use client';

import { forumDetailType } from '@/types/posts/forumDetailTypes';
import { timeForToday } from '@/utils/timeForToday';
import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';
import LikeButton from '@/components/common/LikeButton';
import BookmarkButton from '@/components/common/BookmarkButton';
import { handleRinkCopy } from '@/utils/handleRinkCopy';
import Share from '@/assets/images/common/Share';
import Kebab from '@/assets/images/common/Kebab';
import { useAuth } from '@/context/auth.context';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const ForumDetailPost = ({ forumDetail }: { forumDetail: forumDetailType[] }) => {
  const { me } = useAuth();
  const param = useParams();
  const router = useRouter();
  const [kebobToggle, setKebobToggle] = useState<boolean>(false);

  const handlePostDelete = async () => {
    const response = await fetch(`/api/posts/forum-detail/${param.id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id: me?.id })
    });
    router.push('/');
    return;
  };

  const handlePostRetouch = () => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/edit/${param.id}?category=forum`);
  };

  return (
    <div className="flex flex-col gap-4">
      {forumDetail?.map((post) => (
        <div key={post.id} className="w-full flex flex-col gap-2 border-b-[1px] ">
          <div className="flex  justify-between items-center   ">
            <div className="flex gap-2">
              <Image
                src={post.user.profile_image}
                alt="forumUserImage"
                width={100}
                height={100}
                className="rounded-full  h w-10 h-10 "
              />
              <div>
                <h3>{post.user.nickname}</h3>
                <div className=" flex justify-start items-center gap-3">
                  <p>{post.forum_category}</p>
                  <p>
                    {timeForToday(post.updated_at ? post.updated_at : post.created_at)}
                    <span className="text-xs">{post.updated_at && '(수정됨)'}</span>
                  </p>
                </div>
              </div>
            </div>
            {post.user_id === me?.id && (
              <div className="relative">
                <div className="p-4" onClick={() => setKebobToggle(!kebobToggle)}>
                  <Kebab />
                </div>
                {kebobToggle ? (
                  <div className="w-[105px] right-0 absolute flex flex-col justify-center items-center bg-white shadow-lg border rounded-lg">
                    <button className="h-[44px]" onClick={handlePostRetouch}>
                      게시글 수정
                    </button>
                    <button className="h-[44px]" onClick={handlePostDelete}>
                      게시글 삭제
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-h4 font-bold">{post.title}</p>
            <MDEditor.Markdown source={post.content} className="text-body1 font-regular" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-body1 font-regular">{post.created_at.slice(0, 10).replace(/-/g, '.')}</p>
            <div className="flex gap-5">
              <LikeButton id={post.id} type="forum" />
              <BookmarkButton id={post.id} type="forum" />
              <button
                type="button"
                onClick={() => handleRinkCopy(`${process.env.NEXT_PUBLIC_BASE_URL}/forum/${post.id}`)}
              >
                <Share />
              </button>
              <p> {post.comment[0].count}개의 댓글</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumDetailPost;
