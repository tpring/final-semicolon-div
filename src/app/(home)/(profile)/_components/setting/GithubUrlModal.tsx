import React, { useState, useEffect } from 'react';
import Modal from '@/components/modal/Modal';

type GithubUrlModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentGithubUrl: string;
  onGithubUrlUpdate: (newGithubUrl: string) => void;
};

const GithubUrlModal = ({ isOpen, onClose, currentGithubUrl, onGithubUrlUpdate }: GithubUrlModalProps) => {
  const [newGithubUrl, setNewGithubUrl] = useState<string>(currentGithubUrl);
  const [urlValid, setUrlValid] = useState<boolean>(true);
  const [urlMessage, setUrlMessage] = useState<string>('');

  useEffect(() => {
    setNewGithubUrl(currentGithubUrl);
  }, [currentGithubUrl]);

  useEffect(() => {
    const validateGithubUrl = (url: string) => {
      const githubUrlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/;
      if (githubUrlPattern.test(url)) {
        setUrlValid(true);
        setUrlMessage('유효한 깃허브 프로필 링크입니다.');
      } else {
        setUrlValid(false);
        setUrlMessage(
          '유효하지 않은 깃허브 프로필 링크입니다. 링크 형식은 "https://github.com/username"이어야 합니다.'
        );
      }
    };

    validateGithubUrl(newGithubUrl);
  }, [newGithubUrl]);

  const handleSave = () => {
    if (urlValid) {
      onGithubUrlUpdate(newGithubUrl);
      onClose();
    }
  };

  const handleDelete = () => {
    onGithubUrlUpdate(null!);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="h-[206px]">
        <h2 className="text-lg font-semibold mb-4">깃허브 링크 변경</h2>
        <input
          type="text"
          value={newGithubUrl}
          onChange={(e) => setNewGithubUrl(e.target.value)}
          className={`block w-full border rounded px-2 py-1 mb-4 ${urlValid ? '' : 'border-red-500'}`}
          placeholder="변경할 깃허브 프로필 링크를 입력하세요."
        />
        <p className={`text-sm ${urlValid ? 'text-green-500' : 'text-red-500'}`}>{urlMessage}</p>

        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={handleDelete} className="border bg-red text-white py-2 px-4 rounded hover:bg-red-600">
            등록된 링크 삭제
          </button>
          <button
            onClick={handleSave}
            disabled={!urlValid}
            className="border bg-main-100 text-white py-2 px-4 rounded disabled:bg-gray-300"
          >
            저장
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GithubUrlModal;
