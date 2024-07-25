import React from 'react';

const FormTitleInput = () => {
  return (
    <div>
      <label className="block mb-2 text-[#525252] " htmlFor="title">
        제목*
      </label>
      <input
        className="px-1 w-full text-[#525252] border h-[26px] border-gray-400 focus:border-blue-500 outline-none "
        type="text"
        name="title"
        id="title"
      />
    </div>
  );
};

export default FormTitleInput;
