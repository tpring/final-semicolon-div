import Down from '@/assets/images/common/Down';
import RightTriangle from '@/assets/images/common/RightTriangle';
import { BOARD_LIST, CATEGORY_LIST_KR, FORUM_SUB_CATEGORY_LIST, SUB_CATEGORY_TEXT } from '@/constants/upsert';
import { usePostingCategoryStore } from '@/store/postingCategoryStore';
import { useUpsertValidationStore } from '@/store/upsertValidationStore';
import { MouseEventHandler } from 'react';

const PostingCategoryBox = () => {
  const {
    categoryGroup,
    setCategoryGroup,
    subCategory,
    setSubCategory,
    categoryOpen,
    subCategoryOpen,
    setCategoryOpen,
    setSubCategoryOpen
  } = usePostingCategoryStore();

  const { isValidCategory, setIsValidCategory } = useUpsertValidationStore();

  const handleCategoryDivClick: MouseEventHandler<HTMLDivElement> = () => {
    setCategoryOpen();
    !subCategoryOpen && subCategory === SUB_CATEGORY_TEXT ? setSubCategoryOpen() : null;
    subCategoryOpen || categoryGroup.category === '포럼' ? setSubCategoryOpen() : null;
  };

  const handleForumCategoryClick: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSubCategory(SUB_CATEGORY_TEXT);
    setSubCategoryOpen();
    const index = CATEGORY_LIST_KR.findIndex((CATEGORY) => CATEGORY === event.currentTarget.innerText);
    setCategoryGroup(BOARD_LIST[index]);
  };

  const handleCategoryClick: MouseEventHandler<HTMLLIElement> = (event) => {
    setSubCategory('');
    const index = CATEGORY_LIST_KR.findIndex((CATEGORY) => CATEGORY === event.currentTarget.innerText);
    setCategoryGroup(BOARD_LIST[index]);
    setCategoryOpen();
    isValidCategory ? null : setIsValidCategory(true);
    subCategoryOpen ? null : setSubCategoryOpen();
  };

  const handleSubCategoryClick: MouseEventHandler<HTMLLIElement> = (event) => {
    setCategoryOpen();
    setSubCategoryOpen();
    setSubCategory(event.currentTarget.innerText);
    isValidCategory ? null : setIsValidCategory(true);
  };

  return (
    <div className="flex flex-col ">
      <div
        className={`w-[339px] h-[51px] flex items-center justify-between text-body1 px-6  py-3 border  rounded-lg ${categoryOpen || categoryGroup.category === '' || subCategory === SUB_CATEGORY_TEXT ? 'border-neutral-100' : 'border-main-400 text-main-400'}  ${isValidCategory === false ? 'text-red border-red' : ''} shadow-[2px_2px_8px_0px_rgba(0,0,0,0.25)]`}
        onClick={handleCategoryDivClick}
      >
        <span className="w-[257px]">
          {categoryGroup.category === '포럼' || categoryGroup.category === '' ? subCategory : categoryGroup.category}
        </span>
        <div className="w-6 h-6 flex items-center justify-center">
          <Down />
        </div>
      </div>

      <div className="flex relative">
        <ul
          className={`${categoryOpen ? '' : 'hidden '} flex flex-col justify-center mt-2 w-[339px]  text-body1 z-10 absolute bg-white border rounded-lg border-neutral-100 `}
        >
          {CATEGORY_LIST_KR.map((CATEGORY, index) => {
            return CATEGORY === '포럼' ? (
              <li
                className={`z-10 px-6 py-3 h-[51px] rounded-t-lg flex gap-2 items-center justify-between cursor-pointer ${
                  CATEGORY === categoryGroup.category ? 'bg-main-100 text-main-400' : 'bg-white'
                }  hover:bg-main-100 hover:text-main-400`}
                key={CATEGORY}
                onClick={handleForumCategoryClick}
              >
                <span className="w-[257px]">{CATEGORY}</span>
                <div className="w-6 h-6 flex items-center justify-center">
                  <RightTriangle />
                </div>
              </li>
            ) : (
              <li
                className={`z-10 px-6 py-3 h-[51px] bg-white cursor-pointer ${index === CATEGORY_LIST_KR.length - 1 ? 'rounded-b-lg' : ''} hover:bg-main-100 hover:text-main-400`}
                key={CATEGORY}
                onClick={handleCategoryClick}
              >
                {CATEGORY}
              </li>
            );
          })}
        </ul>
        <ul
          className={`${subCategoryOpen && categoryGroup.category === '포럼' ? '' : 'hidden'} mt-2  w-[337px] h-[257px] text-body1 z-10 bg-white  absolute left-[336px] border rounded-lg border-neutral-100 `}
        >
          {FORUM_SUB_CATEGORY_LIST.map((SUB_CATEGORY, index) => {
            return (
              <li
                className={`z-10 pl-6 pr-14 py-3 h-[51px]  ${index === 0 ? 'rounded-t-lg' : index === FORUM_SUB_CATEGORY_LIST.length - 1 ? 'rounded-b-lg' : ''} ${
                  SUB_CATEGORY === subCategory ? 'bg-main-100 text-main-400' : 'bg-white'
                } hover:bg-main-100 hover:text-main-400`}
                key={SUB_CATEGORY}
                onClick={handleSubCategoryClick}
              >
                {SUB_CATEGORY}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PostingCategoryBox;
