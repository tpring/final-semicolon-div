import ScrollToTopButton from '../_components/forum/ScrollToTopButton';
import PopularQnaPosts from '../_components/qna/PopularQnaPosts';
import ResentQnaPosts from '../_components/qna/ResentQnaPosts';

const QnaPage = () => {
  return (
    <div>
      <picture>
        <source srcSet="/QnaBanner" type="image/webp" />
        <img src="/QnaBanner" alt="Qna Banner" />
      </picture>
      <div className="mb-[120px]">
        <PopularQnaPosts />
      </div>
      <ResentQnaPosts />
      <ScrollToTopButton />
    </div>
  );
};

export default QnaPage;
