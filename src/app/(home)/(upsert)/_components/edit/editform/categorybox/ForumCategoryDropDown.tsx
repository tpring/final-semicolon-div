import { FORUM_SUB_CATEGORY_LIST } from '@/constants/upsert';

type ForumCategoryDropDownProps = {
  selectedSubCategoryForForum: string;
};

const ForumCategoryDropDown = ({ selectedSubCategoryForForum }: ForumCategoryDropDownProps) => {
  return (
    <div className="my-4">
      <h2 className="mb-2 text-[#525252] ">카테고리*</h2>
      <select
        className="w-full text-[#525252] border h-[26px] border-gray-400 focus:border-blue-500 outline-none"
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
