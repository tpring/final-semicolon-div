import ForumDetailPost from '../../_components/forum-detail/ForumDetailPost';

const ForumDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="w-[1200px] p-4">
        <ForumDetailPost params={params} />
      </div>
    </div>
  );
};

export default ForumDetailPage;
