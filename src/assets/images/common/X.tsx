const X = ({ width = 14, height = 14 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L13 13" stroke="#0F0F0F" stroke-width="2" stroke-linecap="round" />
      <path d="M13 1L1 13" stroke="#0F0F0F" stroke-width="2" stroke-linecap="round" />
    </svg>
  );
};

export default X;
