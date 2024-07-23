'use client';

import UpsertTheme from '../UpsertTheme';
import { ChangeEvent, ChangeEventHandler, Dispatch } from 'react';
import { BOARD_LIST } from '@/constants/posting';
import { TBOARD_ITEM } from '@/types/upsert';

type UpsertCategoryProps = {
  selectedItemByCategory: TBOARD_ITEM | undefined;
  setSelectedItemByCategory: Dispatch<React.SetStateAction<TBOARD_ITEM>>;
};

const EditCategory = ({ selectedItemByCategory, setSelectedItemByCategory }: UpsertCategoryProps) => {
  const handleSelectChange: ChangeEventHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const targetItemByCategory = BOARD_LIST.find((BOARD_ITEM) => {
      return BOARD_ITEM.category === event.currentTarget.value;
    });
    setSelectedItemByCategory(targetItemByCategory!);
  };

  return (
    <div className="flex flex-col gap-10">
      <select
        name="category-selector"
        id="category-selector"
        defaultValue={selectedItemByCategory?.title}
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

export default EditCategory;
