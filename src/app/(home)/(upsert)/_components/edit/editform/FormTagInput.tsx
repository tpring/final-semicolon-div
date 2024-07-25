import React from 'react';

const FormTagInput = () => {
  return (
    <div>
      <label className="block text-[#525252]  mb-2" htmlFor="tag">
        태그
      </label>
      <input
        className="px-1 w-full border h-[26px] border-gray-400 focus:border-blue-500 outline-none"
        type="text"
        name="tag"
        id="tag"
      />
    </div>
  );
};

export default FormTagInput;
