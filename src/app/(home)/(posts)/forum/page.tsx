import ForumPostsWithCategoryAndSort from '../_components/forum/ForumPostsWithCategoryAndSort';
import ScrollToTopButton from '../_components/forum/ScrollToTopButton';

const ForumPage = () => {
  return (
    <div>
      <ForumPostsWithCategoryAndSort />
      <ScrollToTopButton />
    </div>
  );
};

export default ForumPage;
