import { TqnaData } from '@/types/posts/qnaDetailTypes';
import QnaPost from './_components/QnaPost';
import NotFound from '@/app/not-found';

type QnaDetailPageProps = {
  params: { id: string };
};

const QnaDetailPage = async ({ params }: QnaDetailPageProps) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qna-detail/${params.id}?category=qna`, {
    next: { tags: [`qna-detail-${params.id}`], revalidate: 60 }
  });
  const { questionData, message }: { questionData: TqnaData; message: string } = await response.json();

  if (message) {
    return <NotFound />;
  }
  return <QnaPost data={questionData} postId={params.id} />;
};

export default QnaDetailPage;
