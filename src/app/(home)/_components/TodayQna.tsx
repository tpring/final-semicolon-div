'use client';
import { Database, Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const TodayQna = () => {
  const { data: todayQna } = useQuery<Tables<'qna_posts'>[]>({
    queryKey: ['todayQna'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/auth/main-page/today-qna');
        const data = await response.json();
        return data;
      } catch (error) {}
    }
  });
  console.log(todayQna);

  return (
    <div>
      <h1>방금 올라온 질문이에요! 지식을 공유하러 가볼까요?</h1>
      <div className="flex flex-nowrap gap-5">{todayQna?.map((post) => <h1 key={post.id}>{[post.title]}</h1>)}</div>
    </div>
  );
};

export default TodayQna;
