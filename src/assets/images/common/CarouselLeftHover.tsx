const CarouselLeftHover = () => {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2416_2086)">
        <g filter="url(#filter0_d_2416_2086)">
          <circle cx="32" cy="32" r="26" fill="#DBDBDB" />
        </g>
        <path
          d="M39 21L25.2002 31.8427C25.0982 31.9228 25.0982 32.0772 25.2002 32.1573L39 43"
          stroke="#8F8F8F"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2416_2086"
          x="-2"
          y="0"
          width="68"
          height="68"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2416_2086" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2416_2086" result="shape" />
        </filter>
        <clipPath id="clip0_2416_2086">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CarouselLeftHover;
