import { toast } from 'react-toastify';

//공용으로 사용하는 함수 넣어두는게 좋을 것같아서 만들었습니다. 가져다가 쓰시면 됩니다.

// 현재 시간 기준으로 시간 표시 ex) 방금전, 30분전, 1시간전 등..
// {timeForToday(post.created_at)} <- 이런식으로 사용 하시면 됩니다.
export const timeForToday = (value: string) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

//링크 공유
//handleRinkCoy(들어갈 주소 입력)
//ex) onClick={() => handleRinkCopy(`${process.env.NEXT_PUBLIC_BASE_URL}/forum/${forum.id}`)}

export const handleRinkCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('링크가 복사되었습니다.', {
      autoClose: 2000
    });
  } catch (error) {}
};
