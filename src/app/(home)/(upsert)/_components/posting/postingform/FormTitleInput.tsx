import React from 'react';

const FormTitleInput = () => {
  return (
    <div>
      <label className="block" htmlFor="title">
        제목
      </label>
      <input className="border-2 w-full border-black rounded" type="text" name="title" id="title" />
    </div>
  );
};

export default FormTitleInput;
