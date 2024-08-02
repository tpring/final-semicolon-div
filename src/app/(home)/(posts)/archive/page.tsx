import Image from 'next/image';
import ArchivePosts from '../_components/archive/ArchivePosts';
import ArchiveBannerOne from '@/assets/images/archive/ArchiveBannerOne.svg';
import ArchiveBannerTwo from '@/assets/images/archive/ArchiveBannerTwo.svg';
import PopularArchiveSwiper from '../_components/archive/PopularArchiveSwiper';

const ArchivePage = () => {
  return (
    <div className="max-w-[1200px]">
      <div className="flex items-center space-x-[60px] mb-[60px]">
        <Image src={ArchiveBannerOne} alt="Qna Banner 1" objectFit="cover" width={580} height={538} />
        <Image src={ArchiveBannerTwo} alt="Qna Banner 1" objectFit="cover" width={480} height={538} />
      </div>
      <div className="flex flex-col justify- items-center relative gap-3 mb-8">
        <p className="self-stretch flex-grow-0 flex-shrink-0 text-h3 font-bold text-center text-neutral-900">
          유저들은 어떤 코드를 기록했을까요?
        </p>
        <p className="self-stretch flex-grow-0 flex-shrink-0 text-h4 font-regular text-center text-neutral-400">
          지금 인기 코드를 확인해 보세요
        </p>
        <div className="w-full">
          <PopularArchiveSwiper />
        </div>
      </div>
      <div>
        <div>
          <ArchivePosts />
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
