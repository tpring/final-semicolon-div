import Modal from '@/components/modal/Modal';
import { useState, useEffect, ChangeEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type InfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentInfo: string;
  onInfoUpdate: (newInfo: string) => void;
};

const InfoModal = ({ isOpen, onClose, currentInfo, onInfoUpdate }: InfoModalProps) => {
  const [newInfo, setNewInfo] = useState(currentInfo);
  const [inputCount, setInputCount] = useState(currentInfo.length);

  useEffect(() => {
    setNewInfo(currentInfo);
    setInputCount(currentInfo.length);
  }, [currentInfo]);

  const handleSave = () => {
    onInfoUpdate(newInfo);
    onClose();
  };

  const onInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputCount(value.length);
    setNewInfo(value);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2 className=" mb-4">자기소개</h2>
        <h2 className={`${inputCount > 150 ? 'text-red' : inputCount > 0 ? 'text-main-400' : 'text-neutral-300'}`}>
          자기소개
        </h2>
        <textarea
          value={newInfo}
          onChange={onInputHandler}
          placeholder="자신을 소개해보세요"
          maxLength={150}
          className={`border rounded p-2 w-full h-32 resize-none ${
            currentInfo !== newInfo
              ? inputCount > 150
                ? 'text-red'
                : inputCount > 0
                  ? 'text-main-400'
                  : 'text-neutral-300'
              : 'text-neutral-300'
          }`}
        />
        <span
          className={`
    ${
      currentInfo === newInfo
        ? inputCount > 150
          ? 'text-red'
          : inputCount > 0
            ? 'text-main-400'
            : 'text-neutral-300'
        : 'text-neutral-00'
    }
  `}
        >
          {inputCount > 150 ? '글자수를 초과했어요!' : `${inputCount} / 150`}
        </span>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={handleSave} className="border bg-main-100 text-white py-2 px-4 rounded">
            저장
          </button>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default InfoModal;
