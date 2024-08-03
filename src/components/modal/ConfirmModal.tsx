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
      <div className="center-alignment w-[352px]">
        <p className="text-center mb-4">
          {message.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <div className="bg-gray-400 w-full h-[1px] mb-4" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border bg-main-100 text-white py-2 px-4 rounded">
            취소
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
