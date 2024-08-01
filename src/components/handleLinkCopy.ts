import { toast } from 'react-toastify';

//링크 공유
//handleRinkCoy(들어갈 주소 입력)
//ex) onClick={() => handleLinkCopy(`${process.env.NEXT_PUBLIC_BASE_URL}/forum/${forum.id}`)}

export const handleLinkCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('링크가 복사되었습니다.', {
      autoClose: 2000
    });
  } catch (error) {}
};
