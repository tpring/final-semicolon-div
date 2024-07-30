type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const MyActivitiesPagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center py-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`mx-1 px-3 py-1 border ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default MyActivitiesPagination;
