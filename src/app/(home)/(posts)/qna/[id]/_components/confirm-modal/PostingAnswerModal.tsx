import { Dispatch, SetStateAction } from 'react';

type PostingAnswerModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setContent: Dispatch<SetStateAction<string>>;
  setToggleAnswer: Dispatch<SetStateAction<boolean>>;
};

const PostingAnswerModal = ({ setIsModalOpen, setContent, setToggleAnswer }: PostingAnswerModalProps) => {
  const handleModalCancle = () => {
    document.body.style.overflow = 'unset';
    setIsModalOpen(false);
  };
  const handleModalConfirm = () => {
    document.body.style.overflow = 'unset';
    setIsModalOpen(false);
    setContent('');
    setToggleAnswer(false);
  };
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 `}>
      <div className="w-[352px] h-[191px] px-6 py-10 bg-white p-6 rounded-2xl shadow-lg  max-w-md relative flex flex-col items-center justify-center gap-y-6">
        <p className=" w-[272px] h-[27px] text-h5 font-bold text-center">게시글 작성을 중단할까요?</p>
        <div className="w-[272px] h-[44px] flex border-t justify-around pt-5">
          <button type="button" className="w-[87px] h-[24px]" onClick={handleModalCancle}>
            취소
          </button>
          <p className="border-r-2 "></p>
          <button type="button" className="w-[87px] h-[24px] text-main-400" onClick={handleModalConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostingAnswerModal;
