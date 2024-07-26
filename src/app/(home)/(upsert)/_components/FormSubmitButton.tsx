import React from 'react';

const FormSubmitButton = () => {
  return (
    <div className="flex gap-5 justify-end">
      <button className=" border px-2 py-1 w-[85px] border-gray-500 text-gray-700  mb-10 font-bold hover:bg-blue-500 hover:text-white hover:border-gray-300">
        등록
      </button>
    </div>
  );
};

export default FormSubmitButton;
