import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[500px]">{children}</div>
    </div>,
    document.body
  );
};

type NicknameModalProps = {
  isOpen: boolean;
  currentNickname: string;
  onNicknameUpdate: (newNickname: string) => void;
  userId: string; // Add userId prop
};

const OAuthNicknameModal = ({ isOpen, currentNickname, onNicknameUpdate, userId }: NicknameModalProps) => {
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

  const handleSubmit = async () => {
    if (isCheckedNickname) {
      try {
        const response = await fetch('/api/auth/update-nickname', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId, newNickname: nickname })
        });

        const result = await response.json();

        if (response.ok) {
          onNicknameUpdate(nickname);
        } else {
          setNicknameMessage(result.error || '닉네임 업데이트 중 오류가 발생했습니다.');
        }
      } catch (error) {
        setNicknameMessage('닉네임 업데이트 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen}>
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
            설정하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OAuthNicknameModal;
