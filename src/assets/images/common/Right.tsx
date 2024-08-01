type RightProps = {
  width?: number;
  height?: number;
  color?: string;
};

const Right = ({ width = 6, height = 10 }: RightProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L4.85858 4.85858C4.93668 4.93668 4.93668 5.06332 4.85858 5.14142L1 9"
        stroke="#0F0F0F"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Right;
