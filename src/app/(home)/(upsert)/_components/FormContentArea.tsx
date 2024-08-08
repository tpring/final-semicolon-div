import { Dispatch } from 'react';
import CustomMDEditor from '@/components/common/CustomMDEditor';

type FormContentAreaProps = {
  content: string;
  setContent: Dispatch<React.SetStateAction<string>>;
};

const FormContentArea = ({ content, setContent }: FormContentAreaProps) => {
  return (
    <div className="">
      <h5 className="block my-2 text-gray-900 text-h5 font-bold">본문</h5>
      <CustomMDEditor content={content} setContent={setContent} />
    </div>
  );
};

export default FormContentArea;
