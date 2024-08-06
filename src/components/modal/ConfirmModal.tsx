import React, { useEffect } from 'react';
import Modal from './Modal';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }: ConfirmModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[352px] h-[191px] p-[40px]">
        <p className="h-[77px] text-h5 font-bold text-center">
          {message.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <div className="bg-neutral-100 w-full h-[1px] mb-4" />
        <div className="text-subtitle1 font-medium flex justify-between items-center">
          <button onClick={onClose} className="text-neutral-600 w-[87px] mx-6">
            취소
          </button>
          <div className="w-[1px] h-[30px] bg-neutral-100" />
          <button onClick={handleConfirm} className="text-main-400 w-[87px] mx-6">
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
