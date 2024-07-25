import { archivePostData, forumPostData, qnaPostData } from '@/constants/posting';
import EditForm from '../../_components/edit/EditForm';

type EditPageProps = {
  params: { id: string };
};

const EditPage = ({ params }: EditPageProps) => {
  //테스트 코드 입니다!
  return <EditForm data={forumPostData} />;
  // return <EditForm data={qnaPostData} />;
  // return <EditForm data={archivePostData} />;
};

export default EditPage;
