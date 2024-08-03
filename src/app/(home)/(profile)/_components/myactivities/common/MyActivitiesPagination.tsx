type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const MyActivitiesPagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="sticky flex justify-center py-2 w-full">
      <div className="max-w-md w-full flex justify-center">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`text-subtitle1 font-medium mx-1 px-3 py-1 rounded-lg ${currentPage === number ? 'bg-main-50 text-main-400' : 'bg-neutral-50 text-neutral-500'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyActivitiesPagination;
