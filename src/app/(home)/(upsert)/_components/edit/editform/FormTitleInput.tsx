import React from 'react';
type FormTitleInputProps = {
  title: string;
};

const FormTitleInput = ({ title }: FormTitleInputProps) => {
  return (
    <div>
      <label className="block text-[#525252] mb-2" htmlFor="title">
        제목*
      </label>
      <input
        key={title}
        className="px-1 w-full text-[#525252] border h-[26px] border-gray-400 focus:border-blue-500 outline-none"
        type="text"
        name="title"
        id="title"
        defaultValue={title}
      />
    </div>
  );
};

export default FormTitleInput;
