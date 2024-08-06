import NotFound from '@/app/not-found';
import EditForm from '../../_components/edit/EditForm';
import { useAuth } from '@/context/auth.context';

type EditPageProps = {
  params: { id: string };
  searchParams: { category: string };
};

const EditPage = async ({ params, searchParams }: EditPageProps) => {
  const path = `/api/upsert/edit/${params.id}?category=${searchParams.category}`;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`, {
    next: { tags: [`${path}`] }
  });
  const responseData = await response.json();
  const { data } = await responseData;

  if (!data) {
    return <NotFound />;
  }

  return <EditForm data={data} path={path} />;
};

export default EditPage;
