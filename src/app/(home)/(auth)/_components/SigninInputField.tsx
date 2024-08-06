import X from '@/assets/images/common/X';
import React, { useState, useRef } from 'react';

type InputFieldProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  valid: boolean;
  message: string;
};

const SigninInputField = ({ type, value, onChange, placeholder, valid, message }: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const messageColor = value ? (valid ? 'text-green-600' : 'text-red-600') : 'text-gray-600';
  const borderColor = value && !valid ? 'border-red-600' : isFocused ? 'border-blue-500' : 'border-gray-300';

  const handleClearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    inputRef.current?.focus();
  };

  return (
    <div className="relative mb-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        ref={inputRef}
        className={`w-full p-3 pr-10 border rounded ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {(isFocused || value) && (
        <button
          type="button"
          onClick={handleClearInput}
          className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-400 hover:text-black z-10"
        >
          <X />
        </button>
      )}
      <p className={`mt-1 ${messageColor}`}>{message}</p>
    </div>
  );
};

export default SigninInputField;
