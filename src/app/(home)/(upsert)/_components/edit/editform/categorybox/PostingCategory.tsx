'use client';

import { TBOARD_ITEM } from '@/types/upsert';

type PostingCategoryProps = {
  selectedItemByCategory: TBOARD_ITEM;
};

const PostingCategory = ({ selectedItemByCategory }: PostingCategoryProps) => {
  return (
    <div className="flex flex-col gap-4 my-2">
      <span className="">{selectedItemByCategory?.category}</span>
      <span>
        <p>{selectedItemByCategory.title}</p>
        <p>{selectedItemByCategory.content}</p>
      </span>
    </div>
  );
};

export default PostingCategory;

//onChange={handleSelectChange}
