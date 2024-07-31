import PopularQnaSwiper from '../_components/archive/PopularQnaSwiper';

const ArchivingPage = () => {
  return (
    <div>
      <div>이미지 두개</div>
      <div>
        <p>유저들은 어떤 코드를 기록했을까요?</p>
        <p>지금 인기 코드를 확인해 보세요</p>
        <div>
          <PopularQnaSwiper />
        </div>
      </div>
      <div>
        <p>더 많은 코드를 만나보세요</p>
        <div>
          <p>pagination</p>
          <div>cards</div>
        </div>
      </div>
    </div>
  );
};

export default ArchivingPage;
