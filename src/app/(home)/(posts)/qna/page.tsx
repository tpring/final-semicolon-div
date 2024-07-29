import PopularQnaPosts from '../_components/qna/PopularQnaPosts';
import PostQnaButton from '../_components/qna/PostQnaButton';
import QnaImageSwiper from '../_components/qna/QnaImageSwiper';
import ResentQnaPosts from '../_components/qna/ResentQnaPosts';

const QnaPage = () => {
  return (
    <div>
      <QnaImageSwiper />
      <PopularQnaPosts />
      <ResentQnaPosts />
      <PostQnaButton />
    </div>
  );
};

export default QnaPage;
