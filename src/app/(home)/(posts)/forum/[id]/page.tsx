import ForumComments from '../../_components/forum-detail/ForumComments';
import ForumDetailPost from '../../_components/forum-detail/ForumDetailPost';
import InputComments from '../../_components/forum-detail/InputComment';

const ForumDetailPage = () => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="w-[1200px] p-4">
        <ForumDetailPost />
        <InputComments />
        <ForumComments />
      </div>
    </div>
  );
};

export default ForumDetailPage;
