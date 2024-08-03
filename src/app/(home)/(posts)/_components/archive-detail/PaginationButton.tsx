type PaginationButtonsProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function PaginationButtons({ totalPages, currentPage, onPageChange }: PaginationButtonsProps) {
  // 페이지 수가 1 이하이면 아무것도 렌더링하지 않습니다.
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 py-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-2 py-1 ${currentPage === index + 1 ? 'bg-gray-300' : 'bg-gray-100'}`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default PaginationButtons;
