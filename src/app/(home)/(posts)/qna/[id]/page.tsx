import QnaPost from './_components/QnaPost';
import NotFound from '@/app/not-found';

type QnaDetailPageProps = {
  params: { id: string };
};

const QnaDetailPage = async ({ params }: QnaDetailPageProps) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/qnadetail/${params.id}?category=qna`);
  const { data, message } = await response.json();
  if (message) {
    return <NotFound />;
  }
  return <QnaPost data={data} />;
};

export default QnaDetailPage;
