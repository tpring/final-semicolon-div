'use client';
import { FORUM_SUB_CATEGORY_LIST } from '@/constants/posting';
import { TBOARD_ITEM } from '@/types/upsert';
import { Dispatch } from 'react';

type ForumCategoryDropDownProps = {
  selectedSubCategoryForForum: string;
};

const ForumCategoryDropDown = ({ selectedSubCategoryForForum }: ForumCategoryDropDownProps) => {
  return (
    <div className="">
      <h2>카테고리</h2>
      <select key={selectedSubCategoryForForum} name="sub-category" defaultValue={selectedSubCategoryForForum}>
        <option value={''}>-----</option>
        {FORUM_SUB_CATEGORY_LIST.map((FORUM_SUB_CATEGORY_ITEM) => {
          return (
            <option key={`forum_${FORUM_SUB_CATEGORY_ITEM}`} value={FORUM_SUB_CATEGORY_ITEM}>
              {FORUM_SUB_CATEGORY_ITEM}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ForumCategoryDropDown;
