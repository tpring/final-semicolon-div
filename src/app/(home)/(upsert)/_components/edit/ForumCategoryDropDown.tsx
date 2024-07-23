'use client';
import { FORUM_SUB_CATEGORY_LIST } from '@/constants/posting';

type ForumCategoryDropDownProps = {
  selectedSubCategoryForForum: string | undefined;
};

const ForumCategoryDropDown = ({ selectedSubCategoryForForum }: ForumCategoryDropDownProps) => {
  return (
    <div className="my-5">
      <h2>카테고리</h2>
      <select name="sub-category" key={selectedSubCategoryForForum} defaultValue={selectedSubCategoryForForum}>
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
