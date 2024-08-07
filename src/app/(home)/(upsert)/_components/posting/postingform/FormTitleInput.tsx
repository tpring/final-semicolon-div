import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

type FormTitleInputProps = {
  setTitle: Dispatch<SetStateAction<string>>;
};

const FormTitleInput = ({ setTitle }: FormTitleInputProps) => {
  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.currentTarget.value);
  };

  return (
    <div>
      <label className="block mb-2 text-neutral-900 text-h5 font-bold " htmlFor="title">
        제목
      </label>
      <input
        className="px-1 w-full text-neutral-900 border h-[51px] rounded-xl border-neutral-100 focus:border-main-400 outline-none "
        type="text"
        name="title"
        id="title"
        onChange={handleTitleChange}
      />
    </div>
  );
};

export default FormTitleInput;
