import { TBOARD_ITEM } from '@/types/upsert';
import UpsertTheme from '../../../UpsertTheme';

type PostingCategoryProps = {
  selectedItemByCategory: TBOARD_ITEM;
};
const user = 'user';
const PostingCategory = ({ selectedItemByCategory }: PostingCategoryProps) => {
  return (
    <div className="flex flex-col gap-4 my-2">
      <h1 className="font-bold text-xl w-40  text-gray-700  h-[26px]">{selectedItemByCategory?.category}</h1>
      <span className="text-gray-400 ">
        {selectedItemByCategory.category ? <UpsertTheme theme={selectedItemByCategory} /> : null}
      </span>
    </div>
  );
};

export default PostingCategory;
