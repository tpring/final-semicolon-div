import ScrollToTopButton from '../_components/forum/ScrollToTopButton';
import PopularQnaPosts from '../_components/qna/PopularQnaPosts';
import QnaImageSwiper from '../_components/qna/QnaImageSwiper';
import ResentQnaPosts from '../_components/qna/ResentQnaPosts';

const QnaPage = () => {
  return (
    <div>
      <QnaImageSwiper />
      <div className="mb-[120px]">
        <PopularQnaPosts />
      </div>
      <ResentQnaPosts />
      <ScrollToTopButton />
    </div>
  );
};

export default QnaPage;
