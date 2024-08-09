type UnfilledBookmarkProps = {
  width?: number;
  height?: number;
  stroke?: string;
};

const UnfilledBookmark = ({ width = 24, height = 24, stroke = '#8F8F8F' }: UnfilledBookmarkProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 4H8C7.46957 4 6.96086 4.1945 6.58579 4.54073C6.21071 4.88695 6 5.35652 6 5.84615V17.8859C6 18.7302 6.98163 19.1946 7.63432 18.659L12 15.0769L16.3657 18.659C17.0184 19.1946 18 18.7302 18 17.8859V5.84615C18 5.35652 17.7893 4.88695 17.4142 4.54073C17.0391 4.1945 16.5304 4 16 4Z"
        stroke={stroke}
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default UnfilledBookmark;
