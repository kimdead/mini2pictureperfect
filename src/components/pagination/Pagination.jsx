import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pageNumber, setPageNumber] = useState(currentPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
      onPageChange(newPage);
    }
  };

  const handlePrevPage = () => {
    handlePageChange(pageNumber - 1);
  };

  const handleNextPage = () => {
    handlePageChange(pageNumber + 1);
  };

  return (
    <div className="flex">
      <div className="pagination">
        <button
          className={`button ${pageNumber === 1 ? "disabled" : ""}`}
          onClick={handlePrevPage}
        >
          Prev
        </button>
        <div className="page-counter">
          Page {pageNumber} / {totalPages}
        </div>
        <button
          className={`button ${pageNumber === totalPages ? "disabled" : ""}`}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
