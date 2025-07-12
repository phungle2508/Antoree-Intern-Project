import React from "react";
import { usePagination } from "../../hooks/usePagination";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, setCurrentPage }) => {
  const paginationItems = usePagination(totalPages, currentPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center mt-8 gap-2">
      <button
        className="btn"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Previous
      </button>
      {paginationItems.map((item, index) =>
        item === "..." ? (
          <span key={`ellipsis-${index}`} className="flex items-center px-3 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={item}
            className={`btn ${currentPage === item ? "btn-primary" : ""}`}
            onClick={() => setCurrentPage(item as number)}
          >
            {item}
          </button>
        )
      )}
      <button
        className="btn"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
