import { FORUM_SUB_CATEGORY_LIST } from '@/constants/upsert';

type ForumCategoryDropDownProps = {
  selectedSubCategoryForForum: string;
};

const ForumCategoryDropDown = ({ selectedSubCategoryForForum }: ForumCategoryDropDownProps) => {
  return (
    <div className="my-4">
      <select
        className="w-[337px]  text-neutral-800 border h-[51px] rounded-lg text-body1 focus:border-main-400 outline-none"
        key={selectedSubCategoryForForum}
        name="forum_category"
        defaultValue={selectedSubCategoryForForum}
      >
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
