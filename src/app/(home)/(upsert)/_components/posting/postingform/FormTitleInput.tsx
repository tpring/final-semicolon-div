import React from 'react';

const FormTitleInput = () => {
  return (
    <div>
      <label className="block" htmlFor="post-title">
        제목
      </label>
      <input className="border-2 w-full border-black rounded" type="text" name="post-title" id="post-title" />
    </div>
  );
};

export default FormTitleInput;
