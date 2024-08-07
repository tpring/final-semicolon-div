import { filterSlang } from '@/utils/markdownCut';
import Link from 'next/link';

type CommentCardProps = {
  id: string;
  post_id: string;
  title: string;
  comment: string;
  tags: string[];
  time: Date;
  category: string;
  nickname: string;
  created_at: string;
  profile_image: string;
  forum_category: string;
  likesCount: string;
  commentsCount: string;
  isSelected: boolean;
  onCheckboxChange: (id: string) => void;
};

const CommentCard = ({
  id,
  post_id,
  title,
  comment,
  tags,
  category,
  nickname,
  profile_image,
  isSelected,
  forum_category,
  likesCount,
  commentsCount,
  created_at,
  onCheckboxChange
}: CommentCardProps) => {
  const formattedDate = new Date(created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const formattedTime = new Date(created_at).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="w-[850px] border-b p-4 ">
      <div className="flex ">
        <div className="mr-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onCheckboxChange(id)}
            className="w-[18px] h-[18px]"
          />
        </div>
        <Link href={`/${category}/${post_id}`}>
          <div className="">
            <p className="mb-2 text-neutral-900 text-subtitle1 font-bold line-clamp-1 max-w-[600px]">
              {filterSlang(comment)}
            </p>
            <p>
              원문 제목: {filterSlang(title)} [{commentsCount}]
            </p>
            {forum_category && <p className="text-body2 font-regular text-neutral-400">{forum_category}</p>}
            <div className="mb-2">
              <span className="text-body2 font-regular text-neutral-400">
                {nickname}
                <span className="text-body1 font-regular text-neutral-100">•</span> {formattedDate}
                <span className="text-body1 font-regular text-neutral-100">•</span> {formattedTime}
                <span className="text-body1 font-regular text-neutral-100">•</span> 좋아요 {likesCount}
              </span>
            </div>
            {tags.length > 0 && (
              <div className="mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className=" bg-neutral-50 text-neutral-700 text-subtitle2 font-medium rounded-[4px] p-[4px_12px] mr-[6px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>{' '}
        </Link>
      </div>
    </div>
  );
};

export default CommentCard;
