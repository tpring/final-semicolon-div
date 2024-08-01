type UnfilledLikeProps = {
  width?: number;
  height?: number;
  stroke?: string;
};

const UnfilledLike = ({ width = 20, height = 19, stroke = '#8F8F8F' }: UnfilledLikeProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 3.41366L9.44484 2.87048C8.49826 1.98007 7.23998 1.49184 5.93729 1.50952C4.63461 1.52719 3.39019 2.04937 2.46837 2.96514C1.54656 3.8809 1.02 5.11808 1.00056 6.41385C0.981114 7.70962 1.47032 8.96188 2.36424 9.9046L9.71774 17.2192C9.87384 17.3745 10.1261 17.3744 10.2821 17.2191L17.6358 9.89555C18.5297 8.95283 19.0189 7.70057 18.9994 6.4048C18.98 5.10902 18.4534 3.87185 17.5316 2.95608C16.6098 2.04032 15.3654 1.51814 14.0627 1.50046C12.76 1.48279 11.5017 1.97102 10.5552 2.86143L10 3.41366Z"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default UnfilledLike;
