import ArchiveComments from '../../_components/archive-detail/ArchiveComments';
import ArchiveDetailPost from '../../_components/archive-detail/ArchiveDetailPost';
import ArchiveInputComments from '../../_components/archive-detail/ArchiveInputComment';
import BackClick from '../../_components/archive-detail/BackClick';

const ArchiveDetailPage = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/archive-detail/${params.id}`);
  const data = await response.json();

  return (
    <div className="flex flex-col justify-center w-[1200px]  ">
      <BackClick />
      <div className=" border rounded-xl p-4 ">
        <ArchiveDetailPost />
        <ArchiveInputComments />
      </div>
      <ArchiveComments post_user_id={data[0]?.user_id} />
    </div>
  );
};

export default ArchiveDetailPage;
