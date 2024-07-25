import React from 'react';

type InputFieldProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  valid: boolean;
  message: string;
};

const InputField = ({ type, value, onChange, placeholder, valid, message }: InputFieldProps) => {
  const messageColor = value ? (valid ? 'text-green-600' : 'text-red-600') : 'text-gray-600';

  return (
    <div className="mb-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 border rounded ${value && !valid ? 'border-red-600' : 'border-gray-300'}`}
      />
      <p className={`mt-1 ${messageColor}`}>{message}</p>
    </div>
  );
};

export default InputField;
