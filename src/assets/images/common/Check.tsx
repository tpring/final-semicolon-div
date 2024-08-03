type CheckProps = {
  stroke?: string;
};

const Check = ({ stroke = '#0F0F0F' }: CheckProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 13.2L10.2374 17.8395C10.2464 17.8493 10.2563 17.8584 10.2674 17.8659C10.5981 18.092 11.138 18.0236 11.3426 17.7251L18 6"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Check;
