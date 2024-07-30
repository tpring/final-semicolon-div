import Modal from '@/components/modal/Modal';
import { useState, useEffect, ChangeEvent } from 'react';

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
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className=" mb-4">자기소개 </h2>

      <h2 className=" mb-4">자기소개 </h2>
      <textarea
        value={newInfo}
        onChange={onInputHandler}
        maxLength={150}
        className="border rounded p-2 w-full h-32 resize-none"
      />
      <span className="text-gray-500">{inputCount} / 150 </span>
      <div className="flex justify-end gap-2 mt-4">
        <button onClick={handleSave} className="border bg-main-100 text-white py-2 px-4 rounded">
          저장
        </button>
      </div>
    </Modal>
  );
};

export default InfoModal;
