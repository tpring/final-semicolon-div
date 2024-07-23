import React from 'react';
type FormTitleInputProps = {
  title: string;
};

const FormTitleInput = ({ title }: FormTitleInputProps) => {
  return (
    <div>
      <label className="block" htmlFor="post-title">
        제목
      </label>
      <input
        key={title}
        className="border-2 w-full border-black rounded"
        type="text"
        name="post-title"
        id="post-title"
        defaultValue={title}
      />
    </div>
  );
};

export default FormTitleInput;
