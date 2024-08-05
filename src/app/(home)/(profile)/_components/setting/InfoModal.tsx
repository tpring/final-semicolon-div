import Modal from '@/components/modal/Modal';
import ConfirmModal from '@/components/modal/ConfirmModal'; // ConfirmModal을 import합니다.
import { useState, useEffect, ChangeEvent } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import X from '@/assets/images/common/X';
import { toast, ToastContainer } from 'react-toastify';
import Check from '@/assets/images/common/Check';

type InfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentInfo: string;
  onInfoUpdate: (newInfo: string) => void;
};

const InfoModal = ({ isOpen, onClose, currentInfo, onInfoUpdate }: InfoModalProps) => {
  const MAX_LINES = 5; // 최대 줄 수를 설정합니다.
  const [newInfo, setNewInfo] = useState(currentInfo); // 새로운 정보 상태
  const [inputCount, setInputCount] = useState(currentInfo.length); // 입력된 텍스트의 길이
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // 확인 모달의 열림 여부

  // currentInfo가 변경될 때 상태를 업데이트합니다.
  useEffect(() => {
    setNewInfo(currentInfo);
    setInputCount(currentInfo.length);
  }, [currentInfo]);

  // 저장 버튼 클릭 시 호출되는 함수
  const handleSave = () => {
    if (currentInfo !== newInfo && inputCount > 0 && inputCount <= 150) {
      onInfoUpdate(newInfo);
      onClose();
    } else {
      toast.error('저장할 수 없습니다. 글자 수를 확인해주세요.');
    }
  };

  // 텍스트의 줄 수를 계산하는 함수
  const countLines = (text: string): number => {
    return text.split('\n').length;
  };

  // textarea의 입력이 변경될 때 호출되는 함수
  const onInputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputCount(value.length);
    const lines = countLines(value);
    if (lines <= MAX_LINES) {
      setNewInfo(value);
    }
  };

  // 모달을 닫으려고 할 때 호출되는 함수
  const handleClose = () => {
    if (newInfo !== currentInfo) {
      setIsConfirmModalOpen(true);
    } else {
      onClose();
    }
  };

  // 확인 모달에서 확인을 클릭했을 때 호출되는 함수
  const handleConfirmClose = () => {
    setIsConfirmModalOpen(false);
    onClose();
    setNewInfo(currentInfo);
  };

  // 확인 모달에서 취소를 클릭했을 때 호출되는 함수
  const handleCancelClose = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="w-full max-w-[581px] h-auto p-4 md:p-8">
          <div className="flex flex-row justify-between mb-4">
            <h2 className="text-h4 font-bold text-neutral-900">자기소개</h2>
            <div onClick={handleClose} className="mt-[4px] cursor-pointer">
              <X width={20} height={20} />
            </div>
          </div>

          <h2
            className={`${
              currentInfo !== newInfo
                ? inputCount > 150
                  ? 'text-red'
                  : inputCount > 0
                    ? 'text-main-400 '
                    : 'text-neutral-300'
                : 'text-neutral-900'
            }`}
          >
            자기소개
          </h2>

          <textarea
            value={newInfo}
            onChange={onInputHandler}
            placeholder="자신을 소개해보세요"
            maxLength={150}
            className={`border rounded p-4 w-full md:w-[421px] h-auto md:h-[167px] resize-none ${
              currentInfo !== newInfo
                ? inputCount > 150
                  ? 'text-red outline-red border border-red'
                  : inputCount > 0
                    ? 'text-neutral-900 outline-main-400 border border-main-400'
                    : 'text-neutral-300 outline-neutral-300 border border-neutral-300'
                : 'text-neutral-700'
            }`}
          />

          {currentInfo !== newInfo ? (
            inputCount > 150 ? (
              <div className="flex items-center mt-2 text-red">
                <Check stroke={'#F66161'} />
                <span className="ml-2 text-r">글자수를 초과했어요!</span>
              </div>
            ) : inputCount > 0 ? (
              <div className="flex items-center mt-2 text-main-400">
                <Check stroke={'#423edf'} />
                <span className="ml-2">{inputCount}</span>
                <span className="text-neutral-900"> / 150</span>
              </div>
            ) : (
              <div className="flex items-center mt-2 text-neutral-300">
                <Check />
                <span className="ml-2">150자 이하</span>
              </div>
            )
          ) : (
            <div className="flex items-center mt-2 text-main-400">
              <Check stroke={'#423edf'} />
              <span className="ml-2">{inputCount}</span>
              <span className="text-neutral-900">/ 150</span>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleSave}
              className={`border py-2 px-4 rounded ${
                currentInfo !== newInfo
                  ? inputCount > 150
                    ? 'bg-main-100 text-white'
                    : inputCount > 0
                      ? 'bg-main-400 text-white'
                      : 'bg-main-100 text-white'
                  : 'bg-main-100 text-white'
              }`}
            >
              변경하기
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelClose}
        onConfirm={handleConfirmClose}
        message={`작성 중인 내용이 저장되지 않았습니다.\n정말 닫으시겠습니까?`}
      />
      {/* <ToastContainer /> */}
    </>
  );
};

export default InfoModal;
