import ForumComments from '../../_components/forum-detail/ForumComments';
import ForumDetailPost from '../../_components/forum-detail/ForumDetailPost';
import InputComments from '../../_components/forum-detail/InputComment';

const ForumDetailPage = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/forum-detail/${params.id}`);
  const data = await response.json();

  return (
    <div className="flex flex-col justify-center w-[1200px]  ">
      <div className=" border rounded-xl p-6 ">
        <ForumDetailPost forumDetail={data} />
        <InputComments />
      </div>
      <ForumComments post_user_id={data[0].user_id} />
    </div>
  );
};

export default ForumDetailPage;
