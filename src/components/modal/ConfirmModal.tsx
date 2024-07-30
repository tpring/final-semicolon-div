import React from 'react';
import Modal from './Modal';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }: ConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-[234px] flex flex-col justify-center items-center">
        <p>{message}</p>
        <p className="bg-gray-400 w-[350px] h-[1px]" />
        <div className="flex items-center">
          <button onClick={onClose} className="border bg-main-100 text-white py-2 px-4 rounded">
            취소
            <span className="absolute inset-y-0 right-0 w-[2px] bg-gray-400" />
          </button>
          <button onClick={handleConfirm} className="border bg-main-100 text-white py-2 px-4 rounded">
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
