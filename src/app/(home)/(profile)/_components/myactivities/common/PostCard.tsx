import VectorImageIcon from '@/assets/images/common/VectorImageIcon';
import Link from 'next/link';

type PostCardProps = {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  created_at: string;
  category: string;
  likesCount: string;
  commentsCount: string;
  forum_category: string;
  nickname: string;
  isSelected: boolean;
  onCheckboxChange: (id: string) => void;
};

const PostCard = ({
  id,
  title,
  content,
  thumbnail,
  tags,
  created_at,
  category,
  likesCount,
  commentsCount,
  forum_category,
  nickname,
  isSelected,
  onCheckboxChange
}: PostCardProps) => {
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
        <Link href={`/${category}/${id}`}>
          <div className="">
            <div className="flex items-center mb-2">
              <span className="text-neutral-900 text-subtitle1 font-bold line-clamp-1 max-w-[600px]">{title}</span>
              <span className="flex items-center ml-3">
                {thumbnail ? <VectorImageIcon /> : <div></div>}
                <span className="text-main-400 text-subtitle1 font-medium ml-1"> [{commentsCount || '0'}] </span>
              </span>
            </div>

            <p className="text-body1 font-regular text-neutral-400 line-clamp-1 mb-2">{content}</p>
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
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
