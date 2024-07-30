const CarouselRightHover = () => {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2416_2103)">
        <g filter="url(#filter0_d_2416_2103)">
          <circle cx="32" cy="32" r="26" fill="#DBDBDB" />
        </g>
        <path
          d="M25 21L38.7998 31.8427C38.9018 31.9228 38.9018 32.0772 38.7998 32.1573L25 43"
          stroke="#8F8F8F"
          stroke-width="3"
          stroke-linecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2416_2103"
          x="-2"
          y="0"
          width="68"
          height="68"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2416_2103" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2416_2103" result="shape" />
        </filter>
        <clipPath id="clip0_2416_2103">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CarouselRightHover;
