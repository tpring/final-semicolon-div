const CircleX = ({ stroke = '#FFFFFF', fill = '#C2C2C2' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" fill={fill} />
      <path d="M9 9L14.9998 15" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15 9L9.00024 15" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
};

export default CircleX;
