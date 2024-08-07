import React, { useState, useEffect, ChangeEvent } from 'react';
import Modal from '@/components/modal/Modal';
import ConfirmModal from '@/components/modal/ConfirmModal';
import { toast } from 'react-toastify';
import X from '@/assets/images/common/X';
import { isNicknameValid } from '@/utils/validateBannedWords';

type NicknameModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentNickname: string;
  onNicknameUpdate: (newNickname: string) => void;
};

const NicknameModal = ({ isOpen, onClose, currentNickname, onNicknameUpdate }: NicknameModalProps) => {
  const [newNickname, setNewNickname] = useState<string>(currentNickname);
  const [nicknameCount, setNicknameCount] = useState(currentNickname.length);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    const validateNickname = async (nickname: string) => {
      if (!isNicknameValid(nickname)) {
        setNicknameMessage('사용할 수 없는 닉네임입니다.');
        return;
      }

      try {
        const response = await fetch('/api/auth/check-nickname', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nickname })
        });

        const result = await response.json();

        if (response.status === 409) {
          setNicknameMessage('이미 사용중인 닉네임입니다.');
        } else if (response.ok) {
          setNicknameMessage('사용 가능한 닉네임입니다.');
        } else {
          setNicknameMessage(result.error || '닉네임 확인 중 오류가 발생했습니다.');
        }
      } catch (error) {
        setNicknameMessage('닉네임 확인 중 오류가 발생했습니다.');
      }
    };

    validateNickname(newNickname);
  }, [newNickname, nicknameMessage]);

  const onNicknameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // 띄어쓰기를 제거한 입력값을 설정
    const value = e.target.value.replace(/\s+/g, '');
    setNicknameCount(value.length);
    setNewNickname(value);
  };

  const handleClose = () => {
    if (newNickname !== currentNickname) {
      setIsConfirmModalOpen(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setIsConfirmModalOpen(false);
    onClose();
    setNewNickname(currentNickname);
  };

  const handleCancelClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleSave = () => {
    if (
      currentNickname !== newNickname &&
      nicknameCount > 1 &&
      nicknameCount <= 12 &&
      isNicknameValid(newNickname) &&
      nicknameMessage === '사용 가능한 닉네임입니다.'
    ) {
      onNicknameUpdate(newNickname);
      onClose();
    } else {
      toast.error('저장할 수 없습니다. 닉네임 유효성을 확인해주세요.');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="w-[581px] h-[398px] p-[40px_80px]">
          <div className="flex justify-between">
            <h2 className="mb-10 text-h4 font-bold text-neutral-900">닉네임 변경</h2>
            <div onClick={handleClose} className="mt-[5px] cursor-pointer">
              <X width={20} height={20} />
            </div>
          </div>

          <h2
            className={`${
              currentNickname !== newNickname
                ? nicknameCount > 150
                  ? 'text-red'
                  : nicknameCount > 0
                    ? 'text-main-400 '
                    : 'text-neutral-300'
                : 'text-neutral-900'
            }`}
          >
            새로운 닉네임
          </h2>
          <input
            type="text"
            value={newNickname}
            onChange={onNicknameHandler}
            className={`block w-[421px] h-[56px] p-[16px] border rounded ${
              currentNickname !== newNickname
                ? nicknameCount > 13 ||
                  nicknameMessage === '이미 사용중인 닉네임입니다.' ||
                  nicknameMessage === '사용할 수 없는 닉네임입니다.'
                  ? 'text-red outline-red border border-red'
                  : nicknameCount > 1
                    ? 'text-neutral-900 outline-main-400 border border-main-400'
                    : 'text-neutral-300 outline-neutral-400 border border-neutral-300'
                : 'text-neutral-700 outline-neutral-400 border border-neutral-300'
            }`}
            placeholder="변경할 닉네임을 입력하세요."
          />

          {currentNickname !== newNickname ? (
            nicknameCount > 13 ? (
              <span className="text-red">글자수를 초과했어요!</span>
            ) : nicknameCount > 1 ? (
              nicknameMessage === '이미 사용중인 닉네임입니다.' ||
              nicknameMessage === '사용할 수 없는 닉네임입니다.' ? (
                <span className="text-red">{nicknameMessage}</span>
              ) : (
                <span className="text-main-400">{nicknameMessage}</span>
              )
            ) : (
              <span className="text-neutral-300">2~12자 이하</span>
            )
          ) : (
            <span className="text-neutral-700">2~12자 이하</span>
          )}

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className={`borde py-2 px-4 rounded
    ${
      currentNickname !== newNickname
        ? nicknameCount > 13 ||
          nicknameMessage === '이미 사용중인 닉네임입니다.' ||
          nicknameMessage === '사용할 수 없는 닉네임입니다.'
          ? 'bg-main-100 text-white'
          : nicknameCount > 1
            ? 'bg-main-400 text-white'
            : 'bg-main-100 text-white'
        : 'bg-main-100 text-white'
    }
  `}
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
        message={`내용이 저장되지 않았습니다.\n정말 닫으시겠습니까?`}
      />
    </>
  );
};

export default NicknameModal;
