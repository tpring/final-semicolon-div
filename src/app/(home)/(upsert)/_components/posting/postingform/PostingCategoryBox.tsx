import { BOARD_LIST, CATEGORY_LIST_KR, FORUM_SUB_CATEGORY_LIST } from '@/constants/upsert';
import { usePostingCategoryStore } from '@/store/postingCategoryStore';
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

  const handleCategoryDivClick: MouseEventHandler<HTMLDivElement> = () => {
    setCategoryOpen();
    subCategoryOpen ? setSubCategoryOpen() : null;
  };

  const handleForumCategoryClick: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSubCategory('포럼 카테고리를 선택해주세요!');
    setSubCategoryOpen();
    setCategoryGroup(
      BOARD_LIST.find((BOARD) => BOARD.category === event.currentTarget.innerHTML) ?? { category: '', content: '' }
    );
  };

  const handleCategoryClick: MouseEventHandler<HTMLLIElement> = (event) => {
    setSubCategory('');
    const index = CATEGORY_LIST_KR.findIndex((CATEGORY) => CATEGORY === event.currentTarget.innerText);
    setCategoryGroup(BOARD_LIST[index]);
    setCategoryOpen();
    subCategoryOpen ? setSubCategoryOpen() : null;
  };

  const handleSubCategoryClick: MouseEventHandler<HTMLLIElement> = (event) => {
    setCategoryOpen();
    setSubCategoryOpen();
    setSubCategory(event.currentTarget.innerText);
  };

  return (
    <div className="flex flex-col ">
      <div
        className={`w-[337px] h-[51px] text-body1 pl-6 pr-14 py-3 border  rounded-lg ${categoryOpen || categoryGroup.category === '' ? 'border-neutral-100' : 'border-main-400 text-main-400'}`}
        onClick={handleCategoryDivClick}
      >
        {categoryGroup.category === '포럼' || categoryGroup.category === '' ? subCategory : categoryGroup.category}dddd
      </div>
      <div className="flex relative">
        <ul
          className={`${categoryOpen ? '' : 'hidden '} flex flex-col justify-center mt-2 w-[337px]  text-body1 z-10 absolute bg-white border rounded-lg border-neutral-100 `}
        >
          {CATEGORY_LIST_KR.map((CATEGORY) => {
            return CATEGORY === '포럼' ? (
              <li
                className="z-10  pl-6 pr-14 py-3 h-[51px] bg-white rounded-t-lg"
                key={CATEGORY}
                onClick={handleForumCategoryClick}
              >
                {CATEGORY}
              </li>
            ) : (
              <li
                className="z-10 pl-6 pr-14 py-3 h-[51px] bg-white rounded-b-lg"
                key={CATEGORY}
                onClick={handleCategoryClick}
              >
                {CATEGORY}
              </li>
            );
          })}
        </ul>
        <ul
          className={`${subCategoryOpen ? '' : 'hidden'} mt-2  w-[337px] h-[257px] text-body1 z-10 bg-white absolute left-[336px] border rounded-lg border-neutral-100`}
        >
          {FORUM_SUB_CATEGORY_LIST.map((SUB_CATEGORY) => {
            return (
              <li
                className="z-10 pl-6 pr-14 py-3 h-[51px] bg-white rounded-lg"
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
