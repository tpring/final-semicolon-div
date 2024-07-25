import { FORUM_SUB_CATEGORY_LIST } from '@/constants/upsert';

const ForumCategoryDropDown = () => {
  return (
    <div className="">
      <h2 className="text-[#525252] mb-2">포럼 카테고리*</h2>
      <select
        className=" w-full text-[#525252] border h-[26px] border-gray-400 focus:border-blue-500 outline-none"
        name="forum_category"
      >
        <option value={''} disabled hidden>
          카테고리를 선택해주세요!
        </option>
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
