import { useState } from 'react';

type CustomSelectProps = {
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
};

const CustomSelect = ({ options, selectedValue, onChange }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="w-[118px] h-[40px] border border-neutral-100 rounded-lg bg-white text-h5 font-radius"
      >
        {selectedValue || 'Select'}
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full border border-neutral-100 rounded-lg bg-white">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`p-2 cursor-pointer ${selectedValue === option ? 'bg-sub-50 text-main-400' : 'text-neutral-700'}`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
