import BestForumPosts from '../_components/forum/BestForumPosts';

import ForumPostsWithCategoryAndSort from '../_components/forum/ForumPostsWithCategoryAndSort';
import ScrollToTopButton from '../_components/forum/ScrollToTopButton';

const ForumPage = () => {
  return (
    <div className="flex">
      <div className="w-1/4 mt-10 z-50">
        <BestForumPosts />
      </div>
      <div className="w-3/4">
        <ForumPostsWithCategoryAndSort />
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default ForumPage;
