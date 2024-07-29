import React from 'react';
type FormTitleInputProps = {
  title: string;
};

const FormTitleInput = ({ title }: FormTitleInputProps) => {
  return (
    <div>
      <label className="block mb-2 text-gray-900 text-h5 font-bold" htmlFor="title">
        제목
      </label>
      <input
        key={title}
        className="px-1 w-full text-neutral-900 border h-[51px] rounded-xl border-neutral-100 focus:border-main-400 outline-none"
        type="text"
        name="title"
        id="title"
        defaultValue={title}
      />
    </div>
  );
};

export default FormTitleInput;
