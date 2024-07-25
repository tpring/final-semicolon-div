import NotFound from '@/app/not-found';
import EditForm from '../../_components/edit/EditForm';

type EditPageProps = {
  params: { id: string };
  searchParams: { category: string };
};

const EditPage = async ({ params, searchParams }: EditPageProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/upsert/edit/${params.id}?category=${searchParams.category}`
  );
  const responseData = await response.json();
  const { data } = await responseData;

  if (!data) {
    return <NotFound />;
  }

  return <EditForm data={data} path={`/api/upsert/edit/${params.id}?category=${searchParams.category}`} />;
};

export default EditPage;
