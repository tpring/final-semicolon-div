import SelectTagInput from '@/components/common/SelectTagInput';
import React, { Dispatch, SetStateAction } from 'react';

type FormTagInputProps = {
  tagList: Ttag[];
  setTagList: Dispatch<SetStateAction<Array<Ttag>>>;
};

const FormTagInput = ({ tagList, setTagList }: FormTagInputProps) => {
  return (
    <div>
      <label className="block mb-2 text-gray-900 text-h5 font-bold" htmlFor="tag">
        태그
      </label>
      <SelectTagInput tagList={tagList} setTagList={setTagList} />
    </div>
  );
};

export default FormTagInput;
