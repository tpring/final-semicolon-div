type UnfilledLikeProps = {
  width?: number;
  height?: number;
  stroke?: string;
};

const UnfilledLike = ({ width = 24, height = 24, stroke = '#8F8F8F' }: UnfilledLikeProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5.91366L11.4448 5.37048C10.4983 4.48007 9.23998 3.99184 7.93729 4.00952C6.63461 4.02719 5.39019 4.54937 4.46837 5.46514C3.54656 6.3809 3.02 7.61808 3.00056 8.91385C2.98111 10.2096 3.47032 11.4619 4.36424 12.4046L11.7177 19.7192C11.8738 19.8745 12.1261 19.8744 12.2821 19.7191L19.6358 12.3955C20.5297 11.4528 21.0189 10.2006 20.9994 8.9048C20.98 7.60902 20.4534 6.37185 19.5316 5.45608C18.6098 4.54032 17.3654 4.01814 16.0627 4.00046C14.76 3.98279 13.5017 4.47102 12.5552 5.36143L12 5.91366Z"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default UnfilledLike;
