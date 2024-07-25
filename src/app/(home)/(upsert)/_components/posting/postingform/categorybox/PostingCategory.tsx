import React, { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction } from 'react';

import { BOARD_LIST } from '@/constants/upsert';
import { TBOARD_ITEM } from '@/types/upsert';
import UpsertTheme from '../../../UpsertTheme';

type PostingCategoryProps = {
  selectedItemByCategory: TBOARD_ITEM;
  setSelectedItemByCategory: Dispatch<SetStateAction<TBOARD_ITEM>>;
};

const PostingCategory = ({ selectedItemByCategory, setSelectedItemByCategory }: PostingCategoryProps) => {
  const handleSelectChange: ChangeEventHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const targetItemByCategory = BOARD_LIST.find((BOARD_ITEM) => {
      return BOARD_ITEM.category === event.currentTarget.value;
    });
    setSelectedItemByCategory(
      targetItemByCategory ?? {
        category: '',
        content: ''
      }
    );
  };

  return (
    <div className="flex flex-col">
      <select
        className="w-40  text-[#525252] border h-[26px] focus:border-blue-500 outline-none"
        name="category"
        id="category"
        value={selectedItemByCategory?.category}
        onChange={handleSelectChange}
      >
        <option hidden disabled value={''}>
          게시판 선택*
        </option>
        {BOARD_LIST.map((BOARD_ITEM) => {
          return (
            <option key={BOARD_ITEM.category} value={BOARD_ITEM.category}>
              {BOARD_ITEM.category}
            </option>
          );
        })}
      </select>
      {selectedItemByCategory.category ? (
        <UpsertTheme theme={selectedItemByCategory} />
      ) : (
        <h2 className="text-[#727272] font-semibold my-5">게시판을 선택해주세요!</h2>
      )}
    </div>
  );
};

export default PostingCategory;
