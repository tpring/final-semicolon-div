const GoToTop = () => {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_2457_11880)">
        <rect x="8" y="6" width="68" height="68" rx="34" fill="#F5F5F5" shape-rendering="crispEdges" />
        <path
          d="M30 46L41.8586 34.1414C41.9367 34.0633 42.0633 34.0633 42.1414 34.1414L54 46"
          stroke="#A8A8A8"
          stroke-width="3"
          stroke-linecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2457_11880"
          x="0"
          y="0"
          width="84"
          height="84"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2457_11880" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2457_11880" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default GoToTop;
