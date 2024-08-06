const X = ({ width = 14, height = 14, stroke = '#0F0F0F' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L13 13" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M13 1L1 13" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default X;
