import { useUpsertValidationStore } from '@/store/upsertValidationStore';
import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
type FormTitleInputProps = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
};

const FormTitleInput = ({ title, setTitle }: FormTitleInputProps) => {
  const { isValidTitle } = useUpsertValidationStore();
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.currentTarget.value);
  };

  return (
    <div className={` `}>
      <label
        className={`block mb-2 ${isValidTitle === false ? 'text-red' : 'text-gray-900'}  text-h5 font-bold`}
        htmlFor="title"
      >
        제목
      </label>
      <input
        className={`px-6 py-3 w-full text-neutral-900 border h-[51px] rounded-xl   focus:border-main-400 outline-none ${isValidTitle === false ? 'placeholder:text-red border-red ' : 'text-gray-900 border-neutral-100 placeholder:text-neutral-400 placeholder:text-body1'} `}
        type="text"
        name="title"
        id="title"
        placeholder="제목을 입력해 주세요"
        value={title}
        onChange={handleTitleChange}
      />
    </div>
  );
};

export default FormTitleInput;
