import ConfirmModal from '@/components/modal/ConfirmModal';
import { POST_CANCLE_TEXT, POST_CONFIRM_TEXT } from '@/constants/upsert';
import { MouseEventHandler, useRef, useState } from 'react';

const FormSubmitButton = () => {
  const [isCancleConfirmOpen, setIsCancleConfirmOpen] = useState<boolean>(false);
  const [isPostConfirmOpen, setIsPostConfirmOpen] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>('');

  const handleCancleConfirmClick: MouseEventHandler = () => {
    setConfirmText(POST_CANCLE_TEXT);
    setIsCancleConfirmOpen(true);
  };

  const handlePostConfirmClick: MouseEventHandler = () => {
    setConfirmText(POST_CONFIRM_TEXT);
    setIsPostConfirmOpen(true);
  };

  const approveCancleConfirm = (): void => {};

  const closeCancleConfirm = (): void => {
    setIsCancleConfirmOpen(false);
  };

  const approvePostConfirm = (): void => {};

  const closePostConfirmClose = (): void => {
    setIsPostConfirmOpen(false);
  };

  return (
    <div className="flex gap-5 justify-end">
      <ConfirmModal
        isOpen={isCancleConfirmOpen}
        message={confirmText}
        onConfirm={approveCancleConfirm}
        onClose={closeCancleConfirm}
      />
      <button
        type="button"
        onClick={handleCancleConfirmClick}
        className=" border px-2 py-1 w-[85px] border-gray-500 text-gray-700  mb-10 font-bold hover:bg-blue-500 hover:text-white hover:border-gray-300"
      >
        취소
      </button>
      <ConfirmModal
        isOpen={isPostConfirmOpen}
        message={confirmText}
        onConfirm={approvePostConfirm}
        onClose={closePostConfirmClose}
      />
      <button
        type="button"
        onClick={handlePostConfirmClick}
        className=" border px-2 py-1 w-[85px] border-gray-500 text-gray-700  mb-10 font-bold hover:bg-blue-500 hover:text-white hover:border-gray-300"
      >
        등록
      </button>
    </div>
  );
};

export default FormSubmitButton;
