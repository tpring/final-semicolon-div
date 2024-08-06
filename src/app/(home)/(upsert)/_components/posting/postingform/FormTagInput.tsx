import SelectTagInput from '@/components/common/SelectTagInput';
import { TAG_LIST } from '@/constants/tags';
import { useState } from 'react';

const FormTagInput = () => {
  const [tagList, setTagList] = useState<Array<Ttag>>(TAG_LIST);
  return (
    <div>
      <label className="block mb-2  text-neutral-900 text-h5 font-bold" htmlFor="tag">
        태그
      </label>
      <SelectTagInput tagList={tagList} setTagList={setTagList} />
    </div>
  );
};

export default FormTagInput;
