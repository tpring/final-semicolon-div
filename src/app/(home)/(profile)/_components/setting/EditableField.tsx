import React from 'react';

type EditableFieldProps = {
  label: string;
  name: string;
  value: string;
  showInput: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLabelClick: (field: string) => void;
};

const EditableField: React.FC<EditableFieldProps> = ({ label, name, value, showInput, onChange, onLabelClick }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-1/3 min-w-[120px]">
        <label className="font-medium">{label}</label>
      </div>
      <div className="w-2/3">
        {showInput === name ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        ) : (
          <label onClick={() => onLabelClick(name)} className="cursor-pointer">
            {value} ›
          </label>
        )}
      </div>
    </div>
  );
};

export default EditableField;
