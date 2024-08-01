import ArchivePosts from '../_components/archive/ArchivePosts';
import PopularArchiveSwiper from '../_components/archive/PopularArchiveSwiper';

const ArchivePage = () => {
  return (
    <div>
      <div>이미지 두개</div>
      <div>
        <p>유저들은 어떤 코드를 기록했을까요?</p>
        <p>지금 인기 코드를 확인해 보세요</p>
        <div>
          <PopularArchiveSwiper />
        </div>
      </div>
      <div>
        <p>더 많은 코드를 만나보세요</p>
        <div>
          <ArchivePosts />
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
