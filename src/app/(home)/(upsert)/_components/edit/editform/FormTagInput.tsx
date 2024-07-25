import React from 'react';

const FormTagInput = () => {
  return (
    <div>
      <label className="block" htmlFor="tag">
        태그
      </label>
      <input className="border-2 w-full border-black rounded" type="text" name="tag" id="tag" />
    </div>
  );
};

export default FormTagInput;
