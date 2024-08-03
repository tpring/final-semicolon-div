import ArchiveComments from '../../_components/archive-detail/ArchiveComments';
import ArchiveDetailPost from '../../_components/archive-detail/ArchiveDetailPost';
import ArchiveInputComments from '../../_components/archive-detail/ArchiveInputComment';

const ArchiveDetailPage = () => {
  return (
    <div>
      <ArchiveDetailPost />
      <ArchiveInputComments />
      <ArchiveComments />
    </div>
  );
};

export default ArchiveDetailPage;
