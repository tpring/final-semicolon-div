import React from 'react';

const FormTagInput = () => {
  return (
    <div>
      <label className="block" htmlFor="post-tag">
        태그
      </label>
      <input className="border-2 w-full border-black rounded" type="text" name="post-tag" id="post-tag" />
    </div>
  );
};

export default FormTagInput;
