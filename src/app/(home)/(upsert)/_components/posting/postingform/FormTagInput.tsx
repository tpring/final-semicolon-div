import SelectTagInput from '@/components/common/SelectTagInput';
import { Dispatch, SetStateAction } from 'react';

type FormTagInputProps = {
  tagList: Array<Ttag>;
  setTagList: Dispatch<SetStateAction<Array<Ttag>>>;
};

const FormTagInput = ({ tagList, setTagList }: FormTagInputProps) => {
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
