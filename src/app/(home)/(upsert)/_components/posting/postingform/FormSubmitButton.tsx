import React from 'react';

const FormSubmitButton = () => {
  return (
    <div className="flex gap-5 justify-end">
      <button className="border-2 px-2 py-1 w-[85px] border-black rounded mb-10">임시저장</button>
      <button className="border-2 px-2 py-1 w-[85px] border-black rounded mb-10">등록</button>
    </div>
  );
};

export default FormSubmitButton;
