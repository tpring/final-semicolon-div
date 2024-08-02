import ForumComments from '../../_components/forum-detail/ForumComments';
import ForumDetailPost from '../../_components/forum-detail/ForumDetailPost';
import InputComments from '../../_components/forum-detail/InputComment';

const ForumDetailPage = () => {
  return (
    <div className="flex flex-col justify-center w-[1200px] gap-5  ">
      <ForumDetailPost />
      <InputComments />
      <ForumComments />
    </div>
  );
};

export default ForumDetailPage;
