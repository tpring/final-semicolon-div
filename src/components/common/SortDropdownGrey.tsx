'use client';

import Down from '@/assets/images/common/Down';
import Up from '@/assets/images/common/Up';
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
        className={`flex justify-between items-center h-[40px] px-4 py-2 bg-white border cursor-pointer ${
          isOpen ? 'rounded-tl-lg rounded-tr-lg border-b-0 border-main-400' : 'rounded-lg border-neutral-100'
        } ${!isOpen ? `hover:border-main-400` : ''}`}
      >
        <span className="flex-grow w-[71px] text-body1 font-medium text-center text-neutral-700">
          {selectedOptionLabel}
        </span>
        <Down />
      </div>
      {isOpen && (
        <div
          className="absolute w-full rounded-bl-lg rounded-br-lg bg-white shadow-lg z-10 border border-main-400 border-t-0 overflow-hidden"
          style={{ height: `${sortOptions.length * 40}px` }}
        >
          {sortOptions.map((option: SortOption, index: number) => (
            <div
              key={option.value}
              onClick={() => {
                handleSortChange({ target: { value: option.value } } as React.ChangeEvent<HTMLSelectElement>);
                setIsOpen(false);
              }}
              className={`flex justify-center items-center h-[40px] gap-2 px-3 py-1 cursor-pointer ${
                index === sortOptions.length - 1 ? 'rounded-bl-lg rounded-br-lg' : ''
              } hover:bg-main-50`}
            >
              <span className="flex-grow-0 flex-shrink-0 w-[95px] text-body1 font-medium text-center text-neutral-700">
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
