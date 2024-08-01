'use client';

import Down from '@/assets/images/common/Down';
import { SortDropdownProps, SortOption } from '@/types/buttons/sortDropdown';
import { useState } from 'react';

const SortDropdown = ({ sortBy, handleSortChange, sortOptions }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const selectedOptionLabel = sortOptions.find((option: SortOption) => option.value === sortBy)?.label;

  return (
    <div className="sort-dropdown relative w-[127px]">
      <div
        onClick={handleDropdownClick}
        className={`flex justify-between items-center h-[40px] px-4 py-2 bg-white border border-[#dbdbdb] cursor-pointer ${
          isOpen ? 'rounded-tl-lg rounded-tr-lg border-b-0' : 'rounded-lg'
        }`}
      >
        <span className="flex-grow w-[71px] text-lg font-medium text-center text-[#424242]">{selectedOptionLabel}</span>
        <Down />
      </div>
      {isOpen && (
        <div
          className="absolute w-full rounded-bl-lg rounded-br-lg bg-white shadow-lg z-10 border border-[#dbdbdb] border-t-0"
          style={{ height: `${sortOptions.length * 40}px` }}
        >
          {sortOptions.map((option: SortOption, index: number) => (
            <div
              key={option.value}
              onClick={() => {
                handleSortChange({ target: { value: option.value } } as React.ChangeEvent<HTMLSelectElement>);
                setIsOpen(false);
              }}
              className={`flex justify-center items-center h-[40px] gap-2 px-4 py-2 cursor-pointer ${
                index === sortOptions.length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''
              } border-b-0`}
            >
              <span className="flex-grow-0 flex-shrink-0 w-[95px] text-lg font-medium text-center text-[#424242]">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
