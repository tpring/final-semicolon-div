'use client';
import React from 'react';

type SignupButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
};

const SignupButton = ({ onClick, disabled }: SignupButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-3 rounded ${disabled ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700 transition'}`}
    >
      가입하기
    </button>
  );
};

export default SignupButton;
