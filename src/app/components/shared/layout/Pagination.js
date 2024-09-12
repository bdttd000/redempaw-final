import { useState } from "react";
import styles from "./styles.scss";
import { useMakeTranslation } from "@/app/utils/translation/translate";

export default function Pagination() {
  const itemsPerPage = 12;
  const totalItems = 1400;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const t = useMakeTranslation();

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPaginationRange = () => {
    const siblingCount = 2;
    const range = [1];

    const showLeftEllipsis = currentPage > siblingCount + 2;
    const showRightEllipsis = currentPage < totalPages - siblingCount - 1;

    if (showLeftEllipsis) range.push("...");

    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    if (showRightEllipsis) range.push("...");

    if (currentPage <= totalPages) range.push(totalPages);

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="grey-bg min-h-12 mt-8 mb-8 p-4 flex flex-center flex-wrap rounded-2xl">
      <div className="pagination">
        {currentPage !== 1 ? (
          <button
            className="hidden xl:inline-block"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <h5>{t("layout.previousPage", true)}</h5>
          </button>
        ) : (
          ""
        )}

        {paginationRange.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={currentPage === page || typeof page !== "number"}
            className={currentPage === page ? "pagination__active" : ""}
          >
            <h6 className="text-xs sm:text-sm md:text-lg">{page}</h6>
          </button>
        ))}

        {currentPage !== totalPages ? (
          <button
            className="hidden xl:inline-block"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <h5>{t("layout.nextPage", true)}</h5>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
