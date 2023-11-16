import usePagination from "../hooks/usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <div className="join">
      {paginationRange.map((pageNumber, index) => {
        return (
          <button
            className={`join-item btn btn-md btn-circle ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white hover:bg-blue-600 hover:text-white"
                : "hover:bg-blue-600 hover:text-white"
            }`}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
