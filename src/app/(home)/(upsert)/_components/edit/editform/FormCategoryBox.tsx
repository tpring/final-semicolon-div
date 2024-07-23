import React, { Dispatch } from 'react';
import { TarchivePost, TBOARD_ITEM, TforumPost, TqnaPost } from '@/types/upsert';
import PostingCategory from './categorybox/PostingCategory';
import ForumCategoryDropDown from './categorybox/ForumCategoryDropDown';

type FormCategoryBoxProps = {
  selectedSubCategoryForForum: string;
  selectedItemByCategory: TBOARD_ITEM;
  setSelectedItemByCategory: Dispatch<React.SetStateAction<TBOARD_ITEM>>;
};

const FormCategoryBox = ({
  selectedSubCategoryForForum,
  selectedItemByCategory,
  setSelectedItemByCategory
}: FormCategoryBoxProps) => {
  return (
    <div className="flex flex-col">
      <PostingCategory
        selectedItemByCategory={selectedItemByCategory}
        setSelectedItemByCategory={setSelectedItemByCategory}
      />
      {
        //최상위 분류 카테고리가 포럼일경우 포럼 카테고리 드롭다운 생성
        selectedItemByCategory?.category === '포럼' ? (
          <ForumCategoryDropDown selectedSubCategoryForForum={selectedSubCategoryForForum} />
        ) : null
      }
    </div>
  );
};

export default FormCategoryBox;
