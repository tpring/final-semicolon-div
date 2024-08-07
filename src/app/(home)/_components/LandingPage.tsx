import Image from 'next/image';
import mainPageLanding from '/public/images/mainPageImages/mainPageLanding.webp';

const LandingPage = () => {
  return (
    <div className=" relative overflow-hidden  justify-center w-full h-60">
      <a href="https://nbcamp.spartacodingclub.kr/" target="_blank">
        <Image
          src={mainPageLanding}
          alt="Landing"
          width={2400}
          height={235}
          style={{ width: '1204px', height: '235px' }}
          className=" rounded-2xl"
        />
      </a>
    </div>
  );
};

export default LandingPage;
