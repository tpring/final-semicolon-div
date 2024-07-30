import React, { useState, useEffect } from 'react';
import Modal from '@/components/modal/Modal';

type NicknameModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentNickname: string;
  onNicknameUpdate: (newNickname: string) => void;
};

const NicknameModal = ({ isOpen, onClose, currentNickname, onNicknameUpdate }: NicknameModalProps) => {
  const [nickname, setNickname] = useState<string>(currentNickname || '');
  const [nicknameValid, setNicknameValid] = useState(true);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);

  useEffect(() => {
    setNickname(currentNickname || '');
  }, [currentNickname]);

  useEffect(() => {
    const handleValidateNickname = async (nickname: string) => {
      if (nickname.length < 2) {
        setNicknameValid(false);
        setIsCheckedNickname(false);
        setNicknameMessage('닉네임은 2자 이상 12자 이하여야 합니다.');
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
          setIsCheckedNickname(false);
          setNicknameValid(false);
        } else if (response.ok) {
          setNicknameMessage('사용 가능한 닉네임입니다.');
          setIsCheckedNickname(true);
          setNicknameValid(true);
        } else {
          setNicknameMessage(result.error || '닉네임 확인 중 오류가 발생했습니다.');
        }
      } catch (error) {
        setNicknameMessage('닉네임 확인 중 오류가 발생했습니다.');
      }
    };

    handleValidateNickname(nickname);
  }, [nickname]);

  const handleSubmit = () => {
    if (isCheckedNickname) {
      onNicknameUpdate(nickname);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-[406px]">
        <h2 className="mb-4">닉네임 변경</h2>
        <h2 className="mb-4">새로운 닉네임</h2>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className={`block w-full border rounded px-2 py-1 mb-4 ${nicknameValid ? '' : 'border-red-500'}`}
          placeholder="변경할 닉네임을 입력하세요."
        />
        <p className={`text-sm ${nicknameValid ? 'text-green-500' : 'text-red-500'}`}>{nicknameMessage}</p>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            disabled={!isCheckedNickname}
            className="border bg-main-100 text-white py-2 px-4 rounded disabled:bg-gray-300"
          >
            변경하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NicknameModal;
