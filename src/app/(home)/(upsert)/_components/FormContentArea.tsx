import { Dispatch, useEffect } from 'react';
import CustomMDEditor from '@/components/common/CustomMDEditor';
import { useUpsertValidationStore } from '@/store/upsertValidationStore';

type FormContentAreaProps = {
  content: string;
  setContent: Dispatch<React.SetStateAction<string>>;
};

const FormContentArea = ({ content, setContent }: FormContentAreaProps) => {
  const { isValidContent } = useUpsertValidationStore();

  return (
    <div>
      <h5 className={`block my-2 ${isValidContent === false ? 'text-red' : 'text-gray-900'}  text-h5 font-bold `}>
        본문
      </h5>
      <div
        className={`${isValidContent === false ? 'border-red border ' : ' border border-neutral-100'} rounded-lg z-50 `}
      >
        <CustomMDEditor content={content} setContent={setContent} />
      </div>
    </div>
  );
};

export default FormContentArea;
