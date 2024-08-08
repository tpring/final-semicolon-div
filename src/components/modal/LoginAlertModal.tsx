import { useLoginAlertStore } from '@/store/loginAlertModal';
import { useRouter } from 'next/navigation';

const LoginAlertModal = () => {
  const { onClose } = useLoginAlertStore();
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="fixed inset-0 center-alignment bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white  w-[375px] h-[223px] flex flex-col justify-center items-center rounded-[16px] gap-10">
        <div className="flex flex-col justify-center items-center ">
          <p className="text-subtitle1 font-bold">로그인이 필요한 서비스입니다.</p>
          <p className="text-body1 font-medium">로그인을 하시겠습니까?</p>
        </div>
        <button
          onClick={handleLoginClick}
          className="w-[295px] h-[48px] bg-main-400 text-white text-subtitle1 font-bold rounded-[6px]"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default LoginAlertModal;
