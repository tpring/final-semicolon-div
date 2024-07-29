import { usePostingCategoryStore } from '@/store/postingCategoryStore';
import UpsertTheme from '../../../UpsertTheme';

const PostingCategory = () => {
  const { categoryGroup, subCategory, setCategoryGroup, setSubCategory } = usePostingCategoryStore();
  return (
    <div className="flex flex-col gap-4 my-2">
      <h1 className="font-bold text-xl w-40  text-gray-700  h-[26px]">{categoryGroup.category}</h1>
      <span className="text-gray-400 ">{categoryGroup.category ? <UpsertTheme /> : null}</span>
    </div>
  );
};

export default PostingCategory;
