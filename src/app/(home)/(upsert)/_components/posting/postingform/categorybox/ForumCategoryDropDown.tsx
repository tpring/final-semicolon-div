import { FORUM_SUB_CATEGORY_LIST } from '@/constants/upsert';

const ForumCategoryDropDown = () => {
  return (
    <div className="">
      <h2>카테고리</h2>
      <select name="forum_category">
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
