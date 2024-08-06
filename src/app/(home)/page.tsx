import BestForum from './_components/BestForum';
import LandingPage from './_components/LandingPage';
import MainPageTag from './_components/MainPageTag';
import PostsLink from './_components/PostsLink';
import TodayQna from './_components/TodayQna';
import TopButton from '../../components/TopButton';

const HomePage = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/main-page`, {
    next: {
      revalidate: 3600
    }
  });

  if (!response.ok) {
    console.log('Failed to fetch data error');
  }
  const data = await response.json();

  console.log(data);

  return (
    <div className="flex flex-col justify-center items-center relative">
      <div className="xl:w-[1200px] md:w-[800px] sm:w-96 flex flex-col gap-20">
        <PostsLink />
        <BestForum forumList={data?.bestForum} />
        <TodayQna todayQna={data?.qna_posts} />
        <LandingPage />
        <MainPageTag />
        <TopButton />
      </div>
    </div>
  );
};

export default HomePage;
