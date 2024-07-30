import Image from 'next/image';

type PostCardProps = {
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  time: string;
  category: string;
  forum_category: string;
  nickname: string;
  profile_image: string;
  isSelected: boolean;
  onCheckboxChange: (id: string) => void;
};

const PostCard = ({
  id,
  title,
  content,
  thumbnail,
  tags,
  time,
  category,
  forum_category,
  nickname,
  profile_image,
  isSelected,
  onCheckboxChange
}: PostCardProps) => {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-center">
        <input type="checkbox" checked={isSelected} onChange={() => onCheckboxChange(id)} className="mr-2" />
        <p>{category}</p>
      </div>
      <Image src={profile_image} alt="프로필 이미지" width={50} height={50} />
      <h2 className="text-xl font-bold mb-2">
        {nickname}
        {title}
      </h2>
      <p className="mb-2">{content}</p>
      {forum_category && <p>{forum_category}</p>}
      {thumbnail && <Image src={thumbnail} alt="Post" width={600} height={400} />}
      {tags.length > 0 && <p className="mb-2">{tags.join(', ')}</p>}
      <p className="text-gray-600">{new Date(time).toLocaleString()}</p>
    </div>
  );
};

export default PostCard;
