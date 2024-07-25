import Image from 'next/image';
import mainPageLanding from '@/assets/images/mainPageLanding.png';

const LandingPage = () => {
  return (
    <div className=" relative overflow-hidden  justify-center w-full h-60">
      <a href="https://nbcamp.spartacodingclub.kr/" target="_blank">
        <Image
          src={mainPageLanding}
          alt="Landing"
          width={1200}
          height={240}
          style={{ width: '100%', height: '100%' }}
        />
      </a>
    </div>
  );
};

export default LandingPage;
