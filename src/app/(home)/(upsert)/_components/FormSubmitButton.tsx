import Chip from '@/components/common/Chip';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { POST_CANCLE_TEXT, POST_APPROVE_TEXT, EDIT_APPROVE_TEXT, EDIT_CANCLE_TEXT } from '@/constants/upsert';
import { useRouter } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';

type FormSubmitButtonProps = { content: string; handleSubmit: () => Promise<void>; isEdit: boolean };

const FormSubmitButton = ({ content, handleSubmit, isEdit }: FormSubmitButtonProps) => {
  const router = useRouter();

  const [isCancleConfirmOpen, setIsCancleConfirmOpen] = useState<boolean>(false);
  const [isPostConfirmOpen, setIsPostConfirmOpen] = useState<boolean>(false);
  const [confirmText, setConfirmText] = useState<string>('');

  const handleCancleConfirmClick: MouseEventHandler = () => {
    setConfirmText(isEdit ? EDIT_CANCLE_TEXT : POST_CANCLE_TEXT);
    setIsCancleConfirmOpen(true);
  };

  const handlePostConfirmClick: MouseEventHandler = (event) => {
    event.preventDefault();
    setConfirmText(isEdit ? EDIT_APPROVE_TEXT : POST_APPROVE_TEXT);
    setIsPostConfirmOpen(true);
  };

  const approveCancleConfirm = (): void => {
    router.back();
  };

  const closeCancleConfirm = (): void => {
    setIsCancleConfirmOpen(false);
  };

  const approvePostConfirm = async (): Promise<void> => {
    setIsCancleConfirmOpen(false);
    await handleSubmit();
  };

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
      <Chip type="button" intent={'gray'} size={'large'} label="취소" onClick={handleCancleConfirmClick} />
      <ConfirmModal
        isOpen={isPostConfirmOpen}
        message={confirmText}
        onConfirm={approvePostConfirm}
        onClose={closePostConfirmClose}
      />

      <Chip type="button" intent={'primary'} size="large" label="등록" onClick={handlePostConfirmClick} />
    </div>
  );
};

export default FormSubmitButton;
