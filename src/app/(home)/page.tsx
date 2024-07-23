import Header from '@/components/header/Header';

const HomePage = () => {
  return (
import BestForum from './_components/BestForum';
import LandingPage from './_components/LandingPage';
import MainPageTag from './_components/MainPageTag';
import Notice from './_components/Notice';
import PostsLink from './_components/PostsLink';
import Service from './_components/Service';
import TodayQna from './_components/TodayQna';
import TopButton from './_components/TopButton';
import WebsiteLink from './_components/WebsiteLink';

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center relative">
            <Header />
      <div className="xl:w-[1200px] md:w-[800px] sm:w-96 flex flex-col gap-5">
        <PostsLink />
        <LandingPage />
        <BestForum />
        <TodayQna />
        <MainPageTag />
        <TopButton />
        <Notice />
      </div>
      <Service />
    </div>
  );
};

export default HomePage;
