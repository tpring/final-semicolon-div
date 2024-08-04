type PaginationButtonsProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function PaginationButtons({ totalPages, currentPage, onPageChange }: PaginationButtonsProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex pt-6 gap-4 w-full justify-end">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`text-subtitle1 ${currentPage === index + 1 ? 'text-main-400 bg-main-50' : 'bg-neutral-50 text-neutral-500'}w-8 h-8 rounded-md`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default PaginationButtons;
