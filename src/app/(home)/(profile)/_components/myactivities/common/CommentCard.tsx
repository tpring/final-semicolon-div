import Image from 'next/image';

type CommentCardProps = {
  id: string;
  title: string;
  comment: string;
  tags: string[];
  time: Date;
  category: string;
  nickname: string;
  profile_image: string;
  isSelected: boolean;
  onCheckboxChange: (id: string) => void;
};

const CommentCard = ({
  id,
  title,
  comment,
  tags,
  time,
  category,
  nickname,
  profile_image,
  isSelected,
  onCheckboxChange
}: CommentCardProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center">
        <input type="checkbox" checked={isSelected} onChange={() => onCheckboxChange(id)} className="mr-2" />
        <p>{category}</p>
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {tags.length > 0 && <p className="mb-2">{tags.join(', ')}</p>}
      <p className="mt-2">{comment}</p>
      <p className="text-sm text-gray-500 mt-1">{time.toLocaleString()}</p>
      <div>
        <Image src={profile_image} alt="프로필 이미지" width={50} height={50} />
        {nickname}
      </div>
    </div>
  );
};

export default CommentCard;
