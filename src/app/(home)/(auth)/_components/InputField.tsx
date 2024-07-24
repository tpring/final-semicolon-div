'use client';
import React from 'react';

type InputFieldProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const InputField = ({ type, value, onChange, placeholder }: InputFieldProps) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 border rounded"
      />
    </div>
  );
};

export default InputField;
