'use client';
import React, { ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction, useEffect } from 'react';

import { BOARD_LIST } from '@/constants/posting';
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
        title: '',
        content: ''
      }
    );
  };

  return (
    <div className="flex flex-col">
      <select
        name="category-selector"
        id="category-selector"
        value={selectedItemByCategory?.category}
        onChange={handleSelectChange}
      >
        <option value={undefined}>-----</option>
        {BOARD_LIST.map((BOARD_ITEM) => {
          return (
            <option key={BOARD_ITEM.category} value={BOARD_ITEM.category}>
              {BOARD_ITEM.category}
            </option>
          );
        })}
      </select>
      {selectedItemByCategory ? <UpsertTheme theme={selectedItemByCategory} /> : <p>카테고리를 선택해보세요!</p>}
    </div>
  );
};

export default PostingCategory;
